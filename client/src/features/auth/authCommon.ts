import { useDeviceInfoState } from "../../stores/Device-store"
import { ILoginServiceRes } from "../../../../common/types/Auth-types"
import JWTInfoService from "../../services/JWTInfoService"
import { useUserInfoState } from "../../stores/Auth-store"
import { IUserNameInfo } from "../../types/Auth-types"
import { IUserRepository } from "../../../../api/src/types/DB-types"



const testAndUpdateLSDeviceId = (deviceId: number, lsDeviceId?: number) => {
	const lsDeviceId_2 = lsDeviceId || JSON.parse(localStorage.getItem('deviceInfo'))?.id

	if (lsDeviceId_2 && (lsDeviceId_2 === deviceId)) {
		return
	}

	useDeviceInfoState.getState().setDeviceIdState(deviceId)
}


class authCommon {

	static loginUser = ({ accessToken, accessTokenExpiration, userInfo, deviceId, lsDeviceId }: ILoginServiceRes & { lsDeviceId?: number }) => {
		JWTInfoService.setJWTInfo({ userInfo, accessToken, accessTokenExpiration })

		testAndUpdateLSDeviceId(deviceId, lsDeviceId)
		this.saveUserInfoOnBrowser(userInfo)
	}

	static saveUserInfoOnBrowser = (userInfo: IUserRepository ) => {
		useUserInfoState.setState({ userInfoState: userInfo })
		localStorage.setItem('currentUser', JSON.stringify({
			username: userInfo.username,
			firstName: userInfo.firstName,
			lastName: userInfo.lastName,
		}))
		this.removeSwitchUserFromLS(userInfo.username)
	}

	static getUserAccountInfo = ({ lastName, firstName, username }: IUserNameInfo) => {
		return lastName ? `${lastName} ${firstName} "${username}"` : username
	}


	
	static addSwitchUserInLS = (username: string) => {
		const prevSwitchUsersList: string[] = JSON.parse(localStorage.getItem('switchUsers') || null) || []

		if (prevSwitchUsersList.includes(username)) {
			return
		}
		localStorage.setItem('switchUsers', JSON.stringify([...prevSwitchUsersList, username]))
	}

	static removeSwitchUserFromLS = (username?: string) => {
		if (username) {
			const prevSwitchUsers: string[] = JSON.parse(localStorage.getItem('switchUsers') || null) || []

			if (!prevSwitchUsers) {
				return
			}
			const filteredSwitchUsers = prevSwitchUsers.filter(user => user !== username)

			if (!filteredSwitchUsers) {
				return
			}
			localStorage.setItem('switchUsers', JSON.stringify(filteredSwitchUsers))
		} else {
			localStorage.removeItem('switchUsers')
		}
	}
}


export default authCommon