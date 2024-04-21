import toast from 'react-hot-toast'
import SnackBar from '../components/SnackBar/SnackBar'
import { PiSealWarning } from "react-icons/pi"
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
        case 's' : return { title: 'Успех', icon: <FiCheckCircle className='success message-icon fa-icon' />, toastDuration: 3000 }
        default : return { title: 'Ошибка', icon: <MdErrorOutline className='error message-icon fa-icon' />, toastDuration: 4000 }
    }
}

export const showSnackBarMessage = (err) => {
	// console.log(err.message)
	
	if (!err.status && !err.type) {
		try {
			err = err.response.json().then(err => showSnackBarMessage(err))
		}catch {
			showSnackBarMessage({ status: 422, message: err.message })
			// console.log(err)
		}
		return
	}
	// const err_type = getStatusDecoding(err.status)
    // const { title, icon } = getTypeDecoding(err_type)
	const { title, icon, toastDuration } = getTypeDecoding(err.type || 'e')
	const errTime = err.errTime || new Date().toLocaleString()
	// console.log(errTime)

    toast.custom((snack) => (
		<SnackBar title={title} icon={icon} message={err.message} snack={snack} />
    ), {
		duration: toastDuration,
		// duration: Infinity,
		position: "top-center",
	})


}