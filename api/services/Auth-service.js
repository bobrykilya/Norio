import bcrypt from "bcryptjs"
import TokenService from "./Token-service.js"
import { NotFound, Forbidden, Conflict, Unauthorized } from "../utils/Errors.js"
import { ACCESS_TOKEN_EXPIRATION } from "../constants.js"
import RefreshSessionsRepository from "../database/repositories/RefreshSession.js"
import UserRepository from "../database/repositories/User.js"
import UserInfoRepository from '../database/repositories/UserInfo.js'
import AuthDeviceRepository from '../database/repositories/AuthDevice.js'
import _logAttentionRepository from '../database/repositories/_LogAttention.js'
import _logAuthRepository from '../database/repositories/_LogAuth.js'


const checkCountry = (countryCode) => {
	if (countryCode !== 'BY') {
		throw new Conflict('Приложение работает только на территории РБ')
	}
}

const checkSessionDouble = async (deviceId) => {
	if (deviceId) {
		const isSessionDouble = await RefreshSessionsRepository.isRefreshSessionDouble(deviceId)
		if (isSessionDouble) {
			throw new Conflict("На устройстве уже выполнен вход. Обновите страницу")
		}
	}
}

class AuthService {

	static async signIn({ username, password, fingerprint, fastSession, queryTime, queryTimeString, deviceType, countryCode }) {

		checkCountry(countryCode)

		const userData = await UserRepository.getUserData(username)
		
		if (!userData) {
			throw new NotFound("Пользователь не найден")
		}

		const userId = userData.id
		let deviceId = await AuthDeviceRepository.getDeviceId(fingerprint.hash)
		const enterCode = !fastSession ? 201 : 202


		await checkSessionDouble(deviceId)


		const isPasswordValid = bcrypt.compareSync(password, userData.password)
		if (!isPasswordValid) {
			throw new Unauthorized("Неверный логин или пароль")
		}

		//* Control of max sessions for every user
		const sessionsQuantity = await RefreshSessionsRepository.getRefreshSessionsQuantity(userId)
		if (sessionsQuantity >= 7) {
			const oldestSessionLogInTime = await RefreshSessionsRepository.getOldestRefreshSession(userId)
			await RefreshSessionsRepository.deleteRefreshSessionByLogInTime(oldestSessionLogInTime)
		}
		
		if (userData.role === 1 && deviceId) {
			await _logAttentionRepository.createLogAttention({ typeCode: enterCode, userId, deviceId, logTime: queryTimeString })
		}
		if (!deviceId) {
			deviceId = await AuthDeviceRepository.createDevice({ fingerprint, regTime: queryTimeString, deviceType })
			await _logAttentionRepository.createLogAttention({ typeCode: 102, userId, deviceId, logTime: queryTimeString })
		}
		if (userData.role !== 1) {
			await _logAttentionRepository.createLogAttention({ typeCode: enterCode, userId, deviceId, logTime: queryTimeString })
		}

		await _logAuthRepository.createLogAuth({ typeCode: enterCode, userId, deviceId, logTime: queryTimeString })

		const payload = {
			userId,
			username,
			isActivated: userData.is_activated,
		}

		const accessToken = await TokenService.generateAccessToken(payload)
		const refreshToken = await TokenService.generateRefreshToken(payload)

		const timeOutInSec = 600
		const logOutTime = fastSession ? new Date(queryTime.getTime() + timeOutInSec * 1000) : null

		await RefreshSessionsRepository.createRefreshSession({
			userId,
			deviceId,
			logInTime: queryTime,
			logOutTime,
			refreshToken,
		})

		const userInfo = await UserInfoRepository.getUserInfo(userId)
		userInfo.username = username
		
		// Auto logOut timer
		if (logOutTime) {
			setTimeout(async () => {
				const successDeleting = await RefreshSessionsRepository.deleteRefreshSessionByLogInTime(queryTime)

				if (successDeleting) {
					await _logAuthRepository.createLogAuth({ typeCode: 204, userId, deviceId, logTime: logOutTime.toLocaleString() })
				}
			}, timeOutInSec * 1000)
		}

		return {
			accessToken,
			refreshToken,
			accessTokenExpiration: ACCESS_TOKEN_EXPIRATION,
			logOutTime,
			userInfo,
		}
	}

