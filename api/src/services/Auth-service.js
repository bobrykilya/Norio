import bcrypt from "bcryptjs"
import TokenService from "./Token-service.js"
import {BlockDevice, Conflict, Forbidden, Unauthorized} from "../utils/errors.js"
import {ACCESS_TOKEN_EXPIRATION, FAST_SESSION_DURATION} from "../../constants.js"
import RefreshSessionsRepository from "../_database/repositories/RefreshSession-db.js"
import UserRepository from "../_database/repositories/User-db.js"
import AuthDeviceRepository from '../_database/repositories/AuthDevice-db.js'
import _logAttentionRepository from '../_database/repositories/_logAttention-db.js'
import _logAuthRepository from '../_database/repositories/_LogAuth-db.js'
import getCodeDescription from '../utils/Inter_codes.js'
import DeviceService from './Device-service.js'
import {sendToClient} from './WebSocket-service.js'
import {getEndTime} from '../utils/getTime.js'



class AuthService {

	static async signIn({ username, password, fingerprint, fastSession, queryTime, deviceType, lsDeviceId, deviceIP }) {
		
		await DeviceService.checkDeviceForBlock({ deviceId: lsDeviceId, fingerprint, deviceIP })

		const userData = await UserRepository.getUserData(username)
		
		if (!userData) {
			throw new Conflict("Пользователь не найден")
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

		const logOutTime = fastSession ? getEndTime({ startTime: queryTime, duration: FAST_SESSION_DURATION }) : null

		await RefreshSessionsRepository.createRefreshSession({
			userId,
			deviceId,
			logInTime: queryTime,
			logOutTime,
			refreshToken,
		})

		const userInfo = await UserRepository.getUserInfo(userId)

		return {
			accessToken,
			refreshToken,
			accessTokenExpiration: ACCESS_TOKEN_EXPIRATION,
			userInfo,
			deviceId,
		}
	}



	static async signUp({ username, hashedPassword, phone, store, job, lastName, firstName, middleName, avatar, fingerprint, queryTime, deviceType, lsDeviceId, deviceIP }) {

		await DeviceService.checkDeviceForBlock({ deviceId: lsDeviceId, fingerprint, deviceIP })

		//! Change role, is_store
		const role = 1
		const isActivated = false
		const isStore = false

		let userId
		let userInfo
		const interCode = 205

		try {
			userInfo = {
				username, 
				hashedPassword, 
				role,
				isActivated, 
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
			
			delete userInfo.hashedPassword
		}catch {
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



	static async logOut({ refreshToken, queryTime, interCode }) {
		const refreshSession = await RefreshSessionsRepository.getRefreshSession(refreshToken)

		if (refreshSession){
			await _logAuthRepository.createLogAuth({ interCode: interCode || 203, userId: refreshSession.user_id, deviceId: refreshSession.device_id, logTime: queryTime })
		}

		await RefreshSessionsRepository.deleteRefreshSessionByToken(refreshToken)
	}



	static async refresh({ fingerprint, currentRefreshToken, queryTime, lsDeviceId }) {

		await DeviceService.checkDeviceForBlock({ deviceId: lsDeviceId, fingerprint })
		
		if (!currentRefreshToken) {
			throw new Unauthorized()
		}
		
		const refreshSession = await RefreshSessionsRepository.getRefreshSession(currentRefreshToken)
		// console.log(refreshSession)
		
		if (!refreshSession) {
			throw new Unauthorized()
		}

		//* Checking for fast session end
		if (refreshSession.log_out_time && (refreshSession.log_out_time < queryTime)) {
			await AuthService.sessionsAutoLogOut(refreshSession)
			throw new Unauthorized()
		}
		//
		
		let deviceId = await AuthDeviceRepository.getDeviceId(fingerprint.hash) || 
		    await DeviceService.deviceIdHandlingAndUpdating({ lsDeviceId, fingerprint, userId: refreshSession.user_id, queryTime })
		
		if (Number(refreshSession.device_id) !== Number(deviceId)) {

			let interCodeAttention = 801
			if (!deviceId) {
				deviceId = await AuthDeviceRepository.createDevice({ fingerprint, regTime: queryTime, deviceType: 'Unknown' })
				interCodeAttention = 802
				
				await _logAttentionRepository.createLogAttention({ interCode: interCodeAttention, userId: refreshSession.user_id, deviceId, logTime: queryTime })
				await RefreshSessionsRepository.deleteRefreshSessionByToken(currentRefreshToken)
				throw new BlockDevice(getCodeDescription(interCodeAttention))
			}

			await _logAttentionRepository.createLogAttention({ interCode: interCodeAttention, userId: refreshSession.user_id, deviceId, logTime: queryTime })
			await RefreshSessionsRepository.deleteRefreshSessionByToken(currentRefreshToken)
			throw new BlockDevice(getCodeDescription(interCodeAttention))
		}

		await RefreshSessionsRepository.deleteRefreshSessionByToken(currentRefreshToken)

		let payload
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

		const userInfo = await UserRepository.getUserInfo(userId)

		return {
			accessToken,
			refreshToken,
			accessTokenExpiration: ACCESS_TOKEN_EXPIRATION,
			logOutTime: Number(refreshSession.log_out_time),
			userInfo,
			deviceId,
		}
	}


	
	static async checkUser({ username, password }) {
		const salt = bcrypt.genSaltSync(10)

		const userData = await UserRepository.getUserData(username)
		if (userData) {
			throw new Conflict("Пользователь с таким логином уже существует")
		}

		const hashedPassword = bcrypt.hashSync(password, salt)
		const avatarsList = await UserRepository.getUsedAvatarsList()

		return {
			userName: username,
			hashedPassword,
			avatarsList,
		}
	}

	static async sessionsAutoLogOut(sessionInfo) { 
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
								username
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
