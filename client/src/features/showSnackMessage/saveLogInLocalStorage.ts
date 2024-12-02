import { getLastTime } from '../../utils/getTime'
import { ISnack } from './showSnackMessage'
import DeviceService from "../../services/Device-service"
import { LOCAL_LOG_STORAGE_TIME, RECENTLY_TIME, SAME_LOGS_QUANTITY } from "../../../constants"
import { useUserInfo } from "../../stores/Auth-store"
// import { useBlockError } from '../../stores/Global-store'



const filterLogListByTime = (err: ISnack) => {
	return err.snackTime ? getLastTime(err.snackTime, 'hour') < LOCAL_LOG_STORAGE_TIME : false
}

const checkLogQuantityForRecently = (list: ISnack[]) => {

	let result = false

	const filteredLogList = list.filter(err => err.type === 'e' && getLastTime(err.snackTime, 'second') < RECENTLY_TIME)
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
	
    let logList: ISnack[] = JSON.parse(localStorage.getItem('localLogList') || '[]')
	if (logList[0]) logList = logList.filter(filterLogListByTime) || []


	// console.log(snack)
	logList.push(snack)
	
	// console.log(logList)
	localStorage.setItem('localLogList', JSON.stringify(logList))
	
	//* Error counting for short time blocking
	if (logList.length < SAME_LOGS_QUANTITY || snack.type === 'b') return
	if (checkLogQuantityForRecently(logList)) {

		DeviceService.blockDeviceInDB({
			logTime: snack.snackTime,
			userId: useUserInfo.getState().userInfoState?.userId || null,
			deviceId: Number(localStorage.getItem('deviceId')),
			interCode: 807,
		})
	}
}

export default saveLogInLocalStorage