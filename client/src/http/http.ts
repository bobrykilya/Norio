import ky from 'ky'

import { CHECK_IP_AND_COUNTRY } from '@/../constants'
import { showSnackMessage } from '@features/showSnackMessage/showSnackMessage'
import { useJwtInfoListState } from '@stores/Auth-store'
import { useUserInfoState } from '@stores/User-store'



const getApiURL = () => {
	return import.meta.env.VITE_API_URL
}
const $apiAuth = ky.create({
	prefixUrl: `${getApiURL()}/auth`,
	cache: 'no-store',
	credentials: 'include',
})

const $apiUnprotected = ky.create({
	prefixUrl: `${getApiURL()}/unprotected`,
})

const $apiProtected = ky.create({
	prefixUrl: `${getApiURL()}/protected`,
	cache: 'no-store',
	credentials: 'include',
	hooks: {
		beforeRequest: [
			(req) => {
				const currentUserId = useUserInfoState.getState().userInfoState.userId
				const accessToken = useJwtInfoListState.getState().getJwtInfoState(currentUserId)?.token
				if (accessToken) {
					req.headers.set('Authorization', `Bearer ${accessToken}`)
				}
			},
		],
	},
})


const $apiIpInfo = ky.create({
	prefixUrl: `https://ipapi.co/json`,
})

const $apiIpInfoReserve = ky.create({
	prefixUrl: `http://ip-api.com/json`,
})


type IApiIpInfoResponse = {
	ip: string;
	country_code: string;
}
type IApiIpInfoReserveResponse = {
	query: string;
	countryCode: string;
}

const getIPInfo = async () => {
	try {
		if (!CHECK_IP_AND_COUNTRY) return undefined

		return await $apiIpInfo.get('').json<IApiIpInfoResponse>()
	} catch {
		console.error('Ошибка обращения к сервису ipapi.co')
		try {
			const res = await $apiIpInfoReserve.get('').json<IApiIpInfoReserveResponse>()
			return {
				country_code: res.countryCode,
				ip: res.query,
			}
		} catch {
			showSnackMessage({
				type: 'w',
				message: 'Ошибка обращения к сервисам ipapi.co, ip-api.com',
			})
			console.error('Ошибка обращения к сервисам ipapi.co, ip-api.com')
			return undefined
		}
	}
}


export {
	$apiAuth,
	$apiIpInfo,
	$apiIpInfoReserve,
	$apiProtected,
	$apiUnprotected,
	getIPInfo,
}

