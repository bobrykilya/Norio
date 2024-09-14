import { getLastTime } from '../../utils/getTime'
import { ISnackWithTime } from './showSnackBarMessage'
import DeviceService from "../../services/Device-service"
// import { useBlockError } from '../../stores/Global-store';



const recentlyTime = 20 //* Time of error counting in seconds
const sameErrsQuantity = 2 //* Limit of possible error quantity recently
const localErrStorageTime = 24 //* User error storage time in hours


const filterErrsListByTime = (err: ISnackWithTime) => {
	return err.snackTime ? getLastTime(err.snackTime, 'hour') < localErrStorageTime : false
}

const checkErrsQuantityForRecently = (list: ISnackWithTime[]) => {

	let result = false

	const filteredErrsList = list.filter(err => err.type === 'e' && getLastTime(err.snackTime, 'second') < recentlyTime)
	const countObject = {}
	
	for (let err of filteredErrsList) {
		if (!countObject[err.message]) {
			countObject[err.message] = 1
		} else {
			countObject[err.message]++
		}
	}
	// console.log(countObject)
	
	Object.values(countObject).forEach((quantity: any) => {
		if (quantity >= sameErrsQuantity) {
			result = true
		}
	})

	return result
}


const saveLogInLocalStorage = (snack: ISnackWithTime) => {
	
    let errsList: ISnackWithTime[] = JSON.parse(localStorage.getItem('localErrsList') || '[]')
	if (errsList[0]) errsList = errsList.filter(filterErrsListByTime) || []


	// console.log(snack)
	errsList.push(snack)
	
	// console.log(errsList)
	localStorage.setItem('localErrsList', JSON.stringify(errsList))
	
	//* Error counting for short time blocking
	if (errsList.length < sameErrsQuantity || snack.type === 'b') return
	if (checkErrsQuantityForRecently(errsList)) {

		DeviceService.blockDeviceInDB({
			logTime: snack.snackTime,
			userId: Number(JSON.parse(localStorage.getItem('userInfo'))?.user_id) || null,
			deviceId: Number(localStorage.getItem('deviceId')),
			interCode: 807,
		})
	}
}

export default saveLogInLocalStorage