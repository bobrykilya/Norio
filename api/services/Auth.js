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
		let deviceId = await AuthDeviceRepository.getDeviceData(fingerprint.hash)
		const enterCode = !is_not_save ? 201 : 202

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
			const oldestSessionId = await RefreshSessionsRepository.getOldestRefreshSessions(userData.id)
			await RefreshSessionsRepository.deleteRefreshSessionById(oldestSessionId)
		}
		
		if (userData.role === 1 && deviceId) {
			await _logAttentionRepository.createLogAttention({ typeCode: enterCode, userId: userData.id, deviceId })
		}
		if (!deviceId) {
			deviceId = await AuthDeviceRepository.createDevice(fingerprint)
			await _logAttentionRepository.createLogAttention({ typeCode: 101, userId: userData.id, deviceId })
		}
		if (userData.role !== 1) {
			await _logAttentionRepository.createLogAttention({ typeCode: enterCode, userId: userData.id, deviceId })
		}

		await _logAuthRepository.createLogAuth({ typeCode: enterCode, userId: userData.id, deviceId })

		const payload = {
			id: userData.id,
			role: userData.role,
			username,
		}

		const accessToken = await TokenService.generateAccessToken(payload)
		const refreshToken = await TokenService.generateRefreshToken(payload)

		await RefreshSessionsRepository.createRefreshSession({
			refreshToken,
			userId: userData.id,
			deviceId,
		})

		return {
			accessToken,
			refreshToken,
			accessTokenExpiration: ACCESS_TOKEN_EXPIRATION,
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
		let deviceId = await AuthDeviceRepository.getDeviceData(fingerprint.hash)

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

		if (!deviceId) {
			deviceId = await AuthDeviceRepository.createDevice(fingerprint)
			await _logAttentionRepository.createLogAttention({ typeCode: 205, userId: id, deviceId })
		}

		await _logAuthRepository.createLogAuth({ typeCode: 205, userId: id, deviceId })

		const payload = { id, username, role }

		const accessToken = await TokenService.generateAccessToken(payload)
		const refreshToken = await TokenService.generateRefreshToken(payload)

		await RefreshSessionsRepository.createRefreshSession({
			refreshToken,
			userId: id,
			deviceId,
		})

		return {
			accessToken,
			refreshToken,
			accessTokenExpiration: ACCESS_TOKEN_EXPIRATION,
		}
	}

	static async logOut(refreshToken) {
		const refreshSession = await RefreshSessionsRepository.getRefreshSession(refreshToken)

		if (refreshSession){
			await _logAuthRepository.createLogAuth({ typeCode: 203, userId: refreshSession.user_id, deviceId: refreshSession.device_id })
		}

		await RefreshSessionsRepository.deleteRefreshSession(refreshToken)
	}

	static async refresh({ fingerprint, currentRefreshToken }) {
		if (!currentRefreshToken) {
			throw new Unauthorized()
		}

		const refreshSession = await RefreshSessionsRepository.getRefreshSession(currentRefreshToken)

		if (!refreshSession) {
			throw new Unauthorized()
		}

		const deviceId = await AuthDeviceRepository.getDeviceData(fingerprint.hash)
		if (refreshSession.device_id !== deviceId) {
			if (!deviceId) {
				deviceId = await AuthDeviceRepository.createDevice(fingerprint)
			}
			await _logAttentionRepository.createLogAttention({ typeCode: 801, userId: id, deviceId })

			throw new Forbidden("Попытка несанкционированного обновления токенов!")
		}

		await RefreshSessionsRepository.deleteRefreshSession(currentRefreshToken)

		let payload
		try {
			payload = await TokenService.verifyRefreshToken(currentRefreshToken)
		} catch (error) {
			throw new Forbidden(error.detail)
		}

		const {
			id,
			role,
			name: username,
		} = await UserRepository.getUserData(payload.username)

		const actualPayload = { id, username, role }

		const accessToken = await TokenService.generateAccessToken(actualPayload)
		const refreshToken = await TokenService.generateRefreshToken(actualPayload)

		await RefreshSessionsRepository.createRefreshSession({
			refreshToken,
			userId: id,
			deviceId,
		})

		return {
			accessToken,
			refreshToken,
			accessTokenExpiration: ACCESS_TOKEN_EXPIRATION,
		}
	}
}

export default AuthService