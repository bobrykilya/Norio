import AuthService from "../services/Auth.js"
import ErrorsUtils from "../utils/Errors.js"
import { COOKIE_SETTINGS } from "../constants.js"

class AuthController {
	static async signIn(req, res) {
		const { username, password, fastSession } = req.body
		const { fingerprint } = req
		const queryTime = new Date()
		const queryTimeString = queryTime.toLocaleString()

		try {
			const { accessToken, refreshToken, accessTokenExpiration, logOutTime } = await AuthService.signIn({ 
				username, 
				password, 
				fingerprint, 
				fastSession, 
				queryTime, 
				queryTimeString, 
			})

			res.cookie("refreshToken", refreshToken, COOKIE_SETTINGS.REFRESH_TOKEN)

			return res.status(200).json({ accessToken, accessTokenExpiration, logOutTime })
		} catch (err) {
			return ErrorsUtils.catchError({ req, res, err, username, fingerprint, queryTimeString })
		}
	}

	static async signUp(req, res) {
		const { username, hashedPassword, phone, store, job, last_name, first_name, middle_name, avatar } = req.body
		const { fingerprint } = req
		const queryTime = new Date()
		const queryTimeString = queryTime.toLocaleString()
		
		try {
			const { accessToken, refreshToken, accessTokenExpiration } = await AuthService.signUp({ 
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
			})
			
			res.cookie("refreshToken", refreshToken, COOKIE_SETTINGS.REFRESH_TOKEN)
			
			return res.status(200).json({ accessToken, accessTokenExpiration })
		} catch (err) {
			return ErrorsUtils.catchError({ req, res, err, username, fingerprint, queryTimeString })
		}
	}

	static async logOut(req, res) {
		const refreshToken = req.cookies.refreshToken
		const { fingerprint } = req
		const queryTime = new Date()
		const queryTimeString = queryTime.toLocaleString()

		try {
			await AuthService.logOut({ refreshToken, queryTimeString })

			res.clearCookie("refreshToken")

			return res.sendStatus(200)
		} catch (err) {
			return ErrorsUtils.catchError({ req, res, err, fingerprint, queryTimeString })
		}
	}

	static async refresh(req, res) {
		const { fingerprint } = req
		const currentRefreshToken = req.cookies.refreshToken
		const queryTime = new Date()
		const queryTimeString = queryTime.toLocaleString()

		try {
			const { accessToken, refreshToken, accessTokenExpiration, logOutTime } =
				await AuthService.refresh({
					currentRefreshToken,
					fingerprint,
					queryTimeString,
				})

			res.cookie("refreshToken", refreshToken, COOKIE_SETTINGS.REFRESH_TOKEN)

			return res.status(200).json({ accessToken, accessTokenExpiration, logOutTime })
		} catch (err) {
			return ErrorsUtils.catchError({ req, res, err, fingerprint, queryTimeString })
		}
	}

	static async checkUser(req, res) {
		const { username, password } = req.body
		const { fingerprint } = req
		const queryTime = new Date()
		const queryTimeString = queryTime.toLocaleString()

		try {
			const { userName, userPassword, avatarsList } = await AuthService.checkUser({ username, password, queryTime, queryTimeString })

			return res.status(200).json({ userName, userPassword, avatarsList })
		} catch (err) {
			return ErrorsUtils.catchError({ req, res, err, username, fingerprint, queryTimeString })
		}
	}
}

export default AuthController