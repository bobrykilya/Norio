import { useJwtInfoListState } from "../../stores/Auth-store"
import { getEndTime, getTime } from "../../utils/getTime"
import logOut from "./logOut"
import { CURRENT_USER_LS, FAST_LS } from "../../../constants"
import { getLSObject, removeLS } from "../../utils/localStorage"
import { ICurrentUserLS } from "./authCommon"



class FastSession {

	static handleFastSessionRefresh = () => {
		const currentUserId = getLSObject<ICurrentUserLS>(CURRENT_USER_LS)?.userId
		
		if (!currentUserId || !useJwtInfoListState.getState().getJwtInfoState(currentUserId)?.isFast) {
			return
		}

		localStorage.setItem(FAST_LS, String(getEndTime(getTime(), 3)))
	}

	static checkFastSessionLogOut = (time: string) => {

		if (Number(time) < getTime()) {
			const currentUserId = getLSObject<ICurrentUserLS>(CURRENT_USER_LS)?.userId

			try {
				logOut.currentUserLogOut({ interCode: 204, userId: currentUserId })
			} catch (err) {
				console.error('Error fastSession logout after closing', err)
				logOut.userHasLogOut()
			}
		}
		removeLS(FAST_LS)
	}
}


export default FastSession