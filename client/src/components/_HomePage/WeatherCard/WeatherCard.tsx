import React, { useEffect, useRef, useState } from 'react'
import { showSnackMessage } from "../../../features/showSnackMessage/showSnackMessage"
import CardLinkButton from "../CardLinkButton/CardLinkButton"
import SelectButton, { ISelectButtonOptionListElem } from "../../common/Inputs/SelectButton/SelectButton"
import { FaLocationDot } from "react-icons/fa6"
import { LOCATIONS_LIST } from "../../../assets/common/Common-data"
import { IDeviceLocation, ILocationWeather } from "../../../../../common/types/Device-types"
import { CircularProgress } from '@mui/joy'
import { useDeviceInfoState } from "../../../stores/Device-store"
import WeatherService from "../../../services/Weather-service"
import { getTime, getTimeParams } from "../../../utils/getTime"
import WeatherElement from "./WeatherElement/WeatherElement"
import { capitalize } from "../../../utils/capitalize"
import ToolTip from "../../others/ToolTip/ToolTip"



export const getTemp = (temp: number) => {
	return `${temp > 0 ? `+${Math.round(temp)}` : Math.round(temp)} °`
}


type IGeolocationCoords = {
	latitude: number;
	longitude: number;
}
type WeatherCardProps = {

}
const WeatherCard = ({}: WeatherCardProps) => {

	const { deviceInfoState, setDeviceLocationState } = useDeviceInfoState()
	const lsDeviceLocation = deviceInfoState?.location
	const [weatherData, setWeatherData] = useState<ILocationWeather>(null)
	const timer = useRef<number | null>(null)
	// console.log(weatherData)


	// @ts-ignore
	const CITIES_AND_MY_LOCATION_LIST: ISelectButtonOptionListElem[] = LOCATIONS_LIST.map(loc => loc.city).concat({
		id: 'myLocation',
		title: 'Мои координаты',
		icon: <FaLocationDot className={'fa-icon'}/>,
		isFixed: true,
	})

	const saveSelectedValue = ({ id }: { id: string, title: string }) => {
		let location: IDeviceLocation

		if (id === 'myLocation') {
			location = {
				city: {
					id,
					title: ''
				},
				coords: lsDeviceLocation.coords
			}
		} else {
			location = LOCATIONS_LIST.find(el => el.city.id === id)
		}

		setDeviceLocationState(location)
	}

	const getCoords = () => {
		return navigator.geolocation.getCurrentPosition(coordsSuccess, coordsError)
	}
	
	const coordsSuccess = async ({ coords }: { coords: IGeolocationCoords }) => {
		const data = await getLocationWeather(getReqLocation(coords))

		const currentLocation = {
			city: {
				id: 'myLocation',
				title: data.cityTitle
			},
			coords: {
				lat: coords.latitude,
				lon: coords.longitude,
			}
		}

		setDeviceLocationState(currentLocation)
		setWeatherData(data)
	}

	const coordsError = (err: any) => {
		showSnackMessage({ message: err.message, type: 'w' })
		setDeviceLocationState({
			city: {
				id: 'myLocation',
				title: 'Разрешите доступ к геоданным'
			},
		})
	}

	const getReqLocation = (coords: IGeolocationCoords) => {

		const { lat, lon } = lsDeviceLocation?.coords
		const isNewCoords = () => {
			return lat.toFixed(3) !== coords.latitude.toFixed(3) || lon.toFixed(3) !== coords.longitude.toFixed(3)
		}

		return {
			city: {
				id: 'myLocation',
				title: isNewCoords() ? '' : lsDeviceLocation.city.title
			},
			coords: {
				lat: coords.latitude,
				lon: coords.longitude,
			}
		}
	}

	const getWeather = async (location?: IDeviceLocation) => {

		if (timer.current) {
			clearTimeout(timer.current)
		}
		const tempLocation = location || lsDeviceLocation

		if (tempLocation.city.id === 'myLocation') {
			getCoords()
		} else {
			setWeatherData(await getLocationWeather(tempLocation))
		}
	}

	const getLocationWeather = async (location: IDeviceLocation) => {
		// const { data } = useQuery({
		// 	queryKey: ['weather', `${location.city.title}`],
		// 	queryFn: async () => {
		// 		return await $apiUnprotected.post("weather", { json: location })?.json<ILocationWeather>()
		// 	},
		// 	staleTime: (data.forecastDeadTimeInSec - data.forecastTimeInSec) * 1000,
		// })
		const data = await WeatherService.getLocationWeather(location)
		timer.current = window.setTimeout(() => {
			getWeather()
		}, (data.forecastDeadTimeInSec - getTime()) * 1000)

		return data
	}


	useEffect(() => {
		getWeather(deviceInfoState.location)
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
					selectedState={lsDeviceLocation?.city}
					onClick={saveSelectedValue}
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
						className={'current_weather-cont cont'}
					>
						<WeatherElement
							label={'Сейчас'}
							labelPos={'start'}
							isBigSize={true}
							iconId={weatherData.current.icon}
							temperature={weatherData.current.temp as number}
						/>
						<div
							className={'current_weather_description-cont cont'}
						>
							<span>
								{capitalize(weatherData.current.description)}
							</span>
							<p

							>
								Ощущается как {getTemp(weatherData.current.feels_like as number)}
							</p>
						</div>
						<ToolTip text={`Данные обновлены в ${getTimeParams(['timeString'], weatherData.forecastTimeInSec).timeString}`} />
					</div>
					<div
						className={'future_weather-cont cont'}
					>
						<WeatherElement
							label={'Вечером'}
							labelPos={'start'}
							iconId={weatherData.current.icon}
							temperature={weatherData.current.temp as number}
						/>
						<WeatherElement
							label={'Утром'}
							// labelPos={'start'}
							iconId={weatherData.current.icon}
							temperature={weatherData.current.temp as number}
						/>
						<WeatherElement
							label={'Днём'}
							labelPos={'end'}
							iconId={weatherData.current.icon}
							temperature={weatherData.current.temp as number}
						/>
					</div>
				</div>
				:
				<div className='cont'>
					<CircularProgress variant="plain"/>
				</div>
			}
		</div>
	)
}

export default WeatherCard