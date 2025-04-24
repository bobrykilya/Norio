import { showSnackMessage } from "../showSnackMessage/showSnackMessage"
import { ILogOutReq } from "../../../../common/types/Auth-types"
import { useJwtInfoListState } from "../../stores/Auth-store"
import AuthService from "../../services/Auth-service"
import { queryClient } from "../../http/tanstackQuery-client"
import { IUserNameInfo } from "../../types/Auth-types"
import AuthCommon, { ICurrentUserLS } from "./authCommon"
import JWTInfoService from "../../services/JWTInfoService"
import { CURRENT_USER_LS, LOGOUT_LS } from "../../../constants"
import { getTime } from "../../utils/getTime"
import { useUserInfoState } from "../../stores/User-store"
import { ICommonVar } from "../../../../common/types/Global-types"
import { getLSObject, removeLS } from "../../utils/localStorage"



class LogOut {

	static userHasLogOut = () => {
		// console.log('userHasLogOut')
		useUserInfoState.setState({ userInfoState: null })
		queryClient.removeQueries() //! Delete? Change to "not weather"
	}

	static autoFastSessionLogOut = (userNameInfo: IUserNameInfo) => {
		showSnackMessage({
			type: 'w',
			message: `Был выполнен выход из аккаунта пользователя: <span class='bold'>${AuthCommon.getUserAccountInfo(userNameInfo)}</span> по истечении быстрой сессии`
		})
		this.currentUserLogOut({ interCode: 204 })
	}

	static logOut = ({ interCode, userId }: ILogOutReq) => {
		// console.log('logout')
		AuthCommon.removeSwitchUserFromLS(userId)
		JWTInfoService.deleteJWTInfo(userId)
		AuthService.logOut({ interCode, userId })
	}



	static currentUserLogOut = ({ interCode, userId }: Partial<ILogOutReq> = {}) => {
		const currentUserId = userId || useUserInfoState.getState().userInfoState?.userId

		if (!currentUserId) {
			return
		}
		
		removeLS(CURRENT_USER_LS)
		localStorage.setItem(LOGOUT_LS, String(getTime()))
		this.logOut({ interCode, userId: currentUserId })

		this.userHasLogOut()
	}



	static handleSwitchUser = (newUserId?: ICommonVar['id']) => {
		const currentUserId = useUserInfoState.getState().userInfoState?.userId
		// console.log({ currentUserId, currJwtInfo: useJwtInfoListState.getState().getJwtInfoState(currentUserId), newUserId })
		// console.log(useJwtInfoListState.getState().getJwtInfoState(currentUserId))
		if (!currentUserId) {
			return
		}

		if (useJwtInfoListState.getState().getJwtInfoState(currentUserId).isFast) {
			this.currentUserLogOut({ interCode: 204, userId: currentUserId })
		} else {
			this.userHasLogOut()
		}


		if (!newUserId) {
			return
		}
		AuthCommon.saveUserInfoOnBrowser(useJwtInfoListState.getState().getJwtInfoState(newUserId).userInfo)
	}

	static handleRemoveSwitchUser = (userId: ICommonVar['id']) => {
		const currentUserId = getLSObject<ICurrentUserLS>(CURRENT_USER_LS)?.userId

		if (currentUserId && currentUserId === userId) {
			this.currentUserLogOut({ interCode: 206, userId: currentUserId })
			return
		}
		
		this.logOut({ interCode: 206, userId })
	}

	static handleRemoveAllSwitchUsers = () => {
		const currentUserId = useUserInfoState.getState().userInfoState?.userId
		const SWITCH_USERS_LIST = useJwtInfoListState.getState().jwtInfoListState

		SWITCH_USERS_LIST.forEach(JWTInfo => {
			if (currentUserId && JWTInfo.userInfo.userId === currentUserId) {
				return
			}
			this.handleRemoveSwitchUser(JWTInfo.userInfo.userId)
		})
	}
}

export default LogOut