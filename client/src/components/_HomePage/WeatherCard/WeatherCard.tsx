import React, { useEffect, useState } from 'react'
import { showSnackMessage } from "../../../features/showSnackMessage/showSnackMessage"
import CardLinkButton from "../CardLinkButton/CardLinkButton"
import SelectButton, { ISelectButtonOptionListElem } from "../../common/Inputs/SelectButton/SelectButton"
import { FaLocationDot } from "react-icons/fa6"
import { LOCATIONS_LIST } from "../../../assets/common/Common-data"
import { IDeviceLocation, ILocationWeather } from "../../../../../common/types/Device-types"
import { CircularProgress } from '@mui/joy'
import { useDeviceInfoState } from "../../../stores/Device-store"
import WeatherService from "../../../services/Weather-service"



type WeatherCardProps = {

}
const WeatherCard = ({}: WeatherCardProps) => {

	const { deviceInfoState, setDeviceLocationState } = useDeviceInfoState()
	const deviceLocation = deviceInfoState?.location
	const [weatherData, setWeatherData] = useState<ILocationWeather>(null)
	console.log(weatherData)


	// @ts-ignore
	const CITIES_AND_MY_LOCATION_LIST: ISelectButtonOptionListElem[] = LOCATIONS_LIST.map(loc => loc.city).concat({
		id: 'myLocation',
		title: 'Мои координаты',
		icon: <FaLocationDot className={'fa-icon'}/>,
		isFixed: true,
	})

	const myLocationChecking = ({ id }: { id: string, title: string }) => {
		let location: IDeviceLocation

		if (id === 'myLocation') {
			location = {
				city: {
					id: 'myLocation',
					title: 'Разрешите доступ к геоданным'
				},
			}
		} else {
			location = LOCATIONS_LIST.find(el => el.city.id === id)
		}

		saveSelectedCity(location)
		// setWeather(location)
	}

	const saveSelectedCity = (location: IDeviceLocation) => {
		localStorage.setItem('deviceInfo', JSON.stringify({ ...deviceInfoState, location }))
		console.log(location, 'saveSelected')
		setDeviceLocationState(location)
	}

	const getCoords = () => {
		return navigator.geolocation.getCurrentPosition(geoSuccess, geoError)
	}
	const geoSuccess = async ({ coords }) => {
		
		const data: ILocationWeather = await WeatherService.getLocationWeather({
			city: deviceInfoState.location.city,
			coords: {
				lat: coords.latitude,
				lon: coords.longitude,
			}
		})

		const location = {
			city: {
				id: 'myLocation',
				title: data.cityTitle
			},
			coords: {
				lat: coords.latitude,
				lon: coords.longitude,
			}
		}

		setWeatherData(data)
		saveSelectedCity(location)
	}

	const geoError = (err: any) => {
		showSnackMessage({ message: err.message, type: 'w' })
	}

	const setWeather = async (location?: IDeviceLocation) => {
		const tempLocation = location || deviceLocation

		if (tempLocation.city.id === 'myLocation') {
			// console.log('getCoords')
			getCoords()
		} else {
			setWeatherData(await WeatherService.getLocationWeather(tempLocation))
		}
	}
	useEffect(() => {
		// console.log('effect')
		setWeather()
	}, [])

	useEffect(() => {
		if (deviceInfoState.location.city.id === 'myLocation') {
			setWeather(deviceInfoState.location)
		}
	}, [deviceInfoState.location.city.id])

	return (
		<div
			className={'weather-card cont card'}
		>
			<div
				className={'weather_card-header cont'}
			>
				<SelectButton
					OPTIONS_LIST={CITIES_AND_MY_LOCATION_LIST}
					selectedState={deviceLocation?.city}
					onClick={myLocationChecking}
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
				<div className='weather_part-cont cont'>
					<CircularProgress variant="plain"/>
				</div>
			}
		</div>
	)
}

export default WeatherCard