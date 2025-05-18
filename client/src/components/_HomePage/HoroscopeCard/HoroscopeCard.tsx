import React, { useMemo, useState } from 'react'

import CardLinkButton from '../CardLinkButton/CardLinkButton'
import WriteBirthdayButton from './WriteBirthdayButton/WriteBirthdayButton'
import { CURRENT_USER_LS } from '@/../constants'
import { useFetchHoroscope } from '@/queries/Horoscope-queries'
import { IUserRepository } from '@api/src/types/DB-types'
import { getHoroscopeType, HOROSCOPE_DATA } from '@assets/HomePage/Horoscope-data'
import { Loader } from '@common/Loader/Loader'
import UnfoldingCard from '@common/UnfoldingCard/UnfoldingCard'
import { ICurrentUserLS } from '@features/auth/authCommon'
import { useUserInfoState } from '@stores/User-store'
import { capitalize } from '@utils/capitalize'
import { getLSObject, setLSObject } from '@utils/localStorage'



const checkHoroscopeInLS = (birthday: IUserRepository['birthday']) => {
	const currentUser = getLSObject<ICurrentUserLS>(CURRENT_USER_LS)
	let horoscope = currentUser?.horoscope

	if (currentUser && !horoscope || horoscope.birthday !== birthday) {
		horoscope = {
			horoscopeType: getHoroscopeType(birthday),
			birthday,
		}
		setLSObject(CURRENT_USER_LS, {
			...currentUser,
			horoscope,
		})
	}

	return horoscope.horoscopeType
}

const HoroscopeCard = () => {

	const [isFullHoroscopeCard, setIsFullHoroscopeCard] = useState(false)
	const toggleHoroscopeCard = () => {
		setIsFullHoroscopeCard(prev => !prev)
	}

	const userInfoState = useUserInfoState(s => s.userInfoState)
	const horoscopeType = useMemo(() => checkHoroscopeInLS(userInfoState.birthday), [userInfoState.birthday])
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
						className={'horoscope-card'}
						closeHooksParams={{
							callback: toggleHoroscopeCard,
							conditionsList: [isFullHoroscopeCard],
						}}
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
												className={'horoscope_info-short cont'}
											>
												{horoscopeData?.messages[0]}
											</p>
											<p
												className={'horoscope_info-full'}
											>
												{horoscopeData?.messages[0]}
												<br /><br />
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