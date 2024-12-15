import React, { useEffect, useState } from 'react'
import { showSnackMessage } from "../../../features/showSnackMessage/showSnackMessage"
import CardLinkButton from "../CardLinkButton/CardLinkButton"
import SelectButton, { ISelectButtonOptionListElem } from "../../common/Inputs/SelectButton/SelectButton"
import { FaLocationDot } from "react-icons/fa6"
import { LOCATIONS_LIST } from "../../../assets/common/Common-data"
import { useDeviceInfoState } from "../../../stores/Device-store"
import { IDeviceLocation } from "../../../../../common/types/Device-types"
import WeatherService from "../../../services/Weather-service"



type WeatherCardProps = {

}
const WeatherCard = ({  }: WeatherCardProps) => {

	const { deviceInfoState, setDeviceLocationState } = useDeviceInfoState()
	const [isGeoAllowed, setIsGeoAllowed] = useState(false)
	const deviceType = deviceInfoState?.type
	const deviceCity = deviceInfoState?.location?.city
	const [weatherData, setWeatherData] = useState<any>(false)
	console.log(weatherData)


	// @ts-ignore
	const CITIES_AND_MY_LOCATION_LIST: ISelectButtonOptionListElem[] = LOCATIONS_LIST.map(loc => loc.city).concat({
		id: 'myLocation',
		title: 'Мои координаты',
		icon: <FaLocationDot className={'fa-icon'} />,
		isFixed: true,
	})

	const saveSelectedCity = async ({ id }: { id: string, title: string }) => {
		let location: IDeviceLocation

		if (id === 'myLocation') {
			showSnackMessage({
				message: 'Разрешите доступ к геоданным для отображения погоды по Вашему местоположению',
				type: 'w',
				durationInSec: 5
			})

			location = {
				city: {
					id: 'myLocation',
					title: 'Разрешите доступ к геоданным'
				},
				// coords: {
				//
				// }
			}
		} else {
			location = LOCATIONS_LIST.find(el => el.city.id === id)
		}

		setDeviceLocationState(location)
		localStorage.setItem('deviceInfo', JSON.stringify({ ...deviceInfoState, location }))
		console.log(await WeatherService.getLocationWeather(location))
		// setWeatherData(await WeatherService.getLocationWeather(location))
	}

	const getCoords = () => {
		return navigator.geolocation.getCurrentPosition(geoSuccess, geoError)
	}
	const geoSuccess = ({ coords }) => {
		setIsGeoAllowed(true)
		console.log(coords)
		return coords.latitude
	}
	const geoError = (err: any) => {
		// console.log(`Geo fail:`)
		// console.log(err)
		showSnackMessage({ message: err.message, type: 'w' })
		setIsGeoAllowed(false)
	}

	useEffect(() => {

		if (deviceType !== 'Desktop') {
			getCoords()
		}
	}, [deviceInfoState])

	return (
		<div
			className={'weather-card cont card'}
		>
			<div
				className={'weather_card-header cont'}
			>
				<SelectButton
					OPTIONS_LIST={CITIES_AND_MY_LOCATION_LIST}
					selectedState={deviceCity}
					onClick={saveSelectedCity}
					needToSort={true}
					toolTip={{
						text: 'Выбрать город для прогноза погоды',
						position: 'bottom'
					}}
				/>
				<CardLinkButton
					link={''}
					toolTip={{
						text: 'Открыть карточку погоды',
						position: 'bottom'
					}}
				/>
			</div>
			{weatherData ?
				<div
					className={'weather_part-cont cont'}
				>
					<div
						className={'weather_el-cont'}
					>
						<p
							className={'now_label'}
						>
							Сейчас
						</p>
						<div
							className={'weather_icon-cont'}
						>
							{/*<img src={} alt="" >*/}

						</div>

					</div>
					<div
						className={'now_temperature'}
					>

					</div>
					<p
						className={'next_1_label'}
					>
						Вечером
					</p>
					<p
						className={'next_2_label'}
					>
						Ночью
					</p>
					<p
						className={'next_3_label'}
					>
						Утром
					</p>
				</div>
				:
					<div className='cont'>
						{/*<CircularProgress variant="plain" />*/}
					</div>
			}
		</div>
	)
}

export default WeatherCard