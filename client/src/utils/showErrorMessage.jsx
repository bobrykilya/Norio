import toast from 'react-hot-toast'
import SnackBar from '../components/SnackBar/SnackBar'
import { MdErrorOutline } from "react-icons/md"
import { BiMessageRoundedError } from "react-icons/bi"
import { FiCheckCircle } from "react-icons/fi"



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
    // if (!type) return {}
    switch (type) {
		case 'w' : return { title: 'Внимание', icon: <BiMessageRoundedError className='yellow message-icon fa-icon' /> }
        case 's' : return { title: 'Успех', icon: <FiCheckCircle className='green message-icon fa-icon' /> }
        default : return { title: 'Ошибка', icon: <MdErrorOutline className='red message-icon fa-icon' /> }
    }
}

export const showErrorMessage = (err) => {
	// console.log()
		
	if (!err.status && !err.type) {
		try {
			err = err.response.json().then(err => showErrorMessage(err))
		}catch {
			showErrorMessage({ status: 422, message: err.message })
			// console.log(err)
		}
		return
	}
	// const err_type = getStatusDecoding(err.status)
    // const { title, icon } = getTypeDecoding(err_type)
	const { title, icon } = getTypeDecoding(err.type || 'e')
	// console.log({ title, icon })

    toast.custom((snack) => (
		<SnackBar title={title} icon={icon} message={err.message} snack={snack} />
    ))
}