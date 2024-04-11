import ky from "ky"
import config from "../config.js"
import inMemoryJWTService from '../services/inMemoryJWT-service.js'



const $apiAuth = ky.extend({
	prefixUrl: `${config.API_URL}/auth`,
	cache: 'no-store', 
	credentials: 'include',
})

const $apiSecureResource = ky.extend({
	prefixUrl: `${config.API_URL}/resource`,
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


export { $apiAuth, $apiSecureResource, $apiIpInfo }

