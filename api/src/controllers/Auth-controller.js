import AuthService from "../services/Auth-service.js"
import ErrorsUtils from "../../utils/Errors.js"
import { COOKIE_SETTINGS } from "../../constants.js"



const getTime = () => {
	const queryTime = new Date()
	const queryTimeString = queryTime.toLocaleString()

	return { queryTime, queryTimeString }
}

class AuthController {
	static async signIn(req, res) {
		// console.log(req)
		const { username, password, fastSession, deviceType, lsDeviceId } = req.body
		const { fingerprint } = req
		const { queryTime, queryTimeString } = getTime()
		// console.log(deviceType)

		try {
			const { accessToken, refreshToken, accessTokenExpiration, logOutTime, userInfo, deviceId } = await AuthService.signIn({ 
				username, 
				password, 
				fingerprint, 
				fastSession, 
				queryTime, 
				queryTimeString,
				deviceType,
				lsDeviceId,
			})
			
			res.cookie("refreshToken", refreshToken, COOKIE_SETTINGS.REFRESH_TOKEN)

			return res.status(200).json({ accessToken, accessTokenExpiration, logOutTime, userInfo, deviceId })
		} catch (err) {
			return ErrorsUtils.catchError({ typeCode: !fastSession ? 201 : 202, req, res, err, username, fingerprint, queryTimeString })
		}
	}

	static async signUp(req, res) {
		const { username, hashedPassword, phone, store, job, last_name, first_name, middle_name, avatar, deviceType, lsDeviceId } = req.body
		const { fingerprint } = req
		const { queryTime, queryTimeString } = getTime()

		
		try {
			const { accessToken, refreshToken, accessTokenExpiration, userInfo, deviceId } = await AuthService.signUp({ 
				username, 
				hashedPassword, 
				phone, 
				store, 
				job, 
				lastName: last_name,
				firstName: first_name,
				middleName: middle_name, 
				avatar, 
				fingerprint, 
				queryTime,
				queryTimeString,
				deviceType,
				lsDeviceId,
			})
			
			res.cookie("refreshToken", refreshToken, COOKIE_SETTINGS.REFRESH_TOKEN)
			
			return res.status(200).json({ accessToken, accessTokenExpiration, userInfo, deviceId })
		} catch (err) {
			return ErrorsUtils.catchError({ typeCode: 205,req, res, err, username, fingerprint, queryTimeString })
		}
	}

	static async logOut(req, res) {
		const refreshToken = req.cookies.refreshToken
		const { interCode } = req.body
		const { fingerprint } = req
		const { queryTimeString } = getTime()


		try {
			await AuthService.logOut({ refreshToken, queryTimeString, interCode })

			res.clearCookie("refreshToken")

			return res.sendStatus(200)
		} catch (err) {
			return ErrorsUtils.catchError({ typeCode: 203, req, res, err, fingerprint, queryTimeString })
		}
	}

	static async refresh(req, res) {
		const { lsDeviceId } = req.body
		const { fingerprint } = req
		const { queryTimeString } = getTime()
		const currentRefreshToken = req.cookies.refreshToken


		try {
			const { accessToken, refreshToken, accessTokenExpiration, logOutTime, userInfo, deviceId } =
				await AuthService.refresh({
					currentRefreshToken,
					fingerprint,
					queryTimeString,
					lsDeviceId,
				})

			res.cookie("refreshToken", refreshToken, COOKIE_SETTINGS.REFRESH_TOKEN)

			return res.status(200).json({ accessToken, accessTokenExpiration, logOutTime, userInfo, deviceId })
		} catch (err) {
			return ErrorsUtils.catchError({ typeCode: 701, req, res, err, fingerprint, queryTimeString })
		}
	}

	static async checkUser(req, res) {
		const { username, password } = req.body
		const { fingerprint } = req
		const { queryTime, queryTimeString } = getTime()


		try {
			const { userName, hashedPassword, avatarsList } = await AuthService.checkUser({ username, password, queryTime, queryTimeString })

			return res.status(200).json({ userName, hashedPassword, avatarsList })
		} catch (err) {
			return ErrorsUtils.catchError({ typeCode: 711, req, res, err, username, fingerprint, queryTimeString })
		}
	}
}

export default AuthController