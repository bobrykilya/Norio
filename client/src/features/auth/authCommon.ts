import { useDeviceInfoState } from "../../stores/Device-store"
import { ILoginServiceRes } from "../../../../common/types/Auth-types"
import JWTInfoService from "../../services/JWTInfoService"
import { useUserInfoState } from "../../stores/Auth-store"
import { IUserNameInfo } from "../../types/Auth-types"
import { IUserRepository } from "../../../../api/src/types/DB-types"
import { DEVICE_LS, SWITCH_USERS_LS, USER_LS } from "../../../constants"



const testAndUpdateLSDeviceId = (deviceId: number, lsDeviceId?: number) => {
	const lsDeviceId_2 = lsDeviceId || JSON.parse(localStorage.getItem(DEVICE_LS))?.id

	if (lsDeviceId_2 && (lsDeviceId_2 === deviceId)) {
		return
	}

	useDeviceInfoState.getState().setDeviceIdState(deviceId)
}


class AuthCommon {

	static loginUser = ({ accessToken, accessTokenExpiration, userInfo, deviceId, lsDeviceId, isFast }: ILoginServiceRes & { lsDeviceId?: number, isFast?: boolean }) => {
		JWTInfoService.setJWTInfo({ userInfo, accessToken, accessTokenExpiration, isFast })

		testAndUpdateLSDeviceId(deviceId, lsDeviceId)
		this.saveUserInfoOnBrowser(userInfo)
		AuthCommon.addSwitchUserInLS(userInfo.username)
	}

	static saveUserInfoOnBrowser = (userInfo: IUserRepository ) => {
		useUserInfoState.setState({ userInfoState: userInfo })
		localStorage.setItem(USER_LS, JSON.stringify({
			username: userInfo.username,
			firstName: userInfo.firstName,
			lastName: userInfo.lastName,
		}))
	}

	static getUserAccountInfo = ({ lastName, firstName, username }: IUserNameInfo) => {
		return lastName ? `${lastName} ${firstName} "${username}"` : username
	}


	
	static addSwitchUserInLS = (username: string) => {
		const prevSwitchUsersList: string[] = JSON.parse(localStorage.getItem(SWITCH_USERS_LS) || null) || []

		if (prevSwitchUsersList.includes(username)) {
			return
		}
		localStorage.setItem(SWITCH_USERS_LS, JSON.stringify([...prevSwitchUsersList, username]))
	}

	static removeSwitchUserFromLS = (username?: string) => {
		if (username) {
			const prevSwitchUsers: string[] = JSON.parse(localStorage.getItem(SWITCH_USERS_LS) || null) || []

			if (!prevSwitchUsers) {
				return
			}

			const filteredSwitchUsers = prevSwitchUsers.filter(userName => userName !== username)

			localStorage.setItem(SWITCH_USERS_LS, JSON.stringify(filteredSwitchUsers))
		} else {
			localStorage.removeItem(SWITCH_USERS_LS)
		}
	}
}


export default AuthCommon