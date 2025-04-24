import { IUserRepository } from "../../../api/src/types/DB-types"
import AuthService from "./Auth-service"
import { useJwtInfoListState } from "../stores/Auth-store"
import { DEVICE_LS } from "../../constants"
import { ICommonVar } from "../../../common/types/Global-types"
import { getLSObject } from "../utils/localStorage"
import { IDeviceInfo } from "../types/Device-types"



type ISetJWTInfo = {
    userInfo: IUserRepository;
    accessToken: string;
    accessTokenExpiration: number;
    isFast?: boolean;
}

const { addJwtInfoState, removeJwtInfoState } = useJwtInfoListState.getState()
let refreshTimeoutsObject = {}

class JWTInfoService {

    static refreshJWTInfo = (userId: ICommonVar['id'], expiration: number) => {
        const timeoutTrigger = expiration - 10000

        const refresh = async () => {
            const lsDeviceId = getLSObject<IDeviceInfo>(DEVICE_LS)?.id
            if (!lsDeviceId) return

            const { userInfo, accessToken, accessTokenExpiration } = await AuthService.refresh({ lsDeviceId, userId })
            this.setJWTInfo({ userInfo, accessToken, accessTokenExpiration })
        }

        refreshTimeoutsObject[userId] = setTimeout(refresh, timeoutTrigger)
    }

    static setJWTInfo = ({ userInfo, accessToken, accessTokenExpiration, isFast }: ISetJWTInfo) => {
        // console.log(userInfo)
        addJwtInfoState({
            userInfo,
            token: accessToken,
            isFast
        })
        this.refreshJWTInfo(userInfo.userId, accessTokenExpiration)
    }

    static deleteJWTInfo = (userId?: ICommonVar['id']) => {

        if (userId) {
            removeJwtInfoState(userId)
            if (refreshTimeoutsObject[userId]) {
                clearTimeout(refreshTimeoutsObject[userId])
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