	static async signUp({ username, hashedPassword, phone, store, job, lastName, firstName, middleName, avatar, fingerprint, queryTime, queryTimeString, deviceType, countryCode }) {

		checkCountry(countryCode)

		//! Change
		const role = 1
		let deviceId = await AuthDeviceRepository.getDeviceId(fingerprint.hash)

		await checkSessionDouble(deviceId)
		let userId
		let userInfo

		try {
			userId = await UserRepository.createUser({
				username,
				hashedPassword,
				role,
			})

			userInfo = {
				userId,
				phone,
				store,
				job,
				lastName,
				firstName,
				middleName,
				avatar,
			}

			await UserInfoRepository.createUserInfo(userInfo)
			userInfo.username = username
		}catch {
		 	await UserRepository.deleteUserById(userId)
			throw new Unauthorized("Данный номер телефона уже занят другим пользователем")
		}

		
		if (!deviceId) {
			deviceId = await AuthDeviceRepository.createDevice({ fingerprint, regTime: queryTimeString, deviceType })
			await _logAttentionRepository.createLogAttention({ typeCode: 102, userId, deviceId, logTime: queryTimeString })
		}
		
		await _logAttentionRepository.createLogAttention({ typeCode: 205, userId, deviceId, logTime: queryTimeString })
		await _logAuthRepository.createLogAuth({ typeCode: 205, userId, deviceId, logTime: queryTimeString })

		const payload = { 
			userId, 
			username, 
			isActivated: false, 
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
		}
	}

	static async logOut({ refreshToken, queryTimeString }) {
		const refreshSession = await RefreshSessionsRepository.getRefreshSession(refreshToken)

		if (refreshSession){
			await _logAuthRepository.createLogAuth({ typeCode: 203, userId: refreshSession.user_id, deviceId: refreshSession.device_id, logTime: queryTimeString })
		}

		await RefreshSessionsRepository.deleteRefreshSessionByToken(refreshToken)
	}

	static async refresh({ fingerprint, currentRefreshToken, queryTimeString }) {
		if (!currentRefreshToken) {
			throw new Unauthorized()
		}

		const refreshSession = await RefreshSessionsRepository.getRefreshSession(currentRefreshToken)

		if (!refreshSession) {
			throw new Unauthorized()
		}
		// console.log(refreshSession)

		const deviceId = await AuthDeviceRepository.getDeviceId(fingerprint.hash)
		if (refreshSession.device_id !== deviceId) {
			let typeCodeAttention = 801
			if (!deviceId) {
				deviceId = await AuthDeviceRepository.createDevice({ fingerprint, regTime: queryTimeString, deviceType })
				await AuthDeviceRepository.setBlockStatusForDevice({ deviceId, status: true })
				typeCodeAttention = 802
			}
			await _logAttentionRepository.createLogAttention({ typeCode: typeCodeAttention, userId: refreshSession.user_id, deviceId, logTime: queryTimeString })

			throw new Forbidden("Попытка несанкционированного обновления токенов!")
		}

		await RefreshSessionsRepository.deleteRefreshSessionByToken(currentRefreshToken)

		let payload
		try {
			payload = await TokenService.verifyRefreshToken(currentRefreshToken)
		} catch (err) {
			throw new Forbidden(err.detail)
		}

		const {
			id: userId,
			name: username,
			is_activated: isActivated,
		} = await UserRepository.getUserData(payload.username)

		const actualPayload = { userId, username, isActivated }

		const accessToken = await TokenService.generateAccessToken(actualPayload)
		const refreshToken = await TokenService.generateRefreshToken(actualPayload)

		await RefreshSessionsRepository.createRefreshSession({
			userId,
			deviceId,
			logInTime: refreshSession.log_in_time,
			logOutTime: refreshSession.log_out_time,
			refreshToken,
		})

		const userInfo = await UserInfoRepository.getUserInfo(userId)
		userInfo.username = username

		return {
			accessToken,
			refreshToken,
			accessTokenExpiration: ACCESS_TOKEN_EXPIRATION,
			logOutTime: refreshSession.log_out_time,
			userInfo,
		}
	}

	static async checkUser({ username, password }) {
		const salt = bcrypt.genSaltSync(10)

		const userData = await UserRepository.getUserData(username)
		if (userData) {
			throw new Conflict("Пользователь с таким логином уже существует")
		}

		const hashedPassword = bcrypt.hashSync(password, salt)
		const avatarsList = await UserInfoRepository.getUsedAvatarsList()

		return {
			userName: username,
			hashedPassword,
			avatarsList,
		}
	}

}

export default AuthService