import { showSnackBarMessage } from "../features/showSnackBarMessage/showSnackBarMessage"
import { $apiAuth, $apiSecureResource, $apiIpInfo } from "../http/http"



const getDeviceType = () => {
	const ua = navigator.userAgent
	const tabletRegex = /(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i
	const mobRegex = /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/
	
	if (tabletRegex.test(ua)) return "Tablet"
	if (mobRegex.test(ua)) return "Mobile"
	return "Desktop"
}

const checkCountryCode = async () => {
        const res = await $apiIpInfo.get("").json()
        // console.log(res)

        if (res.country_code !== 'BY') {
            throw new Error('Приложение работает только на территории РБ')
        }
}

const preRequest = async (data) => {
	// await checkCountryCode()

    const lsDeviceId = Number(localStorage.getItem('deviceId'))

	if (lsDeviceId) 
        return Object.assign(data, { lsDeviceId })

    const deviceType = getDeviceType()
	return Object.assign(data, { deviceType })
}


class AuthService {
    static async signIn(data) {
        // console.log(data)
        try {
            const newData = await preRequest(data)
            // console.log(newData)
            const res = await $apiAuth.post("sign-in", { json: newData }).json()

            return res
        } catch (err) {
            showSnackBarMessage(err)
            throw new Error('SignIn error')
        }
    }

    static async checkUser(data) {
        try {
            const res = await $apiAuth.post("check-user", { json: data }).json()

            return res
        } catch (err) {
            showSnackBarMessage(err)
        }
    }

    static async signUp(data) {
        try {
            const newData = await preRequest(data)
            
            const res = await $apiAuth.post("sign-up", { json: newData }).json()
            
            return res
        } catch (err) {
            showSnackBarMessage(err)
            throw new Error('SignUp error')
        }
    }

    static logOut() {
        try {
            $apiAuth.post("logout")

        } catch (err) {
            showSnackBarMessage(err)
        }
    }

    static async refresh() {
        try {
            const res = await $apiAuth.post("refresh")?.json()

            return res
        } catch (err) {
            // showSnackBarMessage(err)
            throw new Error('Token refresh error')
        }
    }

    static fetchProtected() {
        try {
            const res = $apiSecureResource.get("protected").json()

            return res
        } catch (err) {
            showSnackBarMessage(err)
            throw new Error('FetchProtected error')
        }
        
    }
}


export default AuthService