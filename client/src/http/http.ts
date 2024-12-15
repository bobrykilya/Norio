import ky from "ky"
import inMemoryJWTService from '../services/inMemoryJWT-service.js'
import { CHECK_IP_AND_COUNTRY } from "../../constants"
import { showSnackMessage } from "../features/showSnackMessage/showSnackMessage"



const $apiAuth = ky.extend({
	prefixUrl: `${import.meta.env.VITE_API_URL}/auth`,
	cache: 'no-store', 
	credentials: 'include',
})

const $apiUnprotected = ky.extend({
	prefixUrl: `${import.meta.env.VITE_API_URL}/unprotected`,
	cache: 'no-store',
	credentials: 'include',
})

const $apiSecureResource = ky.extend({
	prefixUrl: `${import.meta.env.VITE_API_URL}/resource`,
	hooks: {
		beforeRequest: [
		  (req) => {
			const accessToken = inMemoryJWTService.getToken()
			if (accessToken) {
				req.headers.set("Authorization", `Bearer ${accessToken}`)
			}
		  },
		],
	},
})


const $apiIpInfo = ky.extend({
	prefixUrl: `https://ipapi.co/json`,
})

const $apiIpInfoReserve = ky.extend({
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

const getApiInfo = async () => {
	try {
		if (!CHECK_IP_AND_COUNTRY) return undefined

		return await $apiIpInfo.get("").json<IApiIpInfoResponse>()
	} catch {
		console.error('Ошибка обращения к сервису ipapi.co')
		try {
			const res = await $apiIpInfoReserve.get("").json<IApiIpInfoReserveResponse>()
			return {
				country_code: res.countryCode,
				ip: res.query,
			}
		} catch {
			showSnackMessage({
				type: 'w',
				message: 'Ошибка обращения к сервисам ipapi.co, ip-api.com'
			})
			console.error('Ошибка обращения к сервисам ipapi.co, ip-api.com')
			return undefined
		}
	}
}


export {
	$apiAuth,
	$apiSecureResource,
	$apiUnprotected,
	$apiIpInfo,
	$apiIpInfoReserve,
	getApiInfo
}

