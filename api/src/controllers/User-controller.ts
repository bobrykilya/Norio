import { HoroscopeTypeOptions, ICommonVar } from "../../../common/types/Global-types.ts"
import ErrorsUtils, { NotFound } from "../utils/Errors.ts"
import HoroscopeService from "../services/Horoscope-service.ts"
import { IUserInfoEditReq } from "../../../common/types/User-types.ts"
import UserService from "../services/User-service.ts"
import { getTime } from "../utils/getTime.ts"



class UserController {
	static async getHoroscope(req: { body: { horoscopeType: HoroscopeTypeOptions } }, res: ICommonVar['res']) {
		try {
			const { horoscopeType } = req.body
			const data = await HoroscopeService.getHoroscopeData(horoscopeType)

			return res.status(200).json(data)
		} catch (err) {
			throw new NotFound(err.message)
		}
	}

	static async editUserInfo(req: { body: IUserInfoEditReq, user: ICommonVar['payload'], fingerprint: ICommonVar['fingerprint'] }, res: ICommonVar['res']) {
		const { fingerprint } = req
		const queryTime = getTime()

		try {
			await UserService.editUserInfo(req.body, req.user)

			return res.status(200).json()
		} catch (err) {
			return ErrorsUtils.catchError({ interCode: 205, req: req as ICommonVar['req'], res, err, username: req.user.username, fingerprint, queryTime })
		}
	}
}

export default UserController
