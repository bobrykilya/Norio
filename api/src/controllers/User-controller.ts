import { HoroscopeTypeOptions, ICommonVar } from "../../../common/types/Global-types.ts"
import { catchError } from "../utils/Errors.ts"
import HoroscopeService from "../services/Horoscope-service.ts"
import { IAccountInfoEditReq, IUserInfoEditReq } from "../../../common/types/User-types.ts"
import UserService from "../services/User-service.ts"
import { getTime } from "../utils/getTime.ts"
import { COOKIE_SETTINGS } from "../../constants.ts"
import { getUserCookieName } from "./Auth-controller.ts"



class UserController {
	static async getHoroscope(req: ICommonVar['req'], res: ICommonVar['res']) {
		try {
			const { horoscopeType } = req.query as { horoscopeType: HoroscopeTypeOptions }
			const data = await HoroscopeService.getHoroscopeData(horoscopeType)

			return res.status(200).json(data)
		} catch (err) {
			return catchError({ req, res, err })
		}
	}

	static async editUserInfo(req: ICommonVar['req'], res: ICommonVar['res']) {
		
		try {
			await UserService.editUserInfo(req.body as IUserInfoEditReq, req.user)

			return res.status(200).json()
		} catch (err) {
			return catchError({ req, res, err, interCode: 211 })
		}
	}

	static async editAccountInfo(req: ICommonVar['req'], res: ICommonVar['res']) {
		const { body, user } = req
		const queryTime = getTime()


		try {
			const newSessionData = await UserService.editAccountInfo(body as IAccountInfoEditReq, user, queryTime)
			if (newSessionData) {
				const { accessToken, refreshToken, accessTokenExpiration, userInfo, deviceId } = newSessionData
				res.cookie(getUserCookieName(userInfo.userId), refreshToken, COOKIE_SETTINGS.REFRESH_TOKEN)

				return res.status(200).json({ accessToken, accessTokenExpiration, userInfo, deviceId })
			}

			return res.status(200).json()
		} catch (err) {
			return catchError({ req, res, err, interCode: 211 })
		}
	}
}

export default UserController
