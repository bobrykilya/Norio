import bcrypt from "bcryptjs"
import TokenService from "./Token.js"
import { NotFound, Forbidden, Conflict, Unauthorized } from "../utils/Errors.js"
import { ACCESS_TOKEN_EXPIRATION } from "../constants.js"
import RefreshSessionsRepository from "../database/repositories/RefreshSession.js"
import UserRepository from "../database/repositories/User.js"
import UserInfoRepository from '../database/repositories/UserInfo.js'
import AuthDeviceRepository from '../database/repositories/AuthDevice.js'
import _logAttentionRepository from '../database/repositories/_LogAttention.js'
import _logAuthRepository from '../database/repositories/_LogAuth.js'



const checkSessionDouble = async (deviceId) => {
	if (deviceId) {
		const isSessionDouble = await RefreshSessionsRepository.isRefreshSessionDouble(deviceId)
		if (isSessionDouble) {
			throw new Conflict("На устройстве уже выполнен вход. Обновите страницу")
		}
	}
}

class AuthService {

	static async signIn({ username, password, fingerprint, is_not_save }) {
		const userData = await UserRepository.getUserData(username)
		let deviceId = await AuthDeviceRepository.getDeviceId(fingerprint.hash)
		const enterCode = !is_not_save ? 201 : 202
		const queryTime = new Date()
		const queryTimeUTC = queryTime.toUTCString()


		await checkSessionDouble(deviceId)

		if (!userData) {
			throw new NotFound("Пользователь не найден")
		}

		const isPasswordValid = bcrypt.compareSync(password, userData.password)
		if (!isPasswordValid) {
			throw new Unauthorized("Неверный логин или пароль")
		}

		//* Control of max sessions for every user
		const sessionsQuantity = await RefreshSessionsRepository.getRefreshSessionsQuantity(userData.id)
		if (sessionsQuantity >= 7) {
			const oldestSessionLogInTime = await RefreshSessionsRepository.getOldestRefreshSession(userData.id)
			await RefreshSessionsRepository.deleteRefreshSessionByLogInTime(oldestSessionLogInTime)
		}
		
		if (userData.role === 1 && deviceId) {
			await _logAttentionRepository.createLogAttention({ typeCode: enterCode, userId: userData.id, deviceId, logTime: queryTimeUTC })
		}
		if (!deviceId) {
			deviceId = await AuthDeviceRepository.createDevice({ fingerprint, regTime: queryTimeUTC })
			await _logAttentionRepository.createLogAttention({ typeCode: 101, userId: userData.id, deviceId, logTime: queryTimeUTC })
		}
		if (userData.role !== 1) {
			await _logAttentionRepository.createLogAttention({ typeCode: enterCode, userId: userData.id, deviceId, logTime: queryTimeUTC })
		}

		await _logAuthRepository.createLogAuth({ typeCode: enterCode, userId: userData.id, deviceId, logTime: queryTimeUTC })

		const payload = {
			id: userData.id,
			role: userData.role,
			username,
		}

		const accessToken = await TokenService.generateAccessToken(payload)
		const refreshToken = await TokenService.generateRefreshToken(payload)

		const timeOutInSec = 600
		const logOutTime = is_not_save ? new Date(queryTime.getTime() + timeOutInSec * 1000) : null

		await RefreshSessionsRepository.createRefreshSession({
			refreshToken,
			userId: userData.id,
			deviceId,
			logInTime: queryTime,
			logOutTime,
		})
		
		// Auto logOut timer
		if (is_not_save) {
			setTimeout(async () => {
				const successDeleting = await RefreshSessionsRepository.deleteRefreshSessionByLogInTime(queryTime)

				if (successDeleting) {
					await _logAuthRepository.createLogAuth({ typeCode: 204, userId: userData.id, deviceId, logTime: logOutTime.toUTCString() })
				}
			}, timeOutInSec * 1000)
		}

		return {
			accessToken,
			refreshToken,
			accessTokenExpiration: ACCESS_TOKEN_EXPIRATION,
			logOutTime,
		}
	}

