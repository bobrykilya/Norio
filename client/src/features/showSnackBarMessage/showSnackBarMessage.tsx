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



export type SnackBarTypeOptions = 'e' | 'w' | 'b' | 's'

export type ISnack = {
	type: SnackBarTypeOptions;
	message: string;
	duration?: number;
	snackTime?: string;
	response?: Response;
	detail?: {
		action: string;
		req: Record<string, any>;
		res: {
			status: number;
			title: string;
		}
		infinityBlock?: boolean;
		unlockTime?: string;
		deviceIP?: string;
		interCode?: number;
	}
}

const getTypeDecoding = (type: SnackBarTypeOptions) => {
    switch (type) {
        case 'e' : return { title: 'Ошибка', icon: <MdErrorOutline className='error message-icon fa-icon' />, toastDuration: 4000 }
		case 'w' : return { title: 'Внимание', icon: <PiSealWarning className='warning message-icon fa-icon' />, toastDuration: Infinity }
		case 'b' : return { title: 'Блок', icon: <TbLockSquareRounded className='block message-icon fa-icon' />, toastDuration: Infinity }
        case 's' : return { title: 'Успех', icon: <FiCheckCircle className='success message-icon fa-icon' />, toastDuration: 3000 }
    }
}

const messagePreprocessing = (message: string) => {
	switch (message) {
		case 'Failed to fetch' : return 'Ошибка подключения к серверу'
		case 'Request timed out' : return 'Ошибка ответа сервера'
        default : return false
    }
}

export const showSnackBarMessage = (snack: ISnack) => {
	
	
	//* Response-snack handling
	if (!snack.type && snack.response) {
		try {
			if (snack.response) 
				snack.response.json().then((snack: ISnack) => showSnackBarMessage(snack))
		}catch {
			showSnackBarMessage({ type: 'w', message: snack.message || 'Непредвиденная ошибка', snackTime: snack.snackTime })
		}
		return
	}
	// console.log(snack)
	
	//* Refresh errs ban
	if (snack?.detail?.action === 'refresh') return
	
	//* Missing elements adding
	if (!snack.snackTime) snack.snackTime = new Date().toUTCString()
		

	//* Block handling
	// if (snack.status === 900) { 
	// 	blockDevice({ logTime: snack.snackTime, infinityBlock: snack.detail?.infinityBlock, unlockTimeDB: snack.detail?.unlockTime, interCode: snack.detail?.interCode })
	// 	// const setBlockErrorMessage = useBlockError(s => s.setBlockErrorMessage)
	// }

	

	const { title, icon, toastDuration } = getTypeDecoding(snack.type || 'e')
	const newMessage = messagePreprocessing(snack.message)
	if (newMessage) {
		snack.message = newMessage
	}
	
    toast.custom((toastElem) => (
		<SnackBar title={title} icon={icon} message={snack.message || 'Непредвиденная ошибка'} toastElem={toastElem} type={snack.type} />
    ), {
		duration: snack.duration || toastDuration,
		// duration: Infinity,
	})

	// console.log(err)
	if (localStorage.getItem('blockDevice')) return
	// const blockErrorMessage = useBlockError(s => s.blockErrorMessage)
	// if (blockErrorMessage) return
	
	if (!['s'].includes(snack.type)) 
		saveLogInLocalStorage(snack)
}