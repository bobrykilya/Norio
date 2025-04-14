import { getLastTime } from '../../utils/getTime'
import { ISnack } from '../../../../common/types/Global-types'
import DeviceService from "../../services/Device-service"
import { DEVICE_LS, LOCAL_LOG_STORAGE_TIME, LOG_LIST_LS, RECENTLY_TIME, SAME_LOGS_QUANTITY } from "../../../constants"
import { showSnackMessage } from "./showSnackMessage"
import { useUserInfoState } from "../../stores/User-store"
// import { useBlockError } from '../../stores/Global-store'



const filterLogListByTime = (err: ISnack) => {
	return err.snackTime ? getLastTime(err.snackTime, 'hour') < LOCAL_LOG_STORAGE_TIME : false
}

const checkLogQuantityForRecently = (list: ISnack[], type: ISnack['type']) => {

	let result = false

	const filteredLogList = list.filter(err => err.type === type && getLastTime(err.snackTime, 'second') < RECENTLY_TIME)
	const countObject = {}
	
	for (let err of filteredLogList) {
		if (!countObject[err.message]) {
			countObject[err.message] = 1
		} else {
			if (err.message !== 'Ошибка подключения к серверу') {
				countObject[err.message]++
			}
		}
	}
	// console.log(countObject)
	
	Object.values(countObject).forEach((quantity: any) => {
		if (quantity >= SAME_LOGS_QUANTITY) {
			result = true
		}
	})

	return result
}


const saveLogInLocalStorage = (snack: ISnack) => {
	
    let logList: ISnack[] = JSON.parse(localStorage.getItem(LOG_LIST_LS) || '[]')
	if (logList[0]) logList = logList.filter(filterLogListByTime) || []


	// console.log(snack)
	logList.push(snack)
	
	// console.log(logList)
	localStorage.setItem(LOG_LIST_LS, JSON.stringify(logList))
	
	//* Error counting for short time blocking
	if (logList.length < SAME_LOGS_QUANTITY || snack.type === 'b') return
	if (checkLogQuantityForRecently(logList, 'e')) {

		DeviceService.blockDeviceInDB({
			logTime: snack.snackTime,
			userId: useUserInfoState.getState().userInfoState?.userId || null,
			deviceId: JSON.parse(localStorage.getItem(DEVICE_LS))?.id,
			interCode: 807,
		})
	}
	if (snack.type === 's') {
		if (checkLogQuantityForRecently(logList, 's')) {
			showSnackMessage({
				type: 'w',
				message: 'Очень не хорошо <span class=\'bold\'>дудосить</span>!'
			})
		}
	}
}

export default saveLogInLocalStorage