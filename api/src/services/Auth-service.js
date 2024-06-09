import bcrypt from "bcryptjs"
import TokenService from "./Token-service.js"
import { Forbidden, Conflict, Unauthorized, BlockDevice, BadRequest } from "../../utils/Errors.js"
import { ACCESS_TOKEN_EXPIRATION } from "../../constants.js"
import RefreshSessionsRepository from "../_database/repositories/RefreshSession-db.js"
import UserRepository from "../_database/repositories/User-db.js"
import UserInfoRepository from '../_database/repositories/UserInfo-db.js'
import AuthDeviceRepository from '../_database/repositories/AuthDevice-db.js'
import _logAttentionRepository from '../_database/repositories/_logAttention-db.js'
import _logAuthRepository from '../_database/repositories/_LogAuth-db.js'
import getCodeDescription from '../../utils/inter_codes.js'
import getBrowserAndOs from '../../hooks/useGetBrowserAndOS.js'



const checkSessionDouble = async (deviceId) => {
	if (deviceId) {
		const isSessionDouble = await RefreshSessionsRepository.isRefreshSessionDouble(deviceId)
		if (isSessionDouble) {
			throw new Conflict("На устройстве уже выполнен вход. Обновите страницу")
		}
	}
}

const fingerprintCheckingAndUpdating = async ({ lsDeviceId, fingerprint, userId, queryTimeString }) => {

	// console.log(lsDeviceId)
	if (lsDeviceId) {

		const savedDeviceIdInDB = await AuthDeviceRepository.getDeviceId(fingerprint.hash)

		if (savedDeviceIdInDB) {
			if (savedDeviceIdInDB !== lsDeviceId){
				//* Handling if db has this fingerprint, but device has other deviceId
				await _logAttentionRepository.createLogAttention({ typeCode: 804, userId, deviceId: savedDeviceIdInDB, logTime: queryTimeString })
				throw new BlockDevice(getCodeDescription(804).message)
				//! Block device
			} else return lsDeviceId
		}

		const deviceInDB = await AuthDeviceRepository.getDevice(lsDeviceId)
		// console.log(deviceInDB)
		//* Handling if device has number, but this device hasn't been registered/removed
		if (!deviceInDB) {
			return false
		}

		//* Handling if device has number, but fingerprint in db is different (Browser has been updated)
		const { browser, bVersion, os } = getBrowserAndOs(fingerprint)
		if (deviceInDB.browser === browser && deviceInDB.os === os && deviceInDB.b_version !== bVersion) {
			
			await AuthDeviceRepository.updateDevice({ fingerprint, lsDeviceId })
		} else {
			//* Handling if db has device's deviceId with other browser
			await _logAttentionRepository.createLogAttention({ typeCode: 804, userId, deviceId: savedDeviceIdInDB, logTime: queryTimeString })
			throw new BlockDevice(getCodeDescription(804).message)
			//! Block device
		}

		return lsDeviceId
	} else return false
}

const createNewDeviceWithHandling = async ({ typeCode, fingerprint, userId, queryTimeString, deviceType }) => {
	let deviceId
	
	try {
		deviceId = await AuthDeviceRepository.createDevice({ fingerprint, regTime: queryTimeString, deviceType: deviceType || 'Unknown'  })

		await _logAttentionRepository.createLogAttention({ typeCode, userId, deviceId, logTime: queryTimeString })
	}catch {
		//* Handling if db have this fingerprint, but device doesn't have number in LocalStorage
		deviceId = await AuthDeviceRepository.getDeviceId(fingerprint.hash)
		await _logAttentionRepository.createLogAttention({ typeCode: 803, userId, deviceId, logTime: queryTimeString })
	}
	return deviceId
}

class AuthService {

	static async signIn({ username, password, fingerprint, fastSession, queryTime, queryTimeString, deviceType, lsDeviceId }) {

		const userData = await UserRepository.getUserData(username)
		
		if (!userData) {
			throw new Conflict("Пользователь не найден")
		}

		const userId = userData.id
		const enterCode = !fastSession ? 201 : 202
		
		//! await checkSessionDouble(deviceId)
		
		
		const isPasswordValid = bcrypt.compareSync(password, userData.password)
		if (!isPasswordValid) {
			throw new Unauthorized("Неверный логин или пароль")
		}

		let deviceId = await fingerprintCheckingAndUpdating({ lsDeviceId, fingerprint, userId, queryTimeString })
		// console.log(deviceId)

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
			deviceId = await createNewDeviceWithHandling({ typeCode: enterCode, fingerprint, userId, queryTimeString, deviceType })
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
			deviceId,
		}
	}

	static async signUp({ username, hashedPassword, phone, store, job, lastName, firstName, middleName, avatar, fingerprint, queryTime, queryTimeString, deviceType, lsDeviceId }) {

		//! Change
		const role = 1

		//! await checkSessionDouble(deviceId)
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
			throw new Conflict("Данный номер телефона уже занят другим пользователем")
		}

		let deviceId = await fingerprintCheckingAndUpdating({ lsDeviceId, fingerprint, userId, queryTimeString })

		if (!deviceId) {
			deviceId = await createNewDeviceWithHandling({ fingerprint, userId, queryTimeString, deviceType })
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
			deviceId,
		}
	}

	static async logOut({ refreshToken, queryTimeString }) {
		const refreshSession = await RefreshSessionsRepository.getRefreshSession(refreshToken)

		if (refreshSession){
			await _logAuthRepository.createLogAuth({ typeCode: 203, userId: refreshSession.user_id, deviceId: refreshSession.device_id, logTime: queryTimeString })
		}

		await RefreshSessionsRepository.deleteRefreshSessionByToken(refreshToken)
	}

	static async refresh({ fingerprint, currentRefreshToken, queryTimeString, lsDeviceId }) {
		if (!currentRefreshToken) {
			throw new Unauthorized()
		}

		const refreshSession = await RefreshSessionsRepository.getRefreshSession(currentRefreshToken)

		if (!refreshSession) {
			throw new Unauthorized()
		}
		// console.log(refreshSession)

		let deviceId = await AuthDeviceRepository.getDeviceId(fingerprint.hash) || 
			await fingerprintCheckingAndUpdating({ lsDeviceId, fingerprint, userId: refreshSession.user_id, queryTimeString })
		if (refreshSession.device_id !== deviceId) {
			let typeCodeAttention = 801
			if (!deviceId) {
				deviceId = await AuthDeviceRepository.createDevice({ fingerprint, regTime: queryTimeString, deviceType: 'Unknown' })
				typeCodeAttention = 802
				throw new BlockDevice(getCodeDescription(typeCodeAttention).message)
				//! Block device
			}
			await _logAttentionRepository.createLogAttention({ typeCode: typeCodeAttention, userId: refreshSession.user_id, deviceId, logTime: queryTimeString })

			throw new Forbidden(getCodeDescription(typeCodeAttention).message)
			//! Block device
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
		const avatarsList = await UserInfoRepository.getUsedAvatarsList()

		return {
			userName: username,
			hashedPassword,
			avatarsList,
		}
	}

}

export default AuthService