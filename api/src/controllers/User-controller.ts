import { HoroscopeTypeOptions, ICommonVar } from "../../../common/types/Global-types.ts"
import { catchError } from "../utils/Errors.ts"
import HoroscopeService from "../services/Horoscope-service.ts"
import { IUserInfoEditReq } from "../../../common/types/User-types.ts"
import UserService from "../services/User-service.ts"



class UserController {
	static async getHoroscope(req: { body: { horoscopeType: HoroscopeTypeOptions }, fingerprint: ICommonVar['fingerprint'] }, res: ICommonVar['res']) {
		try {
			const { horoscopeType } = req.body
			const data = await HoroscopeService.getHoroscopeData(horoscopeType)

			return res.status(200).json(data)
		} catch (err) {
			return catchError({ req, res, err })
		}
	}

	static async editUserInfo(req: { body: IUserInfoEditReq, user: ICommonVar['payload'], fingerprint: ICommonVar['fingerprint'] }, res: ICommonVar['res']) {
		try {
			await UserService.editUserInfo(req.body, req.user)

			return res.status(200).json()
		} catch (err) {
			return catchError({ req, res, err, interCode: 211 })
		}
	}
}

export default UserController
