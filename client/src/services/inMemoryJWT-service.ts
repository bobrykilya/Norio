import { LOGOUT_STORAGE_KEY } from "../../constants"
import AuthService from "./Auth-service";
import { getTime } from "../utils/getTime"



const inMemoryJWTService = () => {
    let inMemoryJWT: string | null = null
    let refreshTimeoutId: ReturnType<typeof setTimeout> | null = null

    const refreshToken = (expiration: number) => {
        const timeoutTrigger = expiration - 10000

        refreshTimeoutId = setTimeout(async () => {
            const lsDeviceId = JSON.parse(localStorage.getItem('deviceInfo'))?.id

            const { accessToken, accessTokenExpiration } = await AuthService.refresh({ lsDeviceId })
            setToken(accessToken, accessTokenExpiration)
        }, timeoutTrigger)
    }

    const abortRefreshToken = () => {
        if (refreshTimeoutId) {
            // clearInterval(refreshTimeoutId)
            clearTimeout(refreshTimeoutId)
        }
    }

    const getToken = () => inMemoryJWT

    const setToken = (token: string, tokenExpiration: number) => {
        inMemoryJWT = token
        refreshToken(tokenExpiration)
    }

    const deleteToken = () => {
        inMemoryJWT = null
        abortRefreshToken()
        localStorage.setItem(LOGOUT_STORAGE_KEY, String(getTime()))
    }

    return { getToken, setToken, deleteToken }
}

export default inMemoryJWTService()