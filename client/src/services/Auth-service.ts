import { showSnackMessage } from "../features/showSnackMessage/showSnackMessage"
import { $apiAuth, getApiInfo } from "../http/http"
import { DEVICE_LS, PERMITTED_COUNTRIES } from "../../constants"
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
import { useDeviceInfoState } from "../stores/Device-store"
import { IDeviceInfo } from "../types/Device-types"



const getAndSaveDeviceType = (lsDeviceInfo: IDeviceInfo) => {
    let deviceType: IDeviceInfo['type']
	const ua = navigator.userAgent
	const tabletRegex = /(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i
	const mobRegex = /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/
	
	if (tabletRegex.test(ua)) {
        deviceType = "Tablet"
    } else if (mobRegex.test(ua)) {
        deviceType = "Mobile"
    } else {
        deviceType = "Desktop"
    }
    
    useDeviceInfoState.getState().setDeviceTypeState(deviceType)
    localStorage.setItem(DEVICE_LS, JSON.stringify({ ...lsDeviceInfo, type: deviceType }))

    return deviceType
}

const checkCountryCodeAndGetIP = async () => {
    const res = await getApiInfo()
    // console.log(res)

    if (!res) return undefined

    if (!PERMITTED_COUNTRIES.includes(res.country_code)) {
        showSnackMessage({
            type: 'e',
            message: 'Приложение работает только на территории РБ (И временно Польши)'
        })
        throw new Error('СheckCountryCode error')
    }
    return res.ip
}

const preRequest = async <T>(data: IPreprocessing & T) => {
    data.deviceIP = await checkCountryCodeAndGetIP()

    const lsDeviceInfo: IDeviceInfo = JSON.parse(localStorage.getItem(DEVICE_LS))
    const lsDeviceId = lsDeviceInfo?.id
    const deviceType = lsDeviceInfo?.type || getAndSaveDeviceType(lsDeviceInfo)

    return Object.assign(data, { lsDeviceId, deviceType })
}


class AuthService {
    static async signIn(data: ISignInReq) {
        try {
            return await $apiAuth.post("sign-in" ,{ json: await preRequest(data) }).json<ILoginServiceRes>()
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
            return await $apiAuth.post("sign-up", { json: await preRequest(data) }).json<ILoginServiceRes>()
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

    // static throttledRefresh = asyncThrottle<ILoginServiceRes>(this.refresh, 1000)
}


export default AuthService