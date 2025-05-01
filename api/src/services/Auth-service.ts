import bcrypt from 'bcryptjs'
import TokenService from './Token-service'
import { Conflict, Errors } from '../utils/Errors'
import { ACCESS_TOKEN_EXPIRATION, FAST_SESSION_DURATION, MAX_SESSION_FOR_USER } from '../../constants'
import RefreshSessionsRepository from '../_database/repositories/RefreshSession-db'
import UserRepository from '../_database/repositories/User-db'
import AuthDeviceRepository from '../_database/repositories/AuthDevice-db'
import _logAttentionRepository from '../_database/repositories/_logAttention-db'
import _logAuthRepository from '../_database/repositories/_LogAuth-db'
import DeviceService from './Device-service'
import { sendToClient } from './Socket-service'
import { getEndTime, getTime } from '../utils/getTime'
import { IService, ISignInController, ISignUpController } from '../types/Auth-types'
import { ICheckUserReq, ILogOutReq, IRefreshReq } from '../../../common/types/Auth-types'
import { IRefreshSessionRepository, IUserRepository } from '../types/DB-types'
import { ICommonVar } from '../../../common/types/Global-types'



type ICreateSession = {
	userId: ICommonVar['userId'];
	username: ICommonVar['username'];
	deviceId: ICommonVar['deviceId'];
	queryTime: ICommonVar['queryTime'];
	fastSession?: ICommonVar['fastSession'];
}

type ICheckPasswordByUsername = {
	username: ICommonVar['username'];
	password: ICommonVar['password'];
	error: Conflict;
}

class AuthService {
	static async signIn({
							username,
							password,
							fingerprint,
							fastSession,
							queryTime,
							deviceType,
							lsDeviceId,
							deviceIP,
						}: IService<ISignInController>) {

		await DeviceService.checkDeviceForBlock({ deviceId: lsDeviceId, fingerprint, deviceIP, queryTime })

		const userData = await this.checkPasswordByUsername({
			username,
			password,
			error: Errors.loginOrPasswordInvalid(),
		})

		const userId = userData.userId
		const interCode = !fastSession ? 201 : 202

		//* Control of max sessions for every user
		if (await RefreshSessionsRepository.getRefreshSessionsQuantity(userId) >= MAX_SESSION_FOR_USER) {
			await RefreshSessionsRepository.deleteOldestRefreshSessionByUserId(userId)
		}
		//*

		const deviceId = await DeviceService.getDeviceId({
			interCode,
			fingerprint,
			userId,
			queryTime,
			deviceType,
			lsDeviceId,
			deviceIP,
		})

		await _logAuthRepository.createLogAuth({ interCode, userId, deviceId, logTime: queryTime })


		return await this.createSession({ userId, username, deviceId, queryTime, fastSession })
	}


	static async checkUser({ username, password, fingerprint, queryTime }: IService<ICheckUserReq>) {

		await DeviceService.checkDeviceForBlock({ fingerprint, queryTime })

		const salt = bcrypt.genSaltSync(10)

		const userData = await UserRepository.getUserMainDataByUsername(username)
		if (userData) {
			throw Errors.usernameEngaged()
		}

		const hashedPassword = bcrypt.hashSync(password, salt)


		return {
			username,
			hashedPassword,
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
							gender,
							fingerprint,
							queryTime,
							deviceType,
							lsDeviceId,
							deviceIP,
						}: IService<ISignUpController>) {

		await DeviceService.checkDeviceForBlock({ deviceId: lsDeviceId, fingerprint, deviceIP, queryTime })

		//TODO: Change role, is_store, company
		const role = 1
		const status = 'inactive'
		const isStore = false
		const company = 'Стройпродукт'

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
				company,
				job,
				lastName,
				firstName,
				middleName,
				avatar,
				gender,
				isStore,
			}
			userId = await UserRepository.createUser(userInfo)

