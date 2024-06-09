import blockDevice from '../blockDevice/blockDevice'



const recentlyTime = 1 //* Time of error counting in minutes
const sameErrsQuantity = 7 //* Limit of possible error quantity recently
const userErrStorageTime = 24 //* User error storage time in hours

const getLastTime = (timestamp, type) => {
	const timeDiff = (new Date() - new Date(timestamp)) / 1000 //* Time in seconds

	switch (type) {
		case 'hour': return (timeDiff / 60 / 60)
		case 'minute': return (timeDiff / 60)
		case 'second': return timeDiff
	}
}
const filterErrsListByTime = (err) => {
	if (!err.errTime) return false

	return getLastTime(err.errTime, 'hour') < userErrStorageTime
}
const checkErrsQuantityForRecently = (list) => {
	let result = false

	list = list.filter(err => err.type === 'e' && getLastTime(err.errTime, 'minute') < recentlyTime)
	const countObject = {}

	for (let err of list) {
		if (!countObject[err.message]) {
			countObject[err.message] = 1
		} else {
			countObject[err.message]++
		}
	}
	
	// console.log(countObject)
	Object.values(countObject).forEach(quantity => {
		if (quantity >= sameErrsQuantity) {
			result = true
		}
	})

	return result
}


const saveLogInLocalStorage = ({ err }) => {
    
    if (localStorage.getItem('blockDevice')) return

    let errsList = JSON.parse(localStorage.getItem('userErrsList')) || []
	const userId = JSON.parse(localStorage.getItem('userInfo'))?.user_id || undefined

	// console.log(errsList)
	if (errsList[0]) errsList = errsList.filter(filterErrsListByTime) || []

	// console.log(errsList)
	errsList.push({ 
		errTime: err.errTime || new Date().toLocaleString(),
		type: err.type || 'e',
		message: err.message,
		userId,
		action: err.action,
		req: err.req,
	})
	localStorage.setItem('userErrsList', JSON.stringify(errsList))

	//* Error counting for short time blocking
	if (errsList.length < sameErrsQuantity || err.type === 'b') return
	if (checkErrsQuantityForRecently(errsList)) {
        blockDevice({ logTime: err.errTime })
	}
}

export default saveLogInLocalStorage