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
import getCodeDescription from '../../utils/Inter_codes.js'
import getBrowserAndOs from '../../hooks/useGetBrowserAndOS.js'



const deviceIdHandlingAndUpdating = async ({ lsDeviceId, fingerprint, userId, queryTimeString }) => {

	// console.log(lsDeviceId)
	if (lsDeviceId) {

		const savedDeviceIdInDB = await AuthDeviceRepository.getDeviceId(fingerprint.hash)

		if (savedDeviceIdInDB) {
			if (savedDeviceIdInDB !== lsDeviceId){
				//* Handling if db has this fingerprint, but device has other deviceId
				await _logAttentionRepository.createLogAttention({ interCode: 804, userId, deviceId: savedDeviceIdInDB, logTime: queryTimeString })
				throw new BlockDevice(getCodeDescription(804).message)
				//! Block device
			} else return lsDeviceId
		} else {
			const deviceInDB = await AuthDeviceRepository.getDevice(lsDeviceId)
			
			//* Handling if device has number, but this device hasn't been registered/has been removed
			if (!deviceInDB) {
				try {
					await _logAttentionRepository.createLogAttention({ interCode: 805, userId, deviceId: lsDeviceId, logTime: queryTimeString })
				} catch {

				}
				
				return null
			}
	
			const { browser, bVersion, os } = getBrowserAndOs(fingerprint)

			if (deviceInDB.browser === browser && deviceInDB.os === os 
				&& deviceInDB.b_version !== bVersion
			) {
				//* Handling if device has number, but fingerprint in db is different (Browser has been updated)
				// await AuthDeviceRepository.updateDevice({ fingerprint, deviceId: lsDeviceId })
				return null
			} else {
				//* Handling if db has deviceId with other browser or OS
				await _logAttentionRepository.createLogAttention({ interCode: 804, userId, deviceId: lsDeviceId, logTime: queryTimeString })
				throw new BlockDevice(getCodeDescription(804).message)
				//! Block device
			}
	
			return lsDeviceId
		}

	} else return null
}

const createNewDeviceWithHandling = async ({ interCode, fingerprint, userId, queryTimeString, deviceType }) => {
	let deviceId
	
	try {
		deviceId = await AuthDeviceRepository.createDevice({ fingerprint, regTime: queryTimeString, deviceType: deviceType || 'Unknown'  })

		await _logAttentionRepository.createLogAttention({ interCode, userId, deviceId, logTime: queryTimeString })
	}catch {
		//* Handling if db have this fingerprint, but device doesn't have number in LocalStorage
		deviceId = await AuthDeviceRepository.getDeviceId(fingerprint.hash)
		await _logAttentionRepository.createLogAttention({ interCode: 803, userId, deviceId, logTime: queryTimeString })
	}
	return deviceId
}

const getDeviceId = async ({ interCode, fingerprint, userId, queryTimeString, deviceType, lsDeviceId }) => {
	const deviceId = await deviceIdHandlingAndUpdating({ lsDeviceId, fingerprint, userId, queryTimeString }) ||
		await createNewDeviceWithHandling({ interCode, fingerprint, userId, queryTimeString, deviceType })

	return deviceId
}

class AuthService {

	static async signIn({ username, password, fingerprint, fastSession, queryTime, queryTimeString, deviceType, lsDeviceId }) {

		const userData = await UserRepository.getUserData(username)
		
		if (!userData) {
			throw new Conflict("Пользователь не найден")
		}

		const userId = userData.id
		const interCode = !fastSession ? 201 : 202
		
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
		//*
		
		const deviceId = await getDeviceId({ interCode, fingerprint, userId, queryTimeString, deviceType, lsDeviceId })
		
		await _logAuthRepository.createLogAuth({ interCode, userId, deviceId, logTime: queryTimeString })


		const payload = {
			userId,
			username,
			isActivated: userData.is_activated,
		}

		const accessToken = await TokenService.generateAccessToken(payload)
		const refreshToken = await TokenService.generateRefreshToken(payload)

		const timeOutInSec = 5
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
		
		//* Auto logOut timer (back)
		if (logOutTime) {
			setTimeout(async () => {
				const successDeleting = await RefreshSessionsRepository.deleteRefreshSessionByLogInTime(queryTime)

				if (successDeleting) {
					await _logAuthRepository.createLogAuth({ interCode: 204, userId, deviceId, logTime: logOutTime.toLocaleString() })
				}
			}, timeOutInSec * 1000)
		}
		//*

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
		let userId
		let userInfo
		const interCode = 205

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

		const deviceId = await getDeviceId({ interCode, fingerprint, userId, queryTimeString, deviceType, lsDeviceId })

		await _logAttentionRepository.createLogAttention({ interCode, userId, deviceId, logTime: queryTimeString })
		await _logAuthRepository.createLogAuth({ interCode, userId, deviceId, logTime: queryTimeString })

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

	static async logOut({ refreshToken, queryTimeString, interCode }) {
		const refreshSession = await RefreshSessionsRepository.getRefreshSession(refreshToken)

		if (refreshSession){
			await _logAuthRepository.createLogAuth({ interCode: interCode || 203, userId: refreshSession.user_id, deviceId: refreshSession.device_id, logTime: queryTimeString })
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
			await deviceIdHandlingAndUpdating({ lsDeviceId, fingerprint, userId: refreshSession.user_id, queryTimeString })
		if (refreshSession.device_id !== deviceId) {
			let interCodeAttention = 801
			if (!deviceId) {
				deviceId = await AuthDeviceRepository.createDevice({ fingerprint, regTime: queryTimeString, deviceType: 'Unknown' })
				interCodeAttention = 802
				throw new BlockDevice(getCodeDescription(interCodeAttention).message)
				//! Block device
			}
			await _logAttentionRepository.createLogAttention({ interCode: interCodeAttention, userId: refreshSession.user_id, deviceId, logTime: queryTimeString })

			throw new Forbidden(getCodeDescription(interCodeAttention).message)
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