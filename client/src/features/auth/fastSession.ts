import { useJwtInfoListState } from "../../stores/Auth-store"
import { getEndTime, getTime } from "../../utils/getTime"
import logOut from "./logOut"
import { CURRENT_USER_LS, FAST_LS } from "../../../constants"



class FastSession {

	static handleFastSessionRefresh = () => {
		const currentUsername = JSON.parse(localStorage.getItem(CURRENT_USER_LS))?.username
		
		if (!currentUsername || !useJwtInfoListState.getState().getJwtInfoState(currentUsername)?.isFast) {
			return
		}

		localStorage.setItem(FAST_LS, String(getEndTime(getTime(), 3)))
	}

	static checkFastSessionLogOut = (time: string) => {

		if (Number(time) < getTime()) {
			const currentUsername = JSON.parse(localStorage.getItem(CURRENT_USER_LS))?.username

			try {
				logOut.currentUserLogOut({ interCode: 204, username: currentUsername })
			} catch (err) {
				console.log('Error fastSession logout after closing', err)
				logOut.userHasLogOut()
			}
		}
		localStorage.removeItem(FAST_LS)
	}
}


export default FastSession