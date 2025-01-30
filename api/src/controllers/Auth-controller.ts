import AuthService from "../services/Auth-service"
import ErrorsUtils from "../utils/Errors"
import { COOKIE_SETTINGS } from "../../constants"
import { getTime } from "../utils/getTime"
import { ISignInController, ISignUpController } from "../types/Auth-types"
import {
	ICheckUserReq,
	ICheckUserRes,
	ILoginServiceRes,
	ILogOutReq,
	IRefreshReq,
} from "../../../common/types/Auth-types"
import { ICommonVar } from "../../../common/types/Global-types"



type ICheckPrevRefreshToken = {
	prevRefreshToken: ICommonVar['refreshToken'];
	res: ICommonVar['res'];
	username: ICommonVar['username'];
	queryTime: number;
}
const checkPrevRefreshToken = async ({ prevRefreshToken, res, username, queryTime }: ICheckPrevRefreshToken) => {
	if (!prevRefreshToken) {
		return
	}

	await AuthService.logOut({ refreshToken: prevRefreshToken, queryTime, interCode: 207 })
	res.clearCookie(getUserCookieName(username))
}

const getUserCookieName = (username: string) => {
	return `token-${username}`
}


class AuthController {

	static async signIn(req: ICommonVar['req'], res: ICommonVar['res']) {
		// console.log(req.body)
		const { username, password, fastSession, deviceType, lsDeviceId, deviceIP }: ISignInController = req.body
		const prevRefreshToken: ICommonVar['refreshToken'] = req.cookies[getUserCookieName(username)]
		const { fingerprint } = req
		const queryTime = getTime()


		try {
			const { accessToken, refreshToken, accessTokenExpiration, userInfo, deviceId }: ILoginServiceRes & Pick<ICommonVar, 'refreshToken'> = await AuthService.signIn({
				username,
				password,
				fingerprint,
				fastSession,
				queryTime,
				deviceType,
				lsDeviceId,
				deviceIP,
			})

			checkPrevRefreshToken({ prevRefreshToken, res, username, queryTime })
				.finally(() => {
					res.cookie(getUserCookieName(userInfo.username), refreshToken, COOKIE_SETTINGS.REFRESH_TOKEN)
					return res.status(200).json({ accessToken, accessTokenExpiration, userInfo, deviceId })
				})
		} catch (err) {
			return ErrorsUtils.catchError({ interCode: !fastSession ? 201 : 202, req, res, err, username, fingerprint, queryTime })
		}
	}



	static async checkUser(req: ICommonVar['req'], res: ICommonVar['res']) {
		const { username, password }: ICheckUserReq = req.body
		const { fingerprint } = req
		const queryTime = getTime()


		try {
			const { username: userName, hashedPassword, avatarsList }: ICheckUserRes = await AuthService.checkUser({ username, password, fingerprint, queryTime })

			return res.status(200).json({ username: userName, hashedPassword, avatarsList })
		} catch (err) {
			return ErrorsUtils.catchError({ interCode: 711, req, res, err, username, fingerprint, queryTime })
		}
	}



	static async signUp(req: ICommonVar['req'], res: ICommonVar['res']) {
		const {
			username,
			hashedPassword,
			phone,
			store,
			job,
			lastName,
			firstName,
			middleName,
			avatar,
			deviceType,
			lsDeviceId,
			deviceIP,
		}: ISignUpController = req.body
		const { fingerprint } = req
        const queryTime = getTime()

		
		try {
			const {
				accessToken,
				refreshToken,
				accessTokenExpiration,
				userInfo,
				deviceId
			}: ILoginServiceRes & Pick<ICommonVar, 'refreshToken'> = await AuthService.signUp({
				username,
				hashedPassword, 
				phone, 
				store, 
				job, 
				lastName,
				firstName,
				middleName,
				avatar, 
				deviceType,
				lsDeviceId,
				deviceIP,
				fingerprint,
				queryTime,
			})
			
			res.cookie(getUserCookieName(userInfo.username), refreshToken, COOKIE_SETTINGS.REFRESH_TOKEN)
			
			return res.status(200).json({ accessToken, accessTokenExpiration, userInfo, deviceId })
		} catch (err) {
			return ErrorsUtils.catchError({ interCode: 205,req, res, err, username, fingerprint, queryTime })
		}
	}



	static async logOut(req: ICommonVar['req'], res: ICommonVar['res']) {
		// console.log('logOut')
		const { interCode, username }: ILogOutReq = req.body
		const refreshToken: string = req.cookies[getUserCookieName(username)]
		const { fingerprint } = req
        const queryTime = getTime()


		try {
			await AuthService.logOut({ refreshToken, queryTime, interCode })
			res.clearCookie(getUserCookieName(username))

			return res.sendStatus(200)
		} catch (err) {
			res.clearCookie(getUserCookieName(username))
			return ErrorsUtils.catchError({ interCode: 203, req, res, err, fingerprint, queryTime })
		}
	}



	
	static async refresh(req: ICommonVar['req'], res: ICommonVar['res']) {
		const { lsDeviceId, username }: IRefreshReq = req.body
		const { fingerprint } = req
        const queryTime = getTime()
		const currentRefreshToken = req.cookies[getUserCookieName(username)]

		try {
			const { accessToken, refreshToken, accessTokenExpiration, logOutTime, userInfo, deviceId, isFast } =
				await AuthService.refresh({
					fingerprint,
					currentRefreshToken,
                    queryTime,
					lsDeviceId,
				})

			res.cookie(getUserCookieName(username), refreshToken, COOKIE_SETTINGS.REFRESH_TOKEN)
			
			return res.status(200).json({ accessToken, accessTokenExpiration, logOutTime, userInfo, deviceId, isFast })
		} catch (err) {
			// console.log('Error refresh', username)
			res.clearCookie(getUserCookieName(username))
			return ErrorsUtils.catchError({ interCode: 701, req, res, err, fingerprint, queryTime })
		}
	}
}

export default AuthController
