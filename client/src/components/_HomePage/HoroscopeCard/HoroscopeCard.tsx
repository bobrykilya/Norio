import React from 'react'
import { useUserInfoState } from "../../../stores/Auth-store"
import { IUserRepository } from "../../../../../api/src/types/DB-types"
import { HoroscopeTypeOptions } from "../../../../../common/types/Global-types"
import { getTimeParams, zeroHandler } from "../../../utils/getTime"
import { useFetchHoroscope } from "../../../queries/Horoscope-queries"



const getHoroscopeType = (birthdayInSec: IUserRepository['birthday']): HoroscopeTypeOptions => {

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

type HoroscopeCardProps = {}
const HoroscopeCard = ({}: HoroscopeCardProps) => {

	const userInfoState = useUserInfoState(s => s.userInfoState)
	// console.log(userInfoState.birthday)

	const { data: horoscopeData, isPending, isError } = useFetchHoroscope(getHoroscopeType(userInfoState.birthday), {
		enabled: !!userInfoState && !!userInfoState.birthday
	})
	console.log(horoscopeData)


	return (
		<div
		    className={'horoscope-card cont card'}
		>
			{horoscopeData?.message}
		</div>
	)
}

export default HoroscopeCard 