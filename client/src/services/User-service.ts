import { HoroscopeTypeOptions } from "../../../common/types/Global-types"
import { $apiUnprotected } from "../http/http"
import { IHoroscopeDataRes } from "../../../common/types/User-types"



class UserService {
	static async getHoroscopeData(horoscopeType: HoroscopeTypeOptions, { signal }: { signal: AbortSignal }) {
		try {
			// console.log(horoscopeType)
			return await $apiUnprotected.post("horoscope", { json: { horoscopeType }, signal })?.json<IHoroscopeDataRes>()
		} catch (err) {
			if (!signal.aborted) {
				console.log(err)
			}
			throw new Error('getHoroscopeData error')
		}
	}
}


export default UserService