import React, { useEffect } from 'react'

import { socket } from '@/context/Auth-context'
import { STORES_LIST } from '@assets/AuthPage/AuthPage-data'
import { LOCATIONS_LIST } from '@assets/common/Common-data'
import HoroscopeCard from '@components/_HomePage/HoroscopeCard/HoroscopeCard'
import TaskCard from '@components/_HomePage/TaskCard/TaskCard'
import WeatherCard from '@components/_HomePage/WeatherCard/WeatherCard'
import AccountInfoCard from '@others/AccountInfoCard/AccountInfoCard'
import NavBar from '@others/NavBar/NavBar'
import { handleLocationCoords } from '@services/Device-service'
import { IDeviceLocation } from '@shared/types/Device-types'
import { useDeviceInfoState } from '@stores/Device-store'
import { useUserInfoState } from '@stores/User-store'
import { ClassicAnim } from '@utils/pageTransitions'



type HomePageProps = {
	isUserLogged: boolean;
}
const HomePage = ({ isUserLogged }: HomePageProps) => {

	const userInfo = useUserInfoState(s => s.userInfoState)
	const [deviceInfo, setDeviceLocationState] = useDeviceInfoState(s => [s.deviceInfoState, s.setDeviceLocationState])


	useEffect(() => {

		const userJoinEvent = () => socket.emit('join', {
			userId: userInfo?.userId,
			deviceId: deviceInfo?.id,
		})

		if (isUserLogged) {
			userJoinEvent()
		}

		if (!deviceInfo?.location) {
			let location: IDeviceLocation

			if (deviceInfo?.type !== 'Desktop') {
				location = {
					city: {
						id: 'myLocation',
						title: '',
					},
				}
			} else {
				const cityId = STORES_LIST.find(el => el.title === userInfo?.store).cityId
				location = LOCATIONS_LIST.find(el => el.city.id === cityId)
			}
			setDeviceLocationState(handleLocationCoords(location))
		}

	}, [isUserLogged])

	return (
		<ClassicAnim>
			<div id='main_page-cont' className='cont'>
				<NavBar />
				<div className='center-column cont'>
					<div className='center_column-header cont'>
						<div className='search_and_task_filters-cont cont'>
							<div className='search-card cont card'>
							</div>
							<div className='task_filters-card cont card'>
							</div>
						</div>
						<div className='calendar-card cont card'>
						</div>
						<WeatherCard />
					</div>
					<div
						className={'task_and_note_cards-cont cont'}
					>
						<TaskCard />
						<div
							className={'note-card cont card'}
						>

						</div>
					</div>

				</div>
				<div className='right-column cont'>
					<AccountInfoCard />
					<div className='recent_changes_card-cont cont card'>

					</div>
					<HoroscopeCard />
				</div>
			</div>
		</ClassicAnim>
	)
}

export default HomePage