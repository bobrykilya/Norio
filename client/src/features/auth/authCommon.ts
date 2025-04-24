import { useDeviceInfoState } from "../../stores/Device-store"
import { ILoginServiceRes } from "../../../../common/types/Auth-types"
import JWTInfoService from "../../services/JWTInfoService"
import { IUserNameInfo } from "../../types/Auth-types"
import { IUserRepository } from "../../../../api/src/types/DB-types"
import { CURRENT_USER_LS, DEVICE_LS, SWITCH_USERS_ID_LS } from "../../../constants"
import { useUserInfoState } from "../../stores/User-store"
import { HoroscopeTypeOptions, ICommonVar } from "../../../../common/types/Global-types"
import { getLSObject, removeLS, setLSObject } from "../../utils/localStorage"
import { IDeviceInfo } from "../../types/Device-types"
import { useJwtInfoListState } from "../../stores/Auth-store"



const testAndUpdateLSDeviceId = (deviceId: number, lsDeviceId?: number) => {
	const lsDeviceId_2 = lsDeviceId || getLSObject<IDeviceInfo>(DEVICE_LS)?.id

	if (lsDeviceId_2 && (lsDeviceId_2 === deviceId)) {
		return
	}

	useDeviceInfoState.getState().setDeviceIdState(deviceId)
}

export type ICurrentUserLS= {
	userId: ICommonVar['id'],
	horoscope?: {
		horoscopeType: HoroscopeTypeOptions,
		birthday: number,
	}
}
export type ISwitchUsersIdLS = ICommonVar['id'][]

class AuthCommon {

	static loginUser = ({ accessToken, accessTokenExpiration, userInfo, deviceId, lsDeviceId, isFast }: ILoginServiceRes & { lsDeviceId?: number, isFast?: boolean }) => {
		JWTInfoService.setJWTInfo({ userInfo, accessToken, accessTokenExpiration, isFast })

		testAndUpdateLSDeviceId(deviceId, lsDeviceId)
		this.saveUserInfoOnBrowser(userInfo)
		AuthCommon.addSwitchUserInLS(userInfo.userId)
	}

	static updateUser = ({ userId, data }: { userId: ICommonVar['id'], data: Partial<IUserRepository> }) => {
		useJwtInfoListState.getState().updateJWTUserInfoState(userId, data)
		useUserInfoState.getState().updateUserInfoState(data)
	}

	static saveUserInfoOnBrowser = (userInfo: IUserRepository) => {
		useUserInfoState.setState({ userInfoState: userInfo })
		setLSObject(CURRENT_USER_LS, {
			userId: userInfo.userId,
		})
	}

	static getUserAccountInfo = ({ lastName, firstName, username }: IUserNameInfo) => {
		return lastName ? `${lastName} ${firstName} "${username}"` : username
	}
	
	static addSwitchUserInLS = (userId: ICommonVar['id']) => {
		const prevSwitchUsersIdList = getLSObject<ISwitchUsersIdLS>(SWITCH_USERS_ID_LS) || []

		if (prevSwitchUsersIdList.includes(userId)) {
			return
		}
		setLSObject(SWITCH_USERS_ID_LS, [...prevSwitchUsersIdList, userId])
	}

	static removeSwitchUserFromLS = (userId?: ICommonVar['id']) => {
		if (userId) {
			const prevSwitchUsers = getLSObject<ISwitchUsersIdLS>(SWITCH_USERS_ID_LS) || []

			if (!prevSwitchUsers) {
				return
			}

			const filteredSwitchUsers = prevSwitchUsers.filter(id => id !== userId)

			setLSObject(SWITCH_USERS_ID_LS, filteredSwitchUsers)
		} else {
			removeLS(SWITCH_USERS_ID_LS)
		}
	}
}


export default AuthCommon