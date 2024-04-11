import showErrorMessage from "../utils/showErrorMessage.js"
import { $apiAuth, $apiSecureResource, $apiIpInfo } from "../http/http.js"
import ky from "ky"



const getDeviceType = () => {
	const ua = navigator.userAgent
	const tabletRegex = /(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i
	const mobRegex = /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/
	
	if (tabletRegex.test(ua)) return "Tablet"
	if (mobRegex.test(ua)) return "Mobile"
	return "Desktop"
}

const getCountryCode = async () => {
    try {
        const res = await $apiIpInfo.get("").json()

        if (res.country_code !== 'BF') {
            // console.log(res)
            // throw new Error(res.json('Ошибка'))
        }

        return res.country_code
    }catch (err) {
        showErrorMessage(err)
    }
}

const addDeviceOtherData = async (data) => {
	const countryCode = await getCountryCode()
	const deviceType = getDeviceType()
	
	// console.log(countryCode)
	return Object.assign(data, { countryCode, deviceType })
}


class AuthService {
    static async signIn(data) {
        // console.log(data)
        try {
            const newData = await addDeviceOtherData(data)
            // console.log(newData)
            const res = await $apiAuth.post("sign-in", { json: newData }).json()
            
            return res
        } catch (err) {
            // console.log(err.message)
            showErrorMessage(err)
        }
    }

    static async checkUser(data) {
        try {
            const res = await $apiAuth.post("check-user", { json: data }).json()

            return res
        } catch (err) {
            showErrorMessage(err)
        }
    }

    static async signUp(data) {
        try {
            const newData = await addDeviceOtherData(data)
            
            const res = await $apiAuth.post("sign-up", { json: newData }).json()

            return res
        } catch (err) {
            showErrorMessage(err)
        }
    }

    static logOut() {
        try {
            $apiAuth.post("logout")
            // console.log(res)

            // return res
        } catch (err) {
            console.log(err)
            showErrorMessage(err)
        }
    }

    static async refresh() {
        try {
            const res = await $apiAuth.post("refresh").json()

            return res
        } catch (err) {
            showErrorMessage(err)
        }
    }

    static fetchProtected() {
        try {
            const res = $apiSecureResource.get("protected").json()

            return res
        } catch (err) {
            showErrorMessage(err)
        }
        
    }
}


export default AuthService