import bcrypt from "bcryptjs"
import TokenService from "./Token-service"
import { Conflict, Forbidden, Unauthorized } from "../utils/Errors"
import { ACCESS_TOKEN_EXPIRATION, FAST_SESSION_DURATION } from "../../constants"
import RefreshSessionsRepository from "../_database/repositories/RefreshSession-db"
import UserRepository from "../_database/repositories/User-db"
import AuthDeviceRepository from '../_database/repositories/AuthDevice-db'
import _logAttentionRepository from '../_database/repositories/_logAttention-db'
import _logAuthRepository from '../_database/repositories/_LogAuth-db'
import DeviceService from './Device-service'
import { sendToClient } from './Socket-service'
import { getEndTime } from '../utils/getTime'
import { IService, ISignInController, ISignUpController } from "../types/Auth-types"
import { ICheckUserReq, ILogOutReq, IRefreshReq } from "../../../common/types/Auth-types"
import { IRefreshSessionRepository, IUserRepository } from "../types/DB-types"
import { ICommonVar } from "../../../common/types/Global-types"



class AuthService {

	static async signIn({ username, password, fingerprint, fastSession, queryTime, deviceType, lsDeviceId, deviceIP }: IService<ISignInController>) {
		
		await DeviceService.checkDeviceForBlock({ deviceId: lsDeviceId, fingerprint, deviceIP, queryTime })

		const userData = await UserRepository.getUserData(username)
		
		if (!userData) {
			throw new Conflict("Неверный логин или пароль")
		}

		const userId = userData.user_id
		const interCode = !fastSession ? 201 : 202
		
		const isPasswordValid = bcrypt.compareSync(password, userData.password)
		if (!isPasswordValid) {
			throw new Conflict("Неверный логин или пароль")
		}

		
		//* Control of max sessions for every user
		if (await RefreshSessionsRepository.getRefreshSessionsQuantity(userId) >= 7) {
			    await RefreshSessionsRepository.deleteOldestRefreshSessionByUserId(userId)
			}
		//*

		const deviceId = await DeviceService.getDeviceId({ interCode, fingerprint, userId, queryTime, deviceType, lsDeviceId, deviceIP })
		
		await _logAuthRepository.createLogAuth({ interCode, userId, deviceId, logTime: queryTime })


		const payload = {
			userId,
			username,
			deviceId,
		}

		const accessToken = await TokenService.generateAccessToken(payload)
		const refreshToken = await TokenService.generateRefreshToken(payload)

		const logOutTime = fastSession ? getEndTime({ startTimeInSec: queryTime, duration: FAST_SESSION_DURATION }) : null

		await RefreshSessionsRepository.createRefreshSession({
			userId,
			deviceId,
			logInTime: queryTime,
			logOutTime,
			refreshToken,
		})

		const userInfo = await UserRepository.getHandledUserInfo(userId)

		return {
			accessToken,
			refreshToken,
			accessTokenExpiration: ACCESS_TOKEN_EXPIRATION,
			userInfo,
			deviceId,
		}
	}



	static async checkUser({ username, password, fingerprint, queryTime }: IService<ICheckUserReq>) {

		await DeviceService.checkDeviceForBlock({ fingerprint, queryTime })

		const salt = bcrypt.genSaltSync(10)

		const userData = await UserRepository.getUserData(username)
		if (userData) {
			throw new Conflict("Пользователь с таким логином уже существует")
		}

		const hashedPassword = bcrypt.hashSync(password, salt)
		const avatarsList = await UserRepository.getUsedAvatarsList()

		return {
			username,
			hashedPassword,
			avatarsList,
		}
	}



	static async signUp({
							username,
							hashedPassword,
							phone,
							store,
							job,
							lastName,
							firstName,
							middleName,
							avatar,
							fingerprint,
							queryTime,
							deviceType,
							lsDeviceId,
							deviceIP
	}: IService<ISignUpController>) {

		await DeviceService.checkDeviceForBlock({ deviceId: lsDeviceId, fingerprint, deviceIP, queryTime })

		//TODO: Change role, is_store
		const role = 1
		const status = 'inactive'
		const isStore = false

		let userId: IUserRepository['userId']
		let userInfo: IUserRepository
		const interCode = 205

		try {
			userInfo = {
				username,
				hashedPassword, 
				role,
				status,
				phone,
				store,
				job,
				lastName,
				firstName,
				middleName,
				avatar,
				isStore,
			}
			userId = await UserRepository.createUser(userInfo)
			
            userInfo.userId = userId
			delete userInfo.hashedPassword
		} catch {
			throw new Conflict("Данный номер телефона уже занят другим пользователем")
		}

		const deviceId = await DeviceService.getDeviceId({ interCode, fingerprint, userId, queryTime, deviceType, lsDeviceId, deviceIP })

		await _logAttentionRepository.createLogAttention({ interCode, userId, deviceId, logTime: queryTime })
		await _logAuthRepository.createLogAuth({ interCode, userId, deviceId, logTime: queryTime })

		const payload = { 
			userId,
			username,
			deviceId,
		}

		const accessToken = await TokenService.generateAccessToken(payload)
		const refreshToken = await TokenService.generateRefreshToken(payload)

		await RefreshSessionsRepository.createRefreshSession({
			userId,
			deviceId,
			logInTime: queryTime,
			refreshToken,
		})

		return {
			accessToken,
			refreshToken,
			accessTokenExpiration: ACCESS_TOKEN_EXPIRATION,
			userInfo,
			deviceId,
		}
	}



