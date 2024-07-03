import blockDevice from '../blockDevice/blockDevice'
import useGetLastTime from '../../hooks/useGetPastTime'
import { IError } from './showSnackBarMessage'



interface ILSError extends IError {
	errTime: string;
	message: string;
}

const recentlyTime = 0.1 //* Time of error counting in minutes
const sameErrsQuantity = 3 //* Limit of possible error quantity recently
const userErrStorageTime = 24 //* User error storage time in hours


const filterErrsListByTime = (err: IError) => {

	return err.errTime ? useGetLastTime(err.errTime, 'hour') < userErrStorageTime : false
}
const checkErrsQuantityForRecently = (list: ILSError[]) => {

	let result = false

	list = list.filter(err => err.type === 'e' && useGetLastTime(err.errTime, 'minute') < recentlyTime)
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


const saveLogInLocalStorage = (err: IError) => {
	// console.log(err.detail)
	if (localStorage.getItem('blockDevice')) return
	
    let errsList = JSON.parse(localStorage.getItem('userErrsList') || '{}') || []
	const userId = JSON.parse(localStorage.getItem('userInfo') || '{}')?.user_id || undefined
    const ErrDetail = err.detail
	
	// console.log(errsList)
	if (errsList[0]) errsList = errsList.filter(filterErrsListByTime) || []
	
	// console.log(err)
	errsList.push({ 
		errTime: err.errTime || new Date(),
		type: err.type || 'e',
		message: err.message,
		userId,
		action: err.action,
		req: err.req,
		ErrDetail,
	})
	// console.log(errsList)
	localStorage.setItem('userErrsList', JSON.stringify(errsList))
	
	//* Error counting for short time blocking
	if (errsList.length < sameErrsQuantity || err.type === 'b') return
	if (checkErrsQuantityForRecently(errsList)) {
		// console.log('Blocked')
        blockDevice({ logTime: err.errTime })
	}
}

export default saveLogInLocalStorage