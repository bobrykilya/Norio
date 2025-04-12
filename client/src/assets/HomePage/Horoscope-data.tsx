import React from "react"
import { HoroscopeTypeOptions, ICommonVar } from "../../../../common/types/Global-types"
import {
	TbZodiacAries,
	TbZodiacCancer,
	TbZodiacCapricorn,
	TbZodiacGemini,
	TbZodiacLeo,
	TbZodiacLibra,
	TbZodiacPisces,
	TbZodiacSagittarius,
	TbZodiacScorpio,
	TbZodiacTaurus,
	TbZodiacVirgo,
} from "react-icons/tb"
import { IUserRepository } from "../../../../api/src/types/DB-types"
import { getTimeParams, zeroHandler } from "../../utils/getTime"



export const getHoroscopeType = (birthdayInSec: IUserRepository['birthday']): HoroscopeTypeOptions => {

	// console.log('getHoroscopeType')
	const { month, day } = getTimeParams(['month', 'day'], birthdayInSec)
	const date = Number(`${month}.${zeroHandler(day)}`)

	if (date >= 1.21 && date <= 2.20) {
		return 'aquarius' //* водолей
	} else if (date >= 2.21 && date <= 3.20) {
		return 'pisces' //* рыбы
	} else if (date >= 3.21 && date <= 4.20) {
		return 'aries' //* овен
	} else if (date >= 4.21 && date <= 5.20) {
		return 'taurus' //* телец
	} else if (date >= 5.21 && date <= 6.21) {
		return 'gemini' //* близнецы
	} else if (date >= 6.22 && date <= 7.22) {
		return 'cancer' //* рак
	} else if (date >= 7.23 && date <= 8.23) {
		return 'leo' //* лев
	} else if (date >= 8.24 && date <= 9.23) {
		return 'virgo' //* дева
	} else if (date >= 9.24 && date <= 10.23) {
		return 'libra' //* весы
	} else if (date >= 10.24 && date <= 11.22) {
		return 'scorpio' //* скорпион
	} else if (date >= 11.23 && date <= 12.21) {
		return 'sagittarius' //* стрелец
	} else {
		return 'capricorn' //* козерог
	}
}



type IHoroscopeData = Record<HoroscopeTypeOptions, {
	ruName: string;
	icon: ICommonVar['icon'];
}>

export const HOROSCOPE_DATA: IHoroscopeData = {
	aquarius: {
		ruName: 'водолей',
		icon: <TbZodiacVirgo className={'fa-icon'} />
	},
	pisces: {
		ruName: 'рыбы',
		icon: <TbZodiacPisces className={'fa-icon'} />
	},
	aries: {
		ruName: 'овен',
		icon: <TbZodiacAries className={'fa-icon'} />
	},
	taurus: {
		ruName: 'телец',
		icon: <TbZodiacTaurus className={'fa-icon'} />
	},
	gemini: {
		ruName: 'близнецы',
		icon: <TbZodiacGemini className={'fa-icon'} />
	},
	cancer: {
		ruName: 'рак',
		icon: <TbZodiacCancer className={'fa-icon'} />
	},
	leo: {
		ruName: 'лев',
		icon: <TbZodiacLeo className={'fa-icon'} />
	},
	virgo: {
		ruName: 'дева',
		icon: <TbZodiacVirgo className={'fa-icon'} />
	},
	libra: {
		ruName: 'весы',
		icon: <TbZodiacLibra className={'fa-icon'} />
	},
	scorpio: {
		ruName: 'скорпион',
		icon: <TbZodiacScorpio className={'fa-icon'} />
	},
	sagittarius: {
		ruName: 'стрелец',
		icon: <TbZodiacSagittarius className={'fa-icon'} />
	},
	capricorn: {
		ruName: 'козерог',
		icon: <TbZodiacCapricorn className={'fa-icon'} />
	},
}