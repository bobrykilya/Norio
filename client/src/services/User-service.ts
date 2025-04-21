import { HoroscopeTypeOptions, ICommonVar } from "../../../common/types/Global-types"
import { $apiProtected, $apiUnprotected } from "../http/http"
import { IAccountInfoEditReq, IHoroscopeDataRes, IUserInfoEditReq } from "../../../common/types/User-types"
import { showSnackMessage } from "../features/showSnackMessage/showSnackMessage"



class UserService {
	static async getHoroscopeData(horoscopeType: HoroscopeTypeOptions, { signal }: { signal: AbortSignal }) {
		try {
			// console.log(horoscopeType)
			return await $apiUnprotected.post("horoscope", { json: { horoscopeType }, signal })?.json<IHoroscopeDataRes>()
		} catch (err) {
			if (!signal.aborted) {
				console.log(err)
			}
			throw new Error('GetHoroscopeData error')
		}
	}

	static async editUserInfo(data: IUserInfoEditReq) {
		try {
			await $apiProtected.post("edit-user-info", { json: data })?.json()
			return true
		} catch (err) {
			showSnackMessage(err)
			return false
		}
	}

	static async editAccountInfo(data: IAccountInfoEditReq) {
		try {
			await $apiProtected.post("edit-account-info", { json: data })?.json()
			return true
		} catch (err) {
			showSnackMessage(err)
			return false
		}
	}

	static async checkPassword(currentPassword: ICommonVar['password']) {
		try {
			await $apiProtected.post("protected-check-user", { json: { currentPassword } })?.json()
			return true
		} catch (err) {
			showSnackMessage(err)
			return false
		}
	}
}


export default UserService