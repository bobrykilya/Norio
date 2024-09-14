import { showSnackBarMessage } from "../features/showSnackBarMessage/showSnackBarMessage"
import { $apiAuth, getApiInfo } from "../http/http"
import {
    ICheckUserServiceResp,
    IHandleCheckUser,
    IHandleLogOut,
    IHandleSignIn,
    ILoginServiceResp,
    ISignUpServiceReq,
} from '../types/Auth-types'
import { PERMITTED_COUNTRIES } from "../../constants"



type IProcessedRequestLoginService<T> = T & {
    deviceIP?: string;
    lsDeviceId?: number;
    deviceType?: string;
}

const getDeviceType = () => {
	const ua = navigator.userAgent
	const tabletRegex = /(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i
	const mobRegex = /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/
	
	if (tabletRegex.test(ua)) return "Tablet"
	if (mobRegex.test(ua)) return "Mobile"
	return "Desktop"
}

const checkCountryCode = async () => {
    const res = await getApiInfo()
    // console.log(res)

    if (!res) return undefined

    if (!PERMITTED_COUNTRIES.includes(res.country_code)) {
        showSnackBarMessage({ type: 'e', message: 'Приложение работает только на территории РБ (И временно Польши)' })
        throw new Error('СheckCountryCode error')
    }
    return res.ip
}

const preRequest = async <T>(data: IProcessedRequestLoginService<T>) => {
    data.deviceIP = await checkCountryCode()
    
    const lsDeviceId = Number(localStorage.getItem('deviceId'))

	if (lsDeviceId) {
        return Object.assign(data, { lsDeviceId })
    } else {
        const deviceType = getDeviceType()
        return Object.assign(data, { deviceType })
    }
}


class AuthService {
    static async signIn(data: IHandleSignIn) {
        // console.log(data)
        try {
            const newData = await preRequest(data)
            const res = await $apiAuth.post("sign-in", { json: newData }).json<ILoginServiceResp>()

            return res
        } catch (err) {
            showSnackBarMessage(err)
            throw new Error('SignIn error')
        }
    }

    static async checkUser(data: IHandleCheckUser) {
        try {
            const res = await $apiAuth.post("check-user", { json: data }).json<ICheckUserServiceResp>()

            return res
        } catch (err) {
            showSnackBarMessage(err)
            throw new Error('CheckUser error')
        }
    }

    static async signUp(data: ISignUpServiceReq) {
        try {
            const newData = await preRequest(data)
            
            const res = await $apiAuth.post("sign-up", { json: newData }).json<ILoginServiceResp>()
            
            return res
        } catch (err) {
            showSnackBarMessage(err)
            throw new Error('SignUp error')
        }
    }

    static logOut(data: IHandleLogOut) {
        try {
            $apiAuth.post("logout", { json: data })

        } catch (err) {
            console.log(err)
            showSnackBarMessage(err)
        }
    }

    static async refresh(data: { lsDeviceId?: number } = {}) {
        try {
            const res = await $apiAuth.post("refresh", { json: data })?.json<ILoginServiceResp>()

            return res
        } catch (err) {
            // console.log(err)
            showSnackBarMessage(err)
            throw new Error('Token refresh error')
        }
    }

    // static fetchProtected() {
    //     try {
    //         const res = $apiSecureResource.get("protected").json()

    //         return res
    //     } catch (err) {
    //         showSnackBarMessage(err)
    //         throw new Error('FetchProtected error')
    //     }
        
    // }
}


export default AuthService