import AuthService from '../services/Auth-service'
import { COOKIE_SETTINGS } from '../../constants'
import { getTime } from '../utils/getTime'
import { ISignInController, ISignUpController } from '../types/Auth-types'
import { ICheckUserReq, ILoginServiceRes, ILogOutReq, IRefreshReq } from '../../../common/types/Auth-types'
import { ICommonVar } from '../../../common/types/Global-types'
import { catchError } from '../utils/Errors.ts'
import UserService from '../services/User-service.ts'



type ICheckPrevRefreshToken = {
	prevRefreshToken: ICommonVar['refreshToken'];
	res: ICommonVar['res'];
	userId: ICommonVar['id'];
	queryTime: number;
}
const checkPrevRefreshToken = async ({ prevRefreshToken, res, userId, queryTime }: ICheckPrevRefreshToken) => {
	if (!prevRefreshToken) {
		return
	}

	await AuthService.logOut({ refreshToken: prevRefreshToken, queryTime, interCode: 207 })
	res.clearCookie(getUserCookieName(userId))
}

export const getUserCookieName = (userId: ICommonVar['id']) => {
	return `token-${userId}`
}


class AuthController {

	static async signIn(req: ICommonVar['req'], res: ICommonVar['res']) {

		const { username, password, fastSession, deviceType, lsDeviceId, deviceIP }: ISignInController = req.body
		const { fingerprint } = req
		const queryTime = getTime()


		try {
			const {
				accessToken,
				refreshToken,
				accessTokenExpiration,
				userInfo,
				deviceId,
			}: ILoginServiceRes & Pick<ICommonVar, 'refreshToken'> = await AuthService.signIn({
				username,
				password,
				fingerprint,
				fastSession,
				queryTime,
				deviceType,
				lsDeviceId,
				deviceIP,
			})

			const prevRefreshToken: ICommonVar['refreshToken'] = req.cookies[getUserCookieName(userInfo.userId)]
			checkPrevRefreshToken({ prevRefreshToken, res, userId: userInfo.userId, queryTime })
				.finally(() => {
					res.cookie(getUserCookieName(userInfo.userId), refreshToken, COOKIE_SETTINGS.REFRESH_TOKEN)

					return res.status(200).json({ accessToken, accessTokenExpiration, userInfo, deviceId })
				})
		} catch (err) {
			return catchError({ req, res, err, queryTime, interCode: !fastSession ? 201 : 202 })
		}
	}


	static async checkUser(req: ICommonVar['req'], res: ICommonVar['res']) {
		const { username, password }: ICheckUserReq = req.body
		const { fingerprint } = req
		const queryTime = getTime()


		try {
			const { username: userName, hashedPassword } = await AuthService.checkUser({
				username,
				password,
				fingerprint,
				queryTime,
			})
			const avatarsList = await UserService.getUsedAvatarsList()

			return res.status(200).json({ username: userName, hashedPassword, avatarsList })
		} catch (err) {
			return catchError({ req, res, err, queryTime, interCode: 711 })
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
			gender,
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
				deviceId,
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
				gender,
				deviceType,
				lsDeviceId,
				deviceIP,
				fingerprint,
				queryTime,
			})

			res.cookie(getUserCookieName(userInfo.userId), refreshToken, COOKIE_SETTINGS.REFRESH_TOKEN)

			return res.status(200).json({ accessToken, accessTokenExpiration, userInfo, deviceId })
		} catch (err) {
			return catchError({ req, res, err, queryTime, interCode: 205 })
		}
	}


	static async logOut(req: ICommonVar['req'], res: ICommonVar['res']) {
		// console.log('logOut')
		const { interCode, userId }: ILogOutReq = req.body
		const refreshToken: string = req.cookies[getUserCookieName(userId)]
		const queryTime = getTime()


		try {
			await AuthService.logOut({ refreshToken, queryTime, interCode })
			res.clearCookie(getUserCookieName(userId))

			return res.sendStatus(200)
		} catch (err) {
			// console.log('Logout refresh', err)
			res.clearCookie(getUserCookieName(userId))
			return catchError({ req, res, err, queryTime, interCode: 203 })
		}
	}


	static async refresh(req: ICommonVar['req'], res: ICommonVar['res']) {
		const { lsDeviceId, userId }: IRefreshReq = req.body
		const { fingerprint } = req
		const queryTime = getTime()
		const currentRefreshToken = req.cookies[getUserCookieName(userId)]

		try {
			const { accessToken, refreshToken, accessTokenExpiration, logOutTime, userInfo, deviceId, isFast } =
				await AuthService.refresh({
					fingerprint,
					currentRefreshToken,
					queryTime,
					lsDeviceId,
				})

			res.cookie(getUserCookieName(userId), refreshToken, COOKIE_SETTINGS.REFRESH_TOKEN)

			return res.status(200).json({ accessToken, accessTokenExpiration, logOutTime, userInfo, deviceId, isFast })
		} catch (err) {
			res.clearCookie(getUserCookieName(userId))
			return catchError({ req, res, err, queryTime, interCode: 701 })
		}
	}
}

export default AuthController