	static async logOut({ refreshToken, queryTime, interCode }: IService<Omit<ILogOutReq, 'username'>> & Pick<ICommonVar, 'refreshToken'>) {
		const refreshSession = await RefreshSessionsRepository.getRefreshSession(refreshToken)

		if (refreshSession){
			await _logAuthRepository.createLogAuth({ interCode: interCode || 203, userId: refreshSession.user_id, deviceId: refreshSession.device_id, logTime: queryTime })
		}

		await RefreshSessionsRepository.deleteRefreshSessionByToken(refreshToken)
	}



	static async refresh({ fingerprint, currentRefreshToken, queryTime, lsDeviceId }: IService<IRefreshReq> & {
		currentRefreshToken: ICommonVar['refreshToken']
	}) {

		await DeviceService.checkDeviceForBlock({ deviceId: lsDeviceId, fingerprint, queryTime })
		
		if (!currentRefreshToken) {
			throw new Unauthorized()
		}
		
		const refreshSession = await RefreshSessionsRepository.getRefreshSession(currentRefreshToken)
		// console.log(refreshSession)
		
		if (!refreshSession) {
			throw new Unauthorized()
		}

		//* Checking for fast session end
		if (refreshSession.log_out_time && (Number(refreshSession.log_out_time) < queryTime)) {
			await AuthService.sessionsAutoLogOut(refreshSession)
			throw new Unauthorized()
		}

		let deviceId = await AuthDeviceRepository.getDeviceId(fingerprint.hash) || 
		    await DeviceService.deviceIdHandlingAndUpdating({ lsDeviceId, fingerprint, userId: refreshSession.user_id, queryTime })
		
		if (Number(refreshSession.device_id) !== Number(deviceId)) {

			const interCode = deviceId ? 801 : 802
			if (!deviceId) {
				deviceId = await AuthDeviceRepository.createDevice({ fingerprint, regTime: queryTime, deviceType: 'Unknown' })
				
				await _logAttentionRepository.createLogAttention({ interCode, userId: refreshSession.user_id, deviceId, logTime: queryTime })
				await RefreshSessionsRepository.deleteRefreshSessionByToken(currentRefreshToken)
				await DeviceService.blockDevice({ interCode, userId: refreshSession.user_id, deviceId, logTime: queryTime, fingerprint })
			}

			await _logAttentionRepository.createLogAttention({ interCode, userId: refreshSession.user_id, deviceId, logTime: queryTime })
			await RefreshSessionsRepository.deleteRefreshSessionByToken(currentRefreshToken)
			await DeviceService.blockDevice({ interCode, userId: refreshSession.user_id, deviceId, logTime: queryTime, fingerprint })
		}

		await RefreshSessionsRepository.deleteRefreshSessionByToken(currentRefreshToken)

		let payload: ICommonVar['payload']
		try {
			payload = await TokenService.verifyRefreshToken(currentRefreshToken)
		} catch (err) {
			throw new Forbidden(err.detail)
		}

		const { user_id: userId } = await UserRepository.getUserData(payload.username)

		const actualPayload = { userId, username: payload.username, deviceId }

		const accessToken = await TokenService.generateAccessToken(actualPayload)
		const refreshToken = await TokenService.generateRefreshToken(actualPayload)

		await RefreshSessionsRepository.createRefreshSession({
			userId,
			deviceId,
			logInTime: Number(refreshSession.log_in_time),
			logOutTime: Number(refreshSession.log_out_time),
			refreshToken,
		})

		const userInfo = await UserRepository.getHandledUserInfo(userId)

		return {
			accessToken,
			refreshToken,
			accessTokenExpiration: ACCESS_TOKEN_EXPIRATION,
			logOutTime: Number(refreshSession.log_out_time),
			userInfo,
			deviceId,
			isFast: Boolean(refreshSession.log_out_time),
		}
	}

	static async sessionsAutoLogOut(sessionInfo?: IRefreshSessionRepository) {
		const sessionsLogOutList = sessionInfo ? [sessionInfo] : await RefreshSessionsRepository.getRefreshSessionsWithLogOutTime()
		// console.log(sessionsLogOutList)

		if (!sessionsLogOutList[0]) return
		
		sessionsLogOutList.map(async ({ sess_id, user_id, device_id, log_out_time }) => {
			await RefreshSessionsRepository.deleteRefreshSessionById(sess_id)
				.then(async () => {
					await _logAuthRepository.createLogAuth({ interCode: 204, userId: user_id, deviceId: device_id, logTime: log_out_time })
					const { username, last_name, first_name } = await UserRepository.getUserName(user_id)
					
					//* Auto logout for client by Socket-io
					sendToClient({
						room: { userId: user_id, deviceId: device_id },
						event: 'autoLogOut', 
						payload: { 
							isLogOut: true, 
							userNameInfo: { 
								lastName: last_name,
								firstName: first_name,
                                username: username,
							}
						}
					})
				})
		})
	}


	
	static async intervalTestFunc() {
		await AuthService.sessionsAutoLogOut()
	}
}

export default AuthService
