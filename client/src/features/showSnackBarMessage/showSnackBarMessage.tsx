import React from 'react'
import toast from 'react-hot-toast'
import SnackBar from '../../components/SnackBar/SnackBar'
import { PiSealWarning } from "react-icons/pi"
import { TbLockSquareRounded } from "react-icons/tb";
import { FiCheckCircle } from "react-icons/fi"
import { MdErrorOutline } from "react-icons/md"
import saveLogInLocalStorage from './saveLogInLocalStorage'
import blockDevice from '../blockDevice/blockDevice'
import { useBlockError } from '../../stores/Global-store';



export type AvailableSnackBarType = 'e' | 'w' | 'b' | 's'

export interface IError {
	status?: number;
	errTime?: string;
	message?: string;
	duration?: number;
	action?: string;
	type?: AvailableSnackBarType;
	response?: any;
	req?: Request;
	detail?: {
		infinityBlock: boolean;
		unlockTime: string;
		deviceIP: string;
		interCode: number;
		username: string;
	}
}

const getTypeDecoding = (type: AvailableSnackBarType) => {
    switch (type) {
		case 'w' : return { title: 'Внимание', icon: <PiSealWarning className='warning message-icon fa-icon' />, toastDuration: Infinity }
		case 'b' : return { title: 'Блок', icon: <TbLockSquareRounded className='block message-icon fa-icon' />, toastDuration: Infinity }
        case 's' : return { title: 'Успех', icon: <FiCheckCircle className='success message-icon fa-icon' />, toastDuration: 3000 }
        default  : return { title: 'Ошибка', icon: <MdErrorOutline className='error message-icon fa-icon' />, toastDuration: 4000 }
    }
}

const messagePreprocessing = (message: string) => {
	switch (message) {
		case 'Failed to fetch' : return 'Ошибка подключения к серверу'
		case 'Request timed out' : return 'Ошибка ответа сервера'
        default : return false
    }
}

export const showSnackBarMessage = (err: IError) => {
	// console.log(err)

	if (err.status === 900) { //* Block err
		blockDevice({ logTime: err.errTime, infinityBlock: err.detail?.infinityBlock, unlockTimeDB: err.detail?.unlockTime, interCode: err.detail?.interCode })
		// const setBlockErrorMessage = useBlockError(s => s.setBlockErrorMessage)
	}

	if (!err.message) return
	
	if (!err.status && !err.type) {
		try {
			if (err.response) err = err.response.json().then((err: IError) => showSnackBarMessage(err))
		}catch {
			showSnackBarMessage({ status: 422, message: err.message, errTime: err.errTime })
			// console.log(err.message)
			// console.log(err)
		}
		return
	}
	// console.log(err)

	const { title, icon, toastDuration } = getTypeDecoding(err.type || 'e')

	const newMessage = messagePreprocessing(err.message)
	if (newMessage) {
		err.message = newMessage
	}
	
    toast.custom((snack) => (
		<SnackBar title={title} icon={icon} message={err.message || 'Непредвиденная ошибка'} snack={snack} type={err.type || 'e'} />
    ), {
		duration: err.duration || toastDuration,
		position: "top-center",
		// duration: Infinity,
		// snackBarType: err.type || 'e',
		// snackBarMessage: err.message,
	})

	// if (!['s'].includes(err.type)) 
		saveLogInLocalStorage(err)
}