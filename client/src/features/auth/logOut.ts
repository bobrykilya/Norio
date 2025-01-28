import { showSnackMessage } from "../showSnackMessage/showSnackMessage"
import { ILogOutReq } from "../../../../common/types/Auth-types"
import { useJwtInfoListState, useUserInfoState } from "../../stores/Auth-store"
import AuthService from "../../services/Auth-service"
import { queryClient } from "../../http/tanstackQuery-client"
import { IUserNameInfo } from "../../types/Auth-types"
import authCommon from "./authCommon"
import JWTInfoService from "../../services/JWTInfoService"



class LogOut {

	static userHasLogOut = () => {
		useUserInfoState.setState({ userInfoState: null })
		localStorage.removeItem('currentUser')
		queryClient.removeQueries() //! Delete?
	}

	static autoFastSessionLogOut = (userNameInfo: IUserNameInfo) => {
		// console.log('Auto logOut')
		showSnackMessage({
			type: 'w',
			message: `Был выполнен выход из аккаунта пользователя: <span class='bold'>${authCommon.getUserAccountInfo(userNameInfo)}</span> по истечении быстрой сессии`
		})
		this.handleLogOut({ interCode: 204 })
	}

	static logOut = ({ interCode, username }: ILogOutReq) => {
		authCommon.removeSwitchUserFromLS(username)
		JWTInfoService.deleteJWTInfo(username)
		AuthService.logOut({ interCode, username })
	}



	static handleLogOut = ({ interCode }: Omit<ILogOutReq, 'username'> = {}) => {
		const username = useUserInfoState.getState().userInfoState.username

		this.logOut({ interCode, username })

		this.userHasLogOut()
	}



	static handleSwitchUser = (username?: string) => {
		authCommon.addSwitchUserInLS(useUserInfoState.getState().userInfoState.username)
		this.userHasLogOut()


		if (!username) {
			return
		}
		authCommon.saveUserInfoOnBrowser(useJwtInfoListState.getState().getJwtInfoState(username).userInfo)
	}

	static handleRemoveSwitchUser = (username: string) => {
		this.logOut({ interCode: 206, username })
	}

	static handleRemoveAllSwitchUsers = () => {
		const currentUserName = useUserInfoState.getState().userInfoState.username
		const SWITCH_USERS_LIST = useJwtInfoListState.getState().jwtInfoListState

		SWITCH_USERS_LIST.forEach(JWTInfo => {
			if (JWTInfo.userInfo.username === currentUserName) {
				return
			}
			this.handleRemoveSwitchUser(JWTInfo.userInfo.username)
		})
	}
}

export default LogOut