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



type HoroscopeExtraInfo = {
	ruName: string
	icon: ICommonVar['icon'],
}

type IHoroscopeData = Record<HoroscopeTypeOptions, HoroscopeExtraInfo>

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