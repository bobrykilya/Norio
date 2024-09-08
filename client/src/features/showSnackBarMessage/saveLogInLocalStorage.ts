import blockDevice from '../blockDevice/blockDevice'
import {getLastTime} from '../../utils/getTime'
import {ISnack} from './showSnackBarMessage'
// import { useBlockError } from '../../stores/Global-store';



const recentlyTime = 20 //* Time of error counting in seconds
const sameErrsQuantity = 2 //* Limit of possible error quantity recently
const userErrStorageTime = 24 //* User error storage time in hours


const filterErrsListByTime = (err: ISnack) => {	
	return err.snackTime ? getLastTime(err.snackTime, 'hour') < userErrStorageTime : false
}

const checkErrsQuantityForRecently = (list: ISnack[]) => {

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


const saveLogInLocalStorage = (err: ISnack) => {
	
    let errsList: ISnack[] = JSON.parse(localStorage.getItem('userErrsList') || '[]')
	if (errsList[0]) errsList = errsList.filter(filterErrsListByTime) || []

	//! Save userInfo with err ???
	// const userId = JSON.parse(localStorage.getItem('userInfo') || '[]')?.user_id || undefined
	// if (userId && err.detail?.req) {
	// 	err.detail!.req.userId = userId
	// }

	// console.log(err)
	errsList.push(err)
	
	// console.log(errsList)
	localStorage.setItem('userErrsList', JSON.stringify(errsList))
	
	//* Error counting for short time blocking
	if (errsList.length < sameErrsQuantity || err.type === 'b') return
	if (checkErrsQuantityForRecently(errsList)) {
		// console.log('Blocked')
        blockDevice({ logTime: err.snackTime })
	}
}

export default saveLogInLocalStorage