import React from 'react'
import toast from 'react-hot-toast'
import SnackBar from '../../components/SnackBar/SnackBar'
import { PiSealWarning, PiWarningCircleBold } from "react-icons/pi"
import { TbLockSquareRounded } from "react-icons/tb"
import { FiCheckCircle } from "react-icons/fi"
import { LuBadgeInfo } from "react-icons/lu"
import saveLogInLocalStorage from './saveLogInLocalStorage'
import { getTime } from "../../utils/getTime";


export type SnackBarTypeOptions = 'e' | 'i' |'w' | 'b' | 's'

type IGetTypeDecoding = {
	snackType: SnackBarTypeOptions;
    title: string;
    icon: React.JSX.Element;
    toastDuration: number;
}

export type ISnack = {
	type: SnackBarTypeOptions;
	message: string;
	snackTime: number;
	duration?: number;
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
export type ISnackWithoutTime = Omit<ISnack, 'snackTime'> & {
	snackTime?: number;
}
const showAllSnacksDev = () => {
	
	const ALL_SNACKS = [getTypeDecoding('e'), getTypeDecoding('i'), getTypeDecoding('w'), getTypeDecoding('b'), getTypeDecoding('s')]

	ALL_SNACKS.map(snack => {
		toast.custom((toastElem) => (
			<SnackBar title={snack.title} icon={snack.icon} message={'Тест уведомления. У тебя всё будет хорошо, красавчик'} toastElem={toastElem} type={snack.snackType} />
		), {
			duration: Infinity,
		})
	})
}

const getTypeDecoding = (type: SnackBarTypeOptions): IGetTypeDecoding => {
    switch (type) {
		case 'e' : return { snackType: 'e', title: 'Ошибка', icon: <PiWarningCircleBold className='error message-icon fa-icon' />, toastDuration: 4000 }
		case 'i' : return { snackType: 'i', title: 'Инфо', icon: <LuBadgeInfo className='info message-icon fa-icon' />, toastDuration: 5000 }
		case 'w' : return { snackType: 'w', title: 'Внимание', icon: <PiSealWarning className='warning message-icon fa-icon' />, toastDuration: Infinity }
		case 'b' : return { snackType: 'b', title: 'Блок', icon: <TbLockSquareRounded className='block message-icon fa-icon' />, toastDuration: Infinity }
        case 's' : return { snackType: 's', title: 'Успех', icon: <FiCheckCircle className='success message-icon fa-icon' />, toastDuration: 3000 }
    }
}

const messagePreprocessing = (message: string) => {
	switch (message) {
		case 'Failed to fetch' : return 'Ошибка подключения к серверу'
		case 'Request timed out' : return 'Ошибка ответа сервера'
        default : return false
    }
}

export const showSnackBarMessage = (snack: ISnackWithoutTime) => {
	// console.log(snack.message)
	
	//* Response-snack handling
	if (!snack.type && snack.response) {
		try {
			if (snack.response) 
				snack.response.json().then((snack: ISnack) => showSnackBarMessage(snack))
		}catch {
			// if (messagePreprocessing())
			showSnackBarMessage({ type: 'w', message: snack.message || 'Непредвиденная ошибка', snackTime: snack.snackTime })
		}
		return
	}
	// console.log(snack)
	
	//* Refresh errs ban
	if (snack?.detail?.action === 'refresh') return
	
	//* Missing elements adding (snackTime)
	const snackWithTime: ISnack = {
		...structuredClone(snack),
		snackTime: snack.snackTime || getTime()
	}


	//* Block handling
	// if (snackWithTime.status === 900) { 
	// 	blockDevice({ logTime: snackWithTime.snackTime, infinityBlock: snackWithTime.detail?.infinityBlock, unlockTimeDB: snackWithTime.detail?.unlockTime, interCode: snackWithTime.detail?.interCode })
	// 	// const setBlockErrorMessage = useBlockError(s => s.setBlockErrorMessage)
	// }

	

	const { snackType, title, icon, toastDuration } = getTypeDecoding(snackWithTime.type || 'e')
	const newMessage = messagePreprocessing(snack.message)
	if (newMessage) {
		snackWithTime.message = newMessage
	}

    toast.custom((toastElem) => (
		<SnackBar title={title} icon={icon} message={snackWithTime.message || 'Непредвиденная ошибка'} toastElem={toastElem} type={snackType} />
    ), {
		duration: snackWithTime.duration || toastDuration,
		// duration: Infinity,
	})
	// showAllSnacksDev()

	// console.log(err)
	if (localStorage.getItem('blockDevice')) return
	// const blockErrorMessage = useBlockError(s => s.blockErrorMessage)
	// if (blockErrorMessage) return
	
	if (!['s'].includes(snackType)) 
		saveLogInLocalStorage(snackWithTime)
}