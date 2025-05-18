import { ICurrentUserLS } from './authCommon'
import logOut from './logOut'
import { CURRENT_USER_LS, FAST_LS, FAST_SESSION_REFRESH_TIME } from '@/../constants'
import { ICommonVar } from '@shared/types/Global-types'
import { useJwtInfoListState } from '@stores/Auth-store'
import { getEndTime, getTime } from '@utils/getTime'
import { getLSObject, removeLS } from '@utils/localStorage'



class FastSession {

	static fastSessionRefresh = () => {
		const currentUserId = getLSObject<ICurrentUserLS>(CURRENT_USER_LS)?.userId

		if (!currentUserId || !useJwtInfoListState.getState().getJwtInfoState(currentUserId)?.isFast) {
			return
		}

		localStorage.setItem(FAST_LS, (getEndTime(getTime(), FAST_SESSION_REFRESH_TIME)).toString())
	}

	static checkIsFastSessionDeprecated = (currentUserId: ICommonVar['userId']) => {
		const fastSessionTime = localStorage.getItem(FAST_LS)
		if (!fastSessionTime) {
			return
		}

		removeLS(FAST_LS)
		if (Number(fastSessionTime) >= getTime()) {
			return
		}

		try {
			logOut.currentUserLogOut({ interCode: 204, userId: currentUserId })
		} catch (err) {
			console.error('Error fastSession logout after closing', err)
			logOut.userHasLogOut()
		}
	}
}


export default FastSession