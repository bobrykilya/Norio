import toast from 'react-hot-toast'
import SnackBar from '../components/SnackBar/SnackBar'
import { PiSealWarning } from "react-icons/pi"
import { TbLockSquareRounded } from "react-icons/tb";
import { FiCheckCircle } from "react-icons/fi"
import { MdErrorOutline } from "react-icons/md"
import saveErrorInLocalStorage from './saveErrorInLocalStorage'



const getTypeDecoding = (type) => {
    switch (type) {
		case 'w' : return { title: 'Внимание', icon: <PiSealWarning className='warning message-icon fa-icon' />, toastDuration: Infinity }
		case 'b' : return { title: 'Блок', icon: <TbLockSquareRounded className='block message-icon fa-icon' />, toastDuration: Infinity }
        case 's' : return { title: 'Успех', icon: <FiCheckCircle className='success message-icon fa-icon' />, toastDuration: 3000 }
        default : return { title: 'Ошибка', icon: <MdErrorOutline className='error message-icon fa-icon' />, toastDuration: 4000 }
    }
}

const messagePreprocessing = (message) => {
	switch (message) {
		case 'Failed to fetch' : return 'Ошибка подключения к серверу'
        default : return false
    }
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

	const { title, icon, toastDuration } = getTypeDecoding(err.type || 'e')

	const newMessage = messagePreprocessing(err.message)
	if (newMessage) {
		err.message = newMessage
	}
	
    toast.custom((snack) => (
		<SnackBar title={title} icon={icon} message={err.message} snack={snack} type={err.type}/>
    ), {
		duration: err.duration || toastDuration,
		// duration: Infinity,
		position: "top-center",
		snackBarType: err.type || 'e',
		snackBarMessage: err.message,
	})

	// if (!['s'].includes(err.type)) 
		saveErrorInLocalStorage({ err })
}