import toast from 'react-hot-toast'
import SnackBar from '../components/SnackBar/SnackBar'
import { PiSealWarning } from "react-icons/pi"
import { TbLockSquareRounded } from "react-icons/tb";
import { FiCheckCircle } from "react-icons/fi"
import { MdErrorOutline } from "react-icons/md"



// const getStatusDecoding = (status) => {
// 	if (!status) return null
// 	else 
//     switch (status) {
// 		case 404:
// 		case 404: 
// 			return 
// 	}
// }

const getTypeDecoding = (type) => {
    switch (type) {
		case 'w' : return { title: 'Внимание', icon: <PiSealWarning className='warning message-icon fa-icon' />, toastDuration: Infinity }
		case 'b' : return { title: 'Блок', icon: <TbLockSquareRounded className='block message-icon fa-icon' />, toastDuration: Infinity }
        case 's' : return { title: 'Успех', icon: <FiCheckCircle className='success message-icon fa-icon' />, toastDuration: 3000 }
        default : return { title: 'Ошибка', icon: <MdErrorOutline className='error message-icon fa-icon' />, toastDuration: 4000 }
    }
}
const getLastTime = (timestamp, type) => {
	const timeDiff = (new Date() - new Date(timestamp)) / 1000 //* Time in seconds
	// console.log(timeDiff)

	switch (type) {
		case 'hour': return (timeDiff / 60 / 60)
		case 'minute': return (timeDiff / 60)
		case 'second': return timeDiff
	}
}
const filterErrsListByTime = (err) => {
	if (!err.errTime) return false

	const userErrStorageTime = 24 //* User error storage time in hours
	// console.log(getLastTime(err.errTime, 'hour'))
	// console.log(getLastTime(err.errTime, 'minute'))
	return getLastTime(err.errTime, 'hour') < userErrStorageTime
}
const checkErrsQuantityForRecently = (list) => {
	const recentlyTime = 1 //* Time of error counting in minutes
	const sameErrsQuantity = 7 //* Limit of possible error quantity recently
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

export const showSnackBarMessage = (err) => {

	if (!err.status && !err.type) {
		try {
			err = err.response.json().then(err => showSnackBarMessage(err))
		}catch {
			showSnackBarMessage({ status: 422, message: err.message })
			// console.log(err)
		}
		return
	}
	// console.log(err)
	// const err_type = getStatusDecoding(err.status)
    // const { title, icon } = getTypeDecoding(err_type)
	const { title, icon, toastDuration } = getTypeDecoding(err.type || 'e')

	
    toast.custom((snack) => (
		<SnackBar title={title} icon={icon} message={err.message} snack={snack} type={err.type}/>
    ), {
		duration: toastDuration,
		// duration: Infinity,
		position: "top-center",
	})

	if (['s'].includes(err.type)) return

	//* Error saving in LocalStorage
	let errsList = JSON.parse(localStorage.getItem('userErrsList')) || []
	const userId = JSON.parse(localStorage.getItem('userInfo'))?.user_id || undefined

	// console.log(errsList)
	if (errsList[0]) errsList = errsList.filter(filterErrsListByTime) || []

	// console.log(errsList)
	errsList.push({ 
		errTime: err.errTime || new Date(), 
		type: err.type || 'e',
		message: err.message,
		userId,
		action: err.action,
		req: err.req,
	})
	localStorage.setItem('userErrsList', JSON.stringify(errsList))

	//* Error counting for short time and blocking
	if (errsList.length < 5 || err.type === 'b') return
	if (checkErrsQuantityForRecently(errsList)) {
		// console.log('block')
		const err_mess = 'Устройство было временно заблокировано вследствие большого количества ошибок за короткий срок'
		showSnackBarMessage({ type: 'b', message: err_mess })
		throw new Error(err_mess)
	}
}