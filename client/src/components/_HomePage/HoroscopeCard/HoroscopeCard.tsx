import React, { useState } from 'react'
import { IUserRepository } from "../../../../../api/src/types/DB-types"
import { useFetchHoroscope } from "../../../queries/Horoscope-queries"
import { getHoroscopeType, HOROSCOPE_DATA } from "../../../assets/HomePage/Horoscope-data"
import { capitalize } from "../../../utils/capitalize"
import { CURRENT_USER_LS } from "../../../../constants"
import CardLinkButton from "../CardLinkButton/CardLinkButton"
import UnfoldingCard from "../../common/UnfoldingCard/UnfoldingCard"
import WriteBirthdayButton from "./WriteBirthdayButton/WriteBirthdayButton"
import { Loader } from "../../common/Loader/Loader"
import { useUserInfoState } from "../../../stores/User-store"



const checkHoroscopeInLS = (birthday: IUserRepository['birthday']) => {
	const currentUser = JSON.parse(localStorage.getItem(CURRENT_USER_LS))
	let horoscope = currentUser?.horoscope

	if (currentUser && !horoscope || horoscope.birthday !== birthday) {
		horoscope = {
			horoscopeType: getHoroscopeType(birthday),
			birthday
		}
		localStorage.setItem(CURRENT_USER_LS, JSON.stringify({
			...currentUser,
			horoscope
		}))
	}

	return horoscope.horoscopeType
}

const getFirstPhrase = (text: string, quantityOfPhrases: number) => {
	if (!text) {
		return ''
	}
	const phrase = text.slice(0, quantityOfPhrases).split(' ')
	return phrase.slice(0, phrase.length - 1).join(' ')
}

const HoroscopeCard = () => {

	const [isFullHoroscopeCard, setIsFullHoroscopeCard] = useState(false)
	const toggleHoroscopeCard = () => {
		setIsFullHoroscopeCard(prev => !prev)
	}

	const userInfoState = useUserInfoState(s => s.userInfoState)
	const horoscopeType = checkHoroscopeInLS(userInfoState.birthday)
	const horoscopeExtraInfo = HOROSCOPE_DATA[horoscopeType]

	const { data: horoscopeData } = useFetchHoroscope(horoscopeType, {
		enabled: !!userInfoState && !!userInfoState.birthday,
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
								horoscopeData?.messages ?
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
												{getFirstPhrase(horoscopeData?.messages[0], 57)}...
											</p>
											<p
												className={'horoscope_info-full'}
											>
												{horoscopeData?.messages[0]}
												<br/><br/>
												{horoscopeData?.messages[1]}
											</p>
										</div>
									</div>
									:
									<Loader
										contClassName={'horoscope-spinner'}
									/>
							}
						</div>
						<CardLinkButton
							onClick={toggleHoroscopeCard}
							toolTip={{
								message: `${isFullHoroscopeCard ? 'Закрыть' : 'Открыть'} карточку гороскопа`,
								position: 'top_left',
							}}
							disabled={!horoscopeData?.messages}
							isCloseIcon={isFullHoroscopeCard}
						/>
					</UnfoldingCard>
				}
		</div>
	)
}

export default HoroscopeCard 