			userInfo.userId = userId
			delete userInfo.hashedPassword
		} catch (err) {
			// console.log(err)
			if (err.detail.constraint === 'users_avatar_key') {
				throw Errors.avatarEngaged()
			} else if (err.detail.constraint === 'users_phone_key') {
				throw Errors.phoneEngaged()
			}
			throw Errors.dbConflict(err)
		}

		const deviceId = await DeviceService.getDeviceId({
			interCode,
			fingerprint,
			userId,
			queryTime,
			deviceType,
			lsDeviceId,
			deviceIP,
		})

		await _logAttentionRepository.createLogAttention({ interCode, userId, deviceId, logTime: queryTime })
		await _logAuthRepository.createLogAuth({ interCode, userId, deviceId, logTime: queryTime })


		return await this.createSession({ userId, username, deviceId, queryTime })
	}


	static async logOut({
							refreshToken,
							queryTime,
							interCode,
						}: IService<Omit<ILogOutReq, 'userId'>> & Pick<ICommonVar, 'refreshToken'>) {
		const refreshSession = await RefreshSessionsRepository.getRefreshSession(refreshToken)

		if (refreshSession) {
			await _logAuthRepository.createLogAuth({
				interCode: interCode || 203,
				userId: refreshSession.user_id,
				deviceId: refreshSession.device_id,
				logTime: queryTime,
			})
		}

		await RefreshSessionsRepository.deleteRefreshSessionByToken(refreshToken)
	}


	static async refresh({ fingerprint, currentRefreshToken, queryTime, lsDeviceId }: IService<IRefreshReq> & {
		currentRefreshToken: ICommonVar['refreshToken']
	}) {

		await DeviceService.checkDeviceForBlock({ deviceId: lsDeviceId, fingerprint, queryTime })

		if (!currentRefreshToken) {
			throw Errors.unauthorized('No current token on client')
		}

		const refreshSession = await RefreshSessionsRepository.getRefreshSession(currentRefreshToken)

		if (!refreshSession) {
			throw Errors.unauthorized('Token has been expired')
		}


		//* Checking for fast session end
		if (Number(refreshSession.log_out_time) && (Number(refreshSession.log_out_time) < queryTime)) {
			await AuthService.fastSessionsExpireChecking(refreshSession)
			throw Errors.unauthorized('Max quantity of sessions')
		}

		let deviceId = await AuthDeviceRepository.getDeviceId(fingerprint.hash) ||
			await DeviceService.deviceIdHandlingAndUpdating({
				lsDeviceId,
				fingerprint,
				userId: refreshSession.user_id,
				queryTime,
			})

		if (Number(refreshSession.device_id) !== Number(deviceId)) {

			const interCode = deviceId ? 801 : 802
			if (!deviceId) {
				deviceId = await AuthDeviceRepository.createDevice({
					fingerprint,
					regTime: queryTime,
					deviceType: 'Unknown',
				})

				await _logAttentionRepository.createLogAttention({
					interCode,
					userId: refreshSession.user_id,
					deviceId,
					logTime: queryTime,
				})
				await RefreshSessionsRepository.deleteRefreshSessionByToken(currentRefreshToken)
				await DeviceService.blockDevice({
					interCode,
					userId: refreshSession.user_id,
					deviceId,
					logTime: queryTime,
					fingerprint,
				})
			}

			await _logAttentionRepository.createLogAttention({
				interCode,
				userId: refreshSession.user_id,
				deviceId,
				logTime: queryTime,
			})
			await RefreshSessionsRepository.deleteRefreshSessionByToken(currentRefreshToken)
			await DeviceService.blockDevice({
				interCode,
				userId: refreshSession.user_id,
				deviceId,
				logTime: queryTime,
				fingerprint,
			})
		}

		await RefreshSessionsRepository.deleteRefreshSessionByToken(currentRefreshToken)

		let payload: ICommonVar['payload']
		try {
			payload = await TokenService.verifyRefreshToken(currentRefreshToken)
		} catch (err) {
			throw Errors.forbidden(err.detail)
		}

		const userMainData = await UserRepository.getUserMainDataByUsername(payload.username)
		if (!userMainData) {
			throw Errors.usernameNotFound(payload.username)
		}
		const { userId } = userMainData

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
			isFast: Boolean(Number(refreshSession.log_out_time)),
		}
	}

	static async createSession({ userId, username, deviceId, queryTime, fastSession }: ICreateSession) {
		const payload = {
			userId,
			username,
			deviceId,
		}

		const accessToken = await TokenService.generateAccessToken(payload)
		const refreshToken = await TokenService.generateRefreshToken(payload)

		const logOutTime = fastSession ? getEndTime({
			startTimeInSec: queryTime,
			duration: FAST_SESSION_DURATION,
		}) : null

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

	static async checkPasswordByUsername({ username, password, error }: ICheckPasswordByUsername) {

		const userData = await UserRepository.getUserMainDataByUsername(username)
		if (!userData) {
			throw error
		}

		const isPasswordValid = bcrypt.compareSync(password, userData?.hashedPassword)
		if (!isPasswordValid) {
			throw error
		}

		return userData
	}


	static async fastSessionsExpireChecking(sessionInfo?: IRefreshSessionRepository) {
		const sessionsLogOutList = sessionInfo ? [sessionInfo] : await RefreshSessionsRepository.getRefreshSessionsWithLogOutTime()
		// console.log(sessionsLogOutList)

		if (!sessionsLogOutList[0]) {
			return
		}

		sessionsLogOutList.map(async ({ sess_id, user_id, device_id, log_out_time }) => {
			await RefreshSessionsRepository.deleteRefreshSessionById(sess_id)
				.then(async () => {
					await _logAuthRepository.createLogAuth({
						interCode: 204,
						userId: user_id,
						deviceId: device_id,
						logTime: log_out_time,
					})
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
							},
						},
					})
				})
		})
	}

	static async sessionExpireChecking() {
		const expireSessionsList = await RefreshSessionsRepository.getRefreshSessionsWithExpireRefreshTime()
		// console.log(expireSessionsList)

		if (!expireSessionsList[0]) {
			return
		}

		expireSessionsList.map(async ({ sess_id, user_id, device_id }) => {
			await RefreshSessionsRepository.deleteRefreshSessionById(sess_id)
				.then(async () => {
					await _logAuthRepository.createLogAuth({
						interCode: 208,
						userId: user_id,
						deviceId: device_id,
						logTime: getTime(),
					})
				})
		})
	}


	static async intervalTestFunc() {
		await AuthService.fastSessionsExpireChecking()
		await AuthService.sessionExpireChecking()
	}
}

export default AuthService
