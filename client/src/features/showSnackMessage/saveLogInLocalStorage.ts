import { showSnackMessage } from './showSnackMessage'
import { DEVICE_LS, LOCAL_LOG_STORAGE_TIME, LOG_LIST_LS, RECENTLY_TIME, SAME_LOGS_QUANTITY } from '@/../constants'
import DeviceService from '@services/Device-service'
import { ISnack } from '@shared/types/Global-types'
import { useUserInfoState } from '@stores/User-store'
import { IDeviceInfo } from '@type/Device-types'
import { getLastTime } from '@utils/getTime'
import { getLSObject, setLSObject } from '@utils/localStorage'
// import { useBlockError } from '@stores/Global-store'


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

	let logList = getLSObject<ISnack[]>(LOG_LIST_LS) || []
	if (logList[0]) {
		logList = logList.filter(filterLogListByTime)
	}


	// console.log(snack)
	logList.push(snack)

	// console.log(logList)
	setLSObject(LOG_LIST_LS, logList)

	//* Error counting for short time blocking
	if (logList.length < SAME_LOGS_QUANTITY || snack.type === 'b') return
	if (checkLogQuantityForRecently(logList, 'e')) {

		DeviceService.blockDeviceInDB({
			logTime: snack.snackTime,
			userId: useUserInfoState.getState().userInfoState?.userId || null,
			deviceId: getLSObject<IDeviceInfo>(DEVICE_LS)?.id,
			interCode: 807,
		})
	}
	if (snack.type === 's') {
		if (checkLogQuantityForRecently(logList, 's')) {
			showSnackMessage({
				type: 'w',
				message: 'Очень не хорошо <span class=\'bold\'>дудосить</span>!',
			})
		}
	}
}

export default saveLogInLocalStorage