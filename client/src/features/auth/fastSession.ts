import { useJwtInfoListState } from "../../stores/Auth-store"
import { getEndTime, getTime } from "../../utils/getTime"
import logOut from "./logOut"
import { FAST_LS, USER_LS } from "../../../constants"



class FastSession {

	static handleFastSessionRefresh = () => {
		const username = JSON.parse(localStorage.getItem(USER_LS))?.username
		
		if (!username || !useJwtInfoListState.getState().getJwtInfoState(username)?.isFast) {
			return
		}

		localStorage.setItem(FAST_LS, String(getEndTime(getTime(), 3)))
	}

	static checkFastSessionLogOut = (time: string) => {

		if (Number(time) < getTime()) {
			const username = JSON.parse(localStorage.getItem(USER_LS))?.username

			try {
				logOut.handleLogOut({ interCode: 204, username })
			} catch (err) {
				console.log('Error fastSession logout after closing', err)
				logOut.userHasLogOut()
			}
		}
		localStorage.removeItem(FAST_LS)
	}
}


export default FastSession