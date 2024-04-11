import AuthService from "../services/Auth-service.js"
import ErrorsUtils from "../utils/Errors.js"
import { COOKIE_SETTINGS } from "../constants.js"



const getTime = () => {
	const queryTime = new Date()
	const queryTimeString = queryTime.toLocaleString()

	return { queryTime, queryTimeString }
}

class AuthController {
	static async signIn(req, res) {
		// console.log(req)
		const { username, password, fastSession, deviceType, countryCode } = req.body
		const { fingerprint } = req
		const { queryTime, queryTimeString } = getTime()


		try {
			const { accessToken, refreshToken, accessTokenExpiration, logOutTime, userInfo } = await AuthService.signIn({ 
				username, 
				password, 
				fingerprint, 
				fastSession, 
				queryTime, 
				queryTimeString,
				deviceType,
				countryCode, 
			})
			
			res.cookie("refreshToken", refreshToken, COOKIE_SETTINGS.REFRESH_TOKEN)

			return res.status(200).json({ accessToken, accessTokenExpiration, logOutTime, userInfo })
		} catch (err) {
			return ErrorsUtils.catchError({ typeCode: !fastSession ? 201 : 202, req, res, err, username, fingerprint, queryTimeString })
		}
	}

	static async signUp(req, res) {
		const { username, hashedPassword, phone, store, job, last_name, first_name, middle_name, avatar, deviceType, countryCode } = req.body
		const { fingerprint } = req
		const { queryTime, queryTimeString } = getTime()

		
		try {
			const { accessToken, refreshToken, accessTokenExpiration, userInfo } = await AuthService.signUp({ 
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
				countryCode, 
			})
			
			res.cookie("refreshToken", refreshToken, COOKIE_SETTINGS.REFRESH_TOKEN)
			
			return res.status(200).json({ accessToken, accessTokenExpiration, userInfo })
		} catch (err) {
			return ErrorsUtils.catchError({ typeCode: 205,req, res, err, username, fingerprint, queryTimeString })
		}
	}

	static async logOut(req, res) {
		const refreshToken = req.cookies.refreshToken
		const { fingerprint } = req
		const { queryTime, queryTimeString } = getTime()
		// console.log(fingerprint)


		try {
			await AuthService.logOut({ refreshToken, queryTimeString })

			res.clearCookie("refreshToken")

			return res.sendStatus(200)
		} catch (err) {
			return ErrorsUtils.catchError({ typeCode: 203, req, res, err, fingerprint, queryTimeString })
		}
	}

	static async refresh(req, res) {
		const { fingerprint } = req
		const currentRefreshToken = req.cookies.refreshToken
		const { queryTime, queryTimeString } = getTime()


		try {
			const { accessToken, refreshToken, accessTokenExpiration, logOutTime, userInfo } =
				await AuthService.refresh({
					currentRefreshToken,
					fingerprint,
					queryTimeString,
				})

			res.cookie("refreshToken", refreshToken, COOKIE_SETTINGS.REFRESH_TOKEN)

			return res.status(200).json({ accessToken, accessTokenExpiration, logOutTime, userInfo })
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