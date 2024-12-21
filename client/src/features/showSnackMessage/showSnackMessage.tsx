import React from 'react'
import toast from 'react-hot-toast'
import SnackBar from '../../components/others/SnackBar/SnackBar'
import { PiSealWarning, PiWarningCircleBold } from "react-icons/pi"
import { TbLockSquareRounded } from "react-icons/tb"
import { FiCheckCircle } from "react-icons/fi"
import { LuBadgeInfo } from "react-icons/lu"
import saveLogInLocalStorage from './saveLogInLocalStorage'
import { getTime } from "../../utils/getTime"
import blockDevice from "../blockDevice/blockDevice"
import timeout from "../../utils/timeout"
import { useBlockError } from "../../stores/Device-store"
import { ISnack, SnackBarTypeOptions } from "../../../../common/types/Global-types"



const showAllSnacksDev = () => {
	
	const ALL_SNACKS = [getTypeDecoding('e'), getTypeDecoding('i'), getTypeDecoding('w'), getTypeDecoding('b'), getTypeDecoding('s')]

	ALL_SNACKS.map(snack => {
		toast.custom((toastElem) => (
			<SnackBar title={snack.title} icon={snack.icon} message={'Тест уведомления. У тебя всё будет хорошо, красавчик'} toastElem={toastElem} type={snack.snackType} />
		), {
			duration: Infinity,
			className: snack.snackType,
		})
	})
	return
}

const getTypeDecoding = (type: SnackBarTypeOptions) => {
    switch (type) {
		case 'e' : return { snackType: type, title: 'Ошибка', icon: <PiWarningCircleBold className='error message-icon fa-icon' />, toastDuration: 4000 }
		case 'i' : return { snackType: type, title: 'Инфо', icon: <LuBadgeInfo className='info message-icon fa-icon' />, toastDuration: 5000 }
		case 'w' : return { snackType: type, title: 'Внимание', icon: <PiSealWarning className='warning message-icon fa-icon' />, toastDuration: Infinity }
		case 'b' : return { snackType: type, title: 'Блок', icon: <TbLockSquareRounded className='block message-icon fa-icon' />, toastDuration: Infinity }
        case 's' : return { snackType: type, title: 'Успех', icon: <FiCheckCircle className='success message-icon fa-icon' />, toastDuration: 3000 }
    }
}

const messagePreprocessing = (message: string) => {
	switch (message) {
		case 'Failed to fetch' : return 'Ошибка подключения к серверу'
		case 'Request timed out' : return 'Ошибка ответа сервера'
		case 'User denied Geolocation' :
		case 'User denied geolocation prompt' :
				return `Вами было запрещено получение информации о местоположении. Для отображения погоды по Вашим координатам, дайте <span class=\'bold\'>разрешение<span>`
        default : return message
    }
}

export const showSnack = async (snack: ISnack) => {
	const { snackType, title, icon, toastDuration } = getTypeDecoding(snack.type || 'e')
	// console.log(snack.message)

	if (snack?.type === 'b') await timeout(100)
	toast.custom((toastElem) => (
		<SnackBar title={title} icon={icon} message={messagePreprocessing(snack.message) || 'Непредвиденная ошибка'} toastElem={toastElem} type={snackType} />
	), {
		duration: snack.durationInSec * 1000 || toastDuration,
		className: snackType,
		// duration: Infinity,
	})
	// showAllSnacksDev()
}

export const showSnackMessage = (snack: ISnack) => {
	// console.log(snack.message)
	
	if (useBlockError.getState().blockErrorMessage) return

	//* Refresh errs ban
	if (snack?.type !== 'b' && snack?.detail?.action === 'refresh') return
	// console.log(snack)

	//* Response-snack handling
	if (!snack.type && snack.response) {
		try {
			if (snack.response)
				snack.response.json()
					.then((snack: ISnack) => showSnackMessage(snack))
		}catch {
			// if (messagePreprocessing())
			showSnackMessage({
				type: 'w',
				message: snack.message || 'Непредвиденная ошибка',
				snackTime: getTime()
			})
		}
		return
	}

	//* Block handling
	if (snack?.detail?.res?.status === 900) {
		blockDevice({ errMessage: snack.message, unlockTime: snack.detail.res.unlockTime })
	}

	//* SnackTime adding
	const snackWithTime: ISnack = {
		...structuredClone(snack),
		snackTime: snack.snackTime || getTime()
	}

	//* Connection errors handling
	if (!snackWithTime?.message) {
		snackWithTime.message = snack.message
		snackWithTime.type = 'e'
	}

	showSnack(snackWithTime)

	if (localStorage.getItem('blockDevice') || ['Failed to fetch', 'Device-service error'].includes(snack.message) ) return
	// if (!['s'].includes(snackWithTime.type))
		saveLogInLocalStorage(snackWithTime)
}