import React, { useState } from 'react'
import { useUserInfoState } from "../../../stores/Auth-store"
import { IUserRepository } from "../../../../../api/src/types/DB-types"
import { HoroscopeTypeOptions } from "../../../../../common/types/Global-types"
import { getTimeParams, zeroHandler } from "../../../utils/getTime"
import { useFetchHoroscope } from "../../../queries/Horoscope-queries"
import { HOROSCOPE_DATA } from "../../../assets/HomePage/Horoscope-data"
import { capitalize } from "../../../utils/capitalize"
import { CURRENT_USER_LS } from "../../../../constants"
import CardLinkButton from "../CardLinkButton/CardLinkButton"
import UnfoldingCard from "../../common/UnfoldingCard/UnfoldingCard"
import WriteBirthdayButton from "./WriteBirthdayButton/WriteBirthdayButton"
import { Loader } from "../../common/Loader/Loader"



const getHoroscopeType = (birthdayInSec: IUserRepository['birthday']): HoroscopeTypeOptions => {

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

const checkHoroscopeInLS = (birthday: IUserRepository['birthday']) => {
	const currentUser = JSON.parse(localStorage.getItem(CURRENT_USER_LS))
	let horoscopeType = currentUser?.horoscopeType

	if (currentUser && !horoscopeType) {
		horoscopeType = getHoroscopeType(birthday)
		localStorage.setItem(CURRENT_USER_LS, JSON.stringify({
			...currentUser,
			horoscopeType
		}))
	}

	return horoscopeType
}

const getFirstPhrase = (text: string, quantityOfPhrases: number) => {
	if (!text) {
		return ''
	}
	const phrase = text.slice(0, quantityOfPhrases).split(' ')
	return phrase.slice(0, phrase.length - 1).join(' ')
}
type HoroscopeCardProps = {}
const HoroscopeCard = ({}: HoroscopeCardProps) => {

	const [isFullHoroscopeCard, setIsFullHoroscopeCard] = useState(false)
	const toggleHoroscopeCard = () => {
		setIsFullHoroscopeCard(prev => !prev)
	}

	const userInfoState = useUserInfoState(s => s.userInfoState)
	const horoscopeType = checkHoroscopeInLS(userInfoState.birthday)
	const horoscopeExtraInfo = HOROSCOPE_DATA[horoscopeType]

	const { data: horoscopeData } = useFetchHoroscope(horoscopeType, {
		enabled: !!userInfoState && !!userInfoState.birthday
	})
	// console.log(horoscopeData)


	return (
		<div
			className={'horoscope_card-frame cont'}
		>
			{
				!userInfoState?.birthday ?
					<WriteBirthdayButton />
					:
					<UnfoldingCard
						isFullCard={isFullHoroscopeCard}
						closeCard={toggleHoroscopeCard}
					>
						<div
							className={'horoscope_icon-cont cont'}
						>
							{horoscopeExtraInfo.icon}
						</div>
						<div
							className={'horoscope_info-frame cont'}
						>
							{
								horoscopeData ?
									<div
										className={'horoscope_info cont'}
									>
										<h2>
											{capitalize(horoscopeExtraInfo.ruName)}
										</h2>
										<div
										    className={'horoscope-message cont'}
										>
											<p
												className={'horoscope_info-short'}
											>
												{getFirstPhrase(horoscopeData?.message, 57)}...
											</p>
											<p
												className={'horoscope_info-full'}
											>
												{horoscopeData?.message}
											</p>
										</div>
									</div>
									:
									<Loader />
							}
						</div>
						<CardLinkButton
							onClick={toggleHoroscopeCard}
							toolTip={{
								text: `${isFullHoroscopeCard ? 'Закрыть' : 'Открыть'} карточку гороскопа`,
								position: 'top_left',
							}}
							disabled={!horoscopeData}
							isCloseIcon={isFullHoroscopeCard}
						/>
					</UnfoldingCard>
				}
		</div>
	)
}

export default HoroscopeCard 