import { HoroscopeTypeOptions, ICommonVar } from "../../../common/types/Global-types.ts"
import { NotFound } from "../utils/Errors.ts"
import HoroscopeService from "../services/Horoscope-service.ts"



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
}

export default UserController
