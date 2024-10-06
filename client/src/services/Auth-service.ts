import { showSnackMessage } from "../features/showSnackMessage/showSnackMessage"
import { $apiAuth, getApiInfo } from "../http/http"
import { PERMITTED_COUNTRIES } from "../../constants"
import {
    ICheckUserReq,
    ICheckUserRes,
    ILoginServiceRes,
    ILogOutReq,
    IPreprocessing,
    IRefreshReq,
    ISignInReq,
    ISignUpReq,
} from "../../../common/types/Auth-types"



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
        showSnackMessage({ type: 'e', message: 'Приложение работает только на территории РБ (И временно Польши)' })
        throw new Error('СheckCountryCode error')
    }
    return res.ip
}

const preRequest = async <T>(data: IPreprocessing & T) => {
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
    static async signIn(data: ISignInReq) {
        // console.log(data)
        try {
            const newData = await preRequest(data)
            return await $apiAuth.post("sign-in", { json: newData }).json<ILoginServiceRes>()
        } catch (err) {
            showSnackMessage(err)
            throw new Error('SignIn error')
        }
    }

    static async checkUser(data: ICheckUserReq) {
        try {
            return await $apiAuth.post("check-user", { json: data }).json<ICheckUserRes>()
        } catch (err) {
            showSnackMessage(err)
            throw new Error('CheckUser error')
        }
    }

    static async signUp(data: ISignUpReq) {
        try {
            const newData = await preRequest(data)

            return await $apiAuth.post("sign-up", { json: newData }).json<ILoginServiceRes>()
        } catch (err) {
            showSnackMessage(err)
            throw new Error('SignUp error')
        }
    }

    static logOut(data: ILogOutReq) {
        try {
            $apiAuth.post("logout", { json: data })

        } catch (err) {
            console.log(err)
            showSnackMessage(err)
        }
    }

    static async refresh(data: IRefreshReq) {
        try {
            return await $apiAuth.post("refresh", { json: data })?.json<ILoginServiceRes>()
        } catch (err) {
            // console.log(err)
            showSnackMessage(err)
            throw new Error('Token refresh error')
        }
    }

    // static fetchProtected() {
    //     try {
    //         return $apiSecureResource.get("protected").json()
    //     } catch (err) {
    //         showSnackMessage(err)
    //         throw new Error('FetchProtected error')
    //     }
        
    // }
}


export default AuthService