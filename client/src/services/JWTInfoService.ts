import { IUserRepository } from "../../../api/src/types/DB-types"
import AuthService from "./Auth-service"
import { useJwtInfoListState } from "../stores/Auth-store"
import { DEVICE_LS } from "../../constants"



type ISetJWTInfo = {
    userInfo: IUserRepository;
    accessToken: string;
    accessTokenExpiration: number;
    isFast?: boolean;
}

const { addJwtInfoState, removeJwtInfoState } = useJwtInfoListState.getState()
let refreshTimeoutsObject = {}

class JWTInfoService {

    static refreshJWTInfo = (username: string, expiration: number) => {
        const timeoutTrigger = expiration - 10000

        const refresh = async () => {
            const lsDeviceId = JSON.parse(localStorage.getItem(DEVICE_LS))?.id
            if (!lsDeviceId) return

            const { userInfo, accessToken, accessTokenExpiration } = await AuthService.refresh({ lsDeviceId, username })
            this.setJWTInfo({ userInfo, accessToken, accessTokenExpiration })
        }

        refreshTimeoutsObject[username] = setTimeout(refresh, timeoutTrigger)
    }

    static setJWTInfo = ({ userInfo, accessToken, accessTokenExpiration, isFast }: ISetJWTInfo) => {
        // console.log(userInfo)
        addJwtInfoState({
            userInfo,
            token: accessToken,
            isFast
        })
        this.refreshJWTInfo(userInfo.username, accessTokenExpiration)
    }

    static deleteJWTInfo = (username?: string) => {

        if (username) {
            removeJwtInfoState(username)
            if (refreshTimeoutsObject[username]) {
                clearTimeout(refreshTimeoutsObject[username])
            }
        } else {
            removeJwtInfoState()
            for (const timer in refreshTimeoutsObject) {
                clearTimeout(refreshTimeoutsObject[timer])
            }
        }
    }
}

export default JWTInfoService