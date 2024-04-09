import showErrorMessage from "../utils/showErrorMessage.js"
import { $authClient, $resourceClient, $authInfo } from "../http/http.js"



const getDeviceType = () => {
	const ua = navigator.userAgent
	const tabletRegex = /(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i
	const mobRegex = /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/
	
	if (tabletRegex.test(ua)) return "Tablet"
	if (mobRegex.test(ua)) return "Mobile"
	return "Desktop"
}

const getCountryCode = async () => {
	return $authInfo.get('/').then((res) => {
		if (res.data.country_code !== 'BF') {
			// console.log(res.data)
			// throw new Error(res.json('Ошибка'))
		}
		return res.data.country_code
	})
	.catch(showErrorMessage)
}

const assignDeviceOtherData = async (data) => {
	const countryCode = await getCountryCode()
	const deviceType = getDeviceType()
	
	// console.log(countryCode)
	return Object.assign(data, { countryCode, deviceType })
}


class AuthService {
    static async signIn(data) {
        // console.log(data)
        try {
            const newData = await assignDeviceOtherData(data)
            const res = await $authClient.post("/sign-in", newData)
            
            return res.data
        } catch (error) {
            showErrorMessage(error)
        }
    }

    static async checkUser(data) {
        try {
            const res = await $authClient.post("/check-user", data)

            return res.data
        } catch (error) {
            showErrorMessage(error)
        }
    }

    static async signUp(data) {
        try {
            const newData = await assignDeviceOtherData(data)
            const res = await $authClient.post("/sign-up", newData)

            return res.data
        } catch (error) {
            showErrorMessage(error)
        }
    }

    static logOut() {
        try {
            const res = $authClient.post("/logout")

            return res.data
        } catch (error) {
            showErrorMessage(error)
        }
    }

    static async refresh() {
        try {
            const res = await $authClient.post("/refresh")

            return res.data
        } catch (error) {
            showErrorMessage(error)
        }
    }

    static fetchProtected() {
        try {
            const res = $resourceClient.get("/protected")

            return res.data
        } catch (error) {
            showErrorMessage(error)
        }
        
    }
}


export default AuthService