import axios from "axios"
import config from "../config.js"
import inMemoryJWT from '../services/inMemoryJWT-service.js'



const $authClient = axios.create({
	baseURL: `${config.API_URL}/auth`,
	withCredentials: true,
})

const $resourceClient = axios.create({
	baseURL: `${config.API_URL}/resource`,
})

$resourceClient.interceptors.request.use((config) => {
	const accessToken = inMemoryJWT.getToken()

	if (accessToken) {
		config.headers["Authorization"] = `Bearer ${accessToken}`
	}

	return config
},
	(error) => {
		Promise.reject(error)
	}
)

const $authInfo = axios.create({
	baseURL: `https://ipapi.co/json`,
})


export { $authClient, $resourceClient, $authInfo }