	static async checkUser({ username, password }) {
		const userData = await UserRepository.getUserData(username)
		if (userData) {
			throw new Conflict("Пользователь с таким логином уже существует")
		}

		const hashedPassword = bcrypt.hashSync(password, 8)
		const avatarsList = await UserInfoRepository.getUsedAvatarsList()

		return {
			userName: username,
			userPassword: hashedPassword,
			avatarsList,
		}
	}

	static async signUp({ username, hashedPassword, phone, store, job, last_name, first_name, middle_name, avatar, fingerprint }) {
		//! Change
		const role = 1
		let id
		const queryTime = new Date()
		const queryTimeUTC = queryTime.toUTCString()
		let deviceId = await AuthDeviceRepository.getDeviceId(fingerprint.hash)

		await checkSessionDouble(deviceId)

		try {
			id = await UserRepository.createUser({
				username,
				hashedPassword,
				role,
			})

			await UserInfoRepository.createUserInfo({
				user_id: id,
				phone,
				store,
				job,
				last_name,
				first_name,
				middle_name,
				avatar,
			})
		} catch (error) {
			throw new Forbidden(error)
		}
		
		await _logAttentionRepository.createLogAttention({ typeCode: 205, userId: id, deviceId, logTime: queryTimeUTC })

		if (!deviceId) {
			deviceId = await AuthDeviceRepository.createDevice({ fingerprint, regTime: queryTimeUTC })
			await _logAttentionRepository.createLogAttention({ typeCode: 101, userId: id, deviceId, logTime: queryTimeUTC })
		}

		await _logAuthRepository.createLogAuth({ typeCode: 205, userId: id, deviceId, logTime: queryTimeUTC })

		const payload = { id, username, role }

		const accessToken = await TokenService.generateAccessToken(payload)
		const refreshToken = await TokenService.generateRefreshToken(payload)

		await RefreshSessionsRepository.createRefreshSession({
			refreshToken,
			userId: id,
			deviceId,
			logInTime: queryTime,
		})

		return {
			accessToken,
			refreshToken,
			accessTokenExpiration: ACCESS_TOKEN_EXPIRATION,
		}
	}

	static async logOut(refreshToken) {
		const queryTimeUTC = new Date().toUTCString()
		const refreshSession = await RefreshSessionsRepository.getRefreshSession(refreshToken)

		if (refreshSession){
			await _logAuthRepository.createLogAuth({ typeCode: 203, userId: refreshSession.user_id, deviceId: refreshSession.device_id, logTime: queryTimeUTC })
		}

		await RefreshSessionsRepository.deleteRefreshSessionByToken(refreshToken)
	}

	static async refresh({ fingerprint, currentRefreshToken }) {
		const queryTime = new Date()
		const queryTimeUTC = queryTime.toUTCString()
		
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
			if (!deviceId) {
				deviceId = await AuthDeviceRepository.createDevice({ fingerprint, regTime: queryTimeUTC })
			}
			await _logAttentionRepository.createLogAttention({ typeCode: 801, userId: id, deviceId, logTime: queryTimeUTC })

			throw new Forbidden("Попытка несанкционированного обновления токенов!")
		}

		await RefreshSessionsRepository.deleteRefreshSessionByToken(currentRefreshToken)

		let payload
		try {
			payload = await TokenService.verifyRefreshToken(currentRefreshToken)
		} catch (error) {
			throw new Forbidden(error.detail)
		}

		const {
			id,
			name: username,
			role,
		} = await UserRepository.getUserData(payload.username)

		const actualPayload = { id, username, role }

		const accessToken = await TokenService.generateAccessToken(actualPayload)
		const refreshToken = await TokenService.generateRefreshToken(actualPayload)

		await RefreshSessionsRepository.createRefreshSession({
			refreshToken,
			userId: id,
			deviceId,
			logInTime: refreshSession.log_in_time,
			logOutTime: refreshSession.log_out_time,
		})

		return {
			accessToken,
			refreshToken,
			accessTokenExpiration: ACCESS_TOKEN_EXPIRATION,
			logOutTime: refreshSession.log_out_time,
		}
	}
}

export default AuthService