import { showSnackMessage } from '../showSnackMessage/showSnackMessage'
import AuthCommon, { ICurrentUserLS } from './authCommon'
import { CURRENT_USER_LS, LOGOUT_LS } from '@/../constants'
import { queryClient } from '@/http/tanstackQuery-client'
import AuthService from '@services/Auth-service'
import TokenService from '@services/Token-service'
import { IAutoLogoutPayload, ILogOutReq } from '@shared/types/Auth-types'
import { ICommonVar } from '@shared/types/Global-types'
import { useJwtInfoListState } from '@stores/Auth-store'
import { useUserInfoState } from '@stores/User-store'
import { createName } from '@utils/createString'
import { getTime } from '@utils/getTime'
import { getLSObject, removeLS } from '@utils/localStorage'



class LogOut {

	static userHasLogOut = () => {
		// console.log('userHasLogOut')
		useUserInfoState.setState({ userInfoState: null })
		queryClient.removeQueries() //! Delete? Change to "not weather"
	}

	static autoFastSessionLogOut = (userInfo: IAutoLogoutPayload['userInfo']) => {
		const currentUserId = useUserInfoState.getState().userInfoState?.userId

		if (!currentUserId) {
			return
		}

		showSnackMessage({
			type: 'w',
			message: `Был выполнен выход из аккаунта пользователя: <span class='bold'>${createName(userInfo, ['lastName', 'firstName', 'username'])}</span> по истечении быстрой сессии`,
		})
		this.currentUserLogOut({ interCode: 204, userId: currentUserId })
	}

	static logOut = ({ interCode, userId }: ILogOutReq) => {
		// console.log('logout')
		AuthCommon.removeSwitchUserFromLS(userId)
		TokenService.deleteJWTInfo(userId)
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