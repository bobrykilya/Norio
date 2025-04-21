import { HoroscopeTypeOptions, ICommonVar } from "../../../common/types/Global-types.ts"
import { catchError, Errors } from "../utils/Errors.ts"
import HoroscopeService from "../services/Horoscope-service.ts"
import { IAccountInfoEditReq, IUserInfoEditReq } from "../../../common/types/User-types.ts"
import UserService from "../services/User-service.ts"
import AuthService from "../services/Auth-service.ts"



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

	static async editUserInfo(req: { body: IUserInfoEditReq, user: ICommonVar['payload'] }, res: ICommonVar['res']) {
		try {
			await UserService.editUserInfo(req.body, req.user)

			return res.status(200).json()
		} catch (err) {
			return catchError({ req, res, err, interCode: 211 })
		}
	}

	static async editAccountInfo(req: { body: IAccountInfoEditReq, user: ICommonVar['payload'] }, res: ICommonVar['res']) {
		const { body, user } = req

		
		try {
			await UserService.editAccountInfo(body, user)

			return res.status(200).json()
		} catch (err) {
			return catchError({ req, res, err, interCode: 211 })
		}
	}

	static async protectedCheckUser(req: { body: { currentPassword: ICommonVar['password'] }, fingerprint: ICommonVar['fingerprint'], user: ICommonVar['payload'] }, res: ICommonVar['res']) {
		const { currentPassword } = req.body
		const { user } = req


		try {
			await AuthService.checkPasswordByUsername({
				username: user.username,
				password: currentPassword,
				error: Errors.passwordInvalid()
			})

			return res.status(200).json()
		} catch (err) {
			return catchError({ req, res, err })
		}
	}
}

export default UserController
