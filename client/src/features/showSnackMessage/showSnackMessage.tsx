import React from 'react'
import toast from 'react-hot-toast'
import SnackBar from '../../components/others/SnackBar/SnackBar'
import { getTime } from "../../utils/getTime"
import blockDevice from "../blockDevice/blockDevice"
import timeout from "../../utils/timeout"
import { useBlockErrorState } from "../../stores/Device-store"
import { ISnack, SnackBarTypeOptions } from "../../../../common/types/Global-types"
import saveLogInLocalStorage from "./saveLogInLocalStorage"
import { ICONS } from "../../assets/common/Icons-data"



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
		case 'e' : return { snackType: type, title: 'Ошибка', icon: ICONS.error, toastDuration: 4000 }
		case 'i' : return { snackType: type, title: 'Инфо', icon: ICONS.info, toastDuration: 5000 }
		case 'w' : return { snackType: type, title: 'Внимание', icon: ICONS.warning, toastDuration: Infinity }
		case 'b' : return { snackType: type, title: 'Блок', icon: ICONS.block, toastDuration: Infinity }
        case 's' : return { snackType: type, title: 'Успех', icon: ICONS.success, toastDuration: 2000 }
    }
}

const messagePreprocessing = (message: string) => {
	switch (message) {
		case 'Failed to fetch' : return 'Ошибка подключения к серверу'
		case 'Request timed out' : return 'Ошибка ответа сервера'
		case 'User denied Geolocation' :
		case 'User denied geolocation prompt' :
				return `Вами было запрещено получение информации о местоположении. Для отображения погоды по Вашим координатам <span class=\'bold\'>дайте разрешение и обновите страницу</span>`
        default : return message
    }
}

export const showSnack = async (snack: ISnack) => {
	const { snackType, title, icon, toastDuration } = getTypeDecoding(snack.type || 'e')
	// console.log(snack.message)

	if (snack.type === 'b') {
		await timeout(100)
	}
	toast.custom((toastElem) => (
		<SnackBar title={snack.messageTitle || title} icon={icon} message={messagePreprocessing(snack.message) || 'Непредвиденная ошибка'} toastElem={toastElem} type={snackType} />
	), {
		duration: snack.durationInSec * 1000 || toastDuration,
		className: snackType,
		// duration: Infinity,
	})
	// showAllSnacksDev()
}

export const showSnackMessage = (snack: ISnack) => {
	// console.log(snack)
	
	if (useBlockErrorState.getState().blockErrorState) return
	
	if (snack?.detail?.res?.status === 401) {
		localStorage.removeItem('blockDevice')
	}

	//* Refresh errs ban
	if (snack?.type !== 'b' && snack?.detail?.res?.status === 401) {
		return
	}
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

	if (localStorage.getItem('blockDevice') || ['Failed to fetch', 'Device-service error'].includes(snack.message)) return
	// if (!['s'].includes(snackWithTime.type))
		saveLogInLocalStorage(snackWithTime)
}