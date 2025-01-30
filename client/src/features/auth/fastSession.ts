import { useJwtInfoListState } from "../../stores/Auth-store"
import { getEndTime, getTime } from "../../utils/getTime"
import logOut from "./logOut"



class FastSession {

	static handleFastSessionRefresh = () => {
		const username = JSON.parse(localStorage.getItem('currentUser'))?.username
		
		if (!username || !useJwtInfoListState.getState().getJwtInfoState(username).isFast) {
			return
		}

		localStorage.setItem('fastSession', String(getEndTime(getTime(), 3)))
	}

	static checkFastSessionLogOut = (time: string) => {

		if (Number(time) < getTime()) {
			const username = JSON.parse(localStorage.getItem('currentUser'))?.username

			try {
				logOut.handleLogOut({ interCode: 204, username })
			} catch (err) {
				console.log('Error fastSession logout after closing', err)
				logOut.userHasLogOut()
			}
		}
		localStorage.removeItem('fastSession')
	}
}


export default FastSession