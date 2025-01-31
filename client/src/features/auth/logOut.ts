import { showSnackMessage } from "../showSnackMessage/showSnackMessage"
import { ILogOutReq } from "../../../../common/types/Auth-types"
import { useJwtInfoListState, useUserInfoState } from "../../stores/Auth-store"
import AuthService from "../../services/Auth-service"
import { queryClient } from "../../http/tanstackQuery-client"
import { IUserNameInfo } from "../../types/Auth-types"
import AuthCommon from "./authCommon"
import JWTInfoService from "../../services/JWTInfoService"
import { USER_LS } from "../../../constants"



class LogOut {

	static userHasLogOut = () => {
		// console.log('userHasLogOut')
		useUserInfoState.setState({ userInfoState: null })
		queryClient.removeQueries() //! Delete?
	}

	static autoFastSessionLogOut = (userNameInfo: IUserNameInfo) => {
		showSnackMessage({
			type: 'w',
			message: `Был выполнен выход из аккаунта пользователя: <span class='bold'>${AuthCommon.getUserAccountInfo(userNameInfo)}</span> по истечении быстрой сессии`
		})
		this.handleLogOut({ interCode: 204 })
	}

	static logOut = ({ interCode, username }: ILogOutReq) => {
		AuthCommon.removeSwitchUserFromLS(username)
		JWTInfoService.deleteJWTInfo(username)
		AuthService.logOut({ interCode, username })
		localStorage.removeItem(USER_LS)
	}



	static handleLogOut = ({ interCode, username }: Partial<ILogOutReq> = {}) => {
		const userName = username || useUserInfoState.getState().userInfoState.username

		this.logOut({ interCode, username: userName })

		this.userHasLogOut()
	}



	static handleSwitchUser = (newUserName?: string) => {
		const currentUserName = useUserInfoState.getState().userInfoState?.username
		console.log(useJwtInfoListState.getState().getJwtInfoState(currentUserName))
		if (!currentUserName) {
			return
		}

		if (useJwtInfoListState.getState().getJwtInfoState(currentUserName).isFast) {
			this.handleLogOut({ interCode: 204, username: currentUserName })
		} else {
			this.userHasLogOut()
		}


		if (!newUserName) {
			return
		}
		AuthCommon.saveUserInfoOnBrowser(useJwtInfoListState.getState().getJwtInfoState(newUserName).userInfo)
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