import blockDevice from '../blockDevice/blockDevice'
import useGetLastTime from '../../hooks/useGetPastTime'
import { ISnack } from './showSnackBarMessage'
// import { useBlockError } from '../../stores/Global-store';



const recentlyTime = 0.1 //* Time of error counting in minutes
const sameErrsQuantity = 3 //* Limit of possible error quantity recently
const userErrStorageTime = 24 //* User error storage time in hours


const filterErrsListByTime = (err: ISnack) => {	
	return err.snackTime ? useGetLastTime(err.snackTime, 'hour') < userErrStorageTime : false
}

const checkErrsQuantityForRecently = (list: ISnack[]) => {

	let result = false

	list = list.filter(err => err.type === 'e' && useGetLastTime(err.snackTime, 'minute') < recentlyTime)
	const countObject = {}
	
	for (let err of list) {
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