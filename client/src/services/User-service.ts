import { $apiProtected, $apiUnprotected } from '@/http/http'
import AuthCommon from '@features/auth/authCommon'
import { showSnackMessage } from '@features/showSnackMessage/showSnackMessage'
import { ILoginServiceRes } from '@shared/types/Auth-types'
import { HoroscopeTypeOptions, ICommonVar } from '@shared/types/Global-types'
import { IAccountInfoEditReq, IHoroscopeDataRes, IUserInfoEditReq } from '@shared/types/User-types'



class UserService {
	static async getHoroscopeData(horoscopeType: HoroscopeTypeOptions, { signal }: { signal: AbortSignal }) {
		try {
			// console.log(horoscopeType)
			return await $apiUnprotected.get('horoscope', {
				searchParams: {
					horoscopeType,
				},
				signal,
			})?.json<IHoroscopeDataRes>()
		} catch (err) {
			if (err.name !== 'AbortError') {
				console.error(err)
			}
			throw new Error('GetHoroscopeData error')
		}
	}

	static async getUsedAvatarsList() {
		try {
			return await $apiUnprotected.get('used-avatars')?.json<{ avatarsList: ICommonVar['avatar'][] }>()
		} catch (err) {
			throw new Error('getUsedAvatarsList error')
		}
	}

	static async editUserInfo(data: IUserInfoEditReq) {
		try {
			await $apiProtected.patch('edit-user-info', { json: data })?.json()
			return true
		} catch (err) {
			showSnackMessage(err)
			return false
		}
	}

	static async editAccountInfo(data: IAccountInfoEditReq) {

		try {
			const newSessionData = await $apiProtected.patch('edit-account-info', { json: data })?.json<ILoginServiceRes>()

			if (newSessionData) {
				const { accessToken, accessTokenExpiration, userInfo, deviceId } = newSessionData
				AuthCommon.loginUser({ accessToken, accessTokenExpiration, userInfo, deviceId, isFast: false })
			}

			return true
		} catch (err) {
			showSnackMessage(err)
			return false
		}
	}
}


export default UserService