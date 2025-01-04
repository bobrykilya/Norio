import React, { useEffect, useRef, useState } from 'react'
import { showSnackMessage } from "../../../features/showSnackMessage/showSnackMessage"
import CardLinkButton from "../CardLinkButton/CardLinkButton"
import SelectButton, { ISelectButtonOptionListElem } from "../../common/Inputs/SelectButton/SelectButton"
import { FaLocationDot } from "react-icons/fa6"
import { LOCATIONS_LIST } from "../../../assets/common/Common-data"
import { IDeviceLocation, ILocationWeatherElem, IWeatherTempObj } from "../../../../../common/types/Device-types"
import { ThreeDots } from 'react-loader-spinner'
import { useDeviceInfoState } from "../../../stores/Device-store"
import WeatherService from "../../../services/Weather-service"
import { getTime, getTimeParams } from "../../../utils/getTime"
import WeatherElement from "./WeatherElement/WeatherElement"
import ToolTip from "../../others/ToolTip/ToolTip"
import { useClickOutside } from "../../../hooks/useClickOutside"
import useCloseOnEsc from "../../../hooks/useCloseOnEsc"
import WeatherWithDescription from "./WeatherWithDescription/WeatherWithDescription"
import HourlyWeatherElement from "./HourlyWeatherElement/HourlyWeatherElement"
import DailyWeatherElement from "./DailyWeatherElement/DailyWeatherElement"
import { useQuery } from '@tanstack/react-query'



export const getTemp = (temp: ILocationWeatherElem['feels_like'] = 0) => {

	const getStringTemp = (temp: number) => {
		temp = Math.round(temp)
		return `${temp > 0 ? `+${temp}` : temp} °`
	}
	const getAverageTemp = (temp: IWeatherTempObj) => {
		return (temp.morn + temp.day + temp.eve + temp.night) / 4
	}


	if (typeof temp === 'number') {
		return getStringTemp(temp)
	}

	return getStringTemp(getAverageTemp(temp))
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
	const [isFullWeatherOpened, setIsFullWeatherOpened] = useState(false)
	const timer = useRef<number | null>(null)
	const weatherCardRef = useRef(null)
	const linkButtonRef = useRef(null)

	const { data: getWeatherWithCash } = useQuery({
		queryKey: ['weather', `${deviceInfoState?.location?.city.title !== 'Нет доступа к геоданным' ? deviceInfoState?.location?.city.title : null}`],
		queryFn: async () => {
			return await getLocationWeather(deviceInfoState?.location)
		},
		staleTime: 15 * 60 * 1000,
	})
	console.log(getWeatherWithCash)

	const getFutureWeather = (weather: ILocationWeatherElem) => {
		if (!weather) return
		
		const result: ILocationWeatherElem & { label?: string } = {
			...weather
		}

		const weatherTime = getTimeParams(['hour'], weather.dt).hour
		// console.log(weatherTime)
		if (6 <= weatherTime &&  weatherTime <= 11) {
			result.label = 'Утром'
		} else if (12 <= weatherTime &&  weatherTime <= 18) {
			result.label = 'Днём'
		} else if (19 <= weatherTime &&  weatherTime <= 23) {
			result.label = 'Вечером'
		} else if (0 <= weatherTime &&  weatherTime <= 5) {
			result.label = 'Ночью'
		}

		return result as ILocationWeatherElem & { label: string }
	}

	const getWeatherAlert = (weatherList: ILocationWeatherElem[]) => {
		if (!weatherList) return

		const getElTime = (el: { dt: number }) => {
			return getTimeParams(['timeString'], el.dt).timeString
		}
		for (const el of weatherList) {
			if (el.rain && !el.snow) {
				return `Дождь в ${getElTime(el)}`
			} else if (!el.rain && el.snow) {
				return `Снег в ${getElTime(el)}`
			} else if (el.rain && el.snow) {
				return `Дождь и снег в ${getElTime(el)}`
			}
		}
	}

	const weatherStepInHours = 6
	const weatherAlertStepInHours = 10

	const weatherAlertCurrent = getWeatherAlert(getWeatherWithCash?.hourly?.slice(1, weatherAlertStepInHours))
	const weather2 = getFutureWeather(getWeatherWithCash?.hourly[weatherStepInHours + 1])
	const weather3 = getFutureWeather(getWeatherWithCash?.hourly[weatherStepInHours * 2 + 1])

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
	}

	const coordsError = (err: any) => {
		showSnackMessage({ message: err.message, type: 'w' })
		// setWeatherData(null)
		setIsFullWeatherOpened(false)
		weatherCardRef.current.classList.remove('full')
		setDeviceLocationState({
			city: {
				id: 'myLocation',
				title: 'Нет доступа к геоданным'
			},
		})
	}

	const getReqLocation = (coords: IGeolocationCoords) => {

		const isNewCoords = () => {
			if (!lsDeviceLocation?.coords) return true

			const { lat, lon } = lsDeviceLocation.coords
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

		if (!tempLocation) return

		if (tempLocation.city.id === 'myLocation') {
			getCoords()
		}
	}

	const getLocationWeather = async (location: IDeviceLocation) => {
		if (!location?.coords) return
		const data = await WeatherService.getLocationWeather(location)
		timer.current = window.setTimeout(() => {
			getWeather()
		}, (data.forecastDeadTimeInSec - getTime()) * 1000)

		return data
	}

	useEffect(() => {
		getWeather(deviceInfoState.location)
	}, [deviceInfoState?.location?.city.id])


	const toggleFullWeather = () => {
		setIsFullWeatherOpened(prev => !prev)
		weatherCardRef.current.classList.toggle('full')
	}

	useClickOutside({
		ref: weatherCardRef,
		butRef: linkButtonRef,
		callback: toggleFullWeather,
		condition: isFullWeatherOpened
	})

	useCloseOnEsc({
		conditionsList: [isFullWeatherOpened],
		callback: toggleFullWeather
	})

	return (
		<div
			className={'weather_card-frame cont'}
		>
			<div
				className={'weather-card cont card'}
				ref={weatherCardRef}
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
						onClick={toggleFullWeather}
						toolTip={{
							text: `${isFullWeatherOpened ? 'Закрыть' : 'Открыть'} карточку погоды`,
							position: 'bottom'
						}}
						disabled={!getWeatherWithCash}
						isCloseIcon={isFullWeatherOpened}
						ref={linkButtonRef}
					/>
				</div>
				{getWeatherWithCash ?
					<div
						className={'weather_part-cont cont'}
					>
						<WeatherWithDescription
							weather={{
								label: 'Сейчас',
								...getWeatherWithCash.current
							}}
							weatherAlert={weatherAlertCurrent}
						/>
						<div
							className={'only_full_weather cont'}
						>
							<div
								className={'hourly_weather_el_list-cont cont'}
							>
								{
									getWeatherWithCash.hourly.slice(1, 10).map(el =>
										<HourlyWeatherElement
											key={el.dt}
											weather={el}
										/>
									)
								}
							</div>
							<div
							    className={'daily_weather_el_list-cont cont'}
							>
								{
									getWeatherWithCash.daily.map((el, num) =>
										<DailyWeatherElement
											key={el.dt}
											weather={el}
											label={num === 0 && 'Сегодня'}
										/>
									)
								}
							</div>
						</div>
						<div
							className={'future_weather-cont cont'}
						>
							<WeatherElement
								weather={weather2}
								labelPos={'start'}
							/>
							<WeatherElement
								weather={weather3}
							/>
							<WeatherElement
								weather={{
									label: 'Завтра',
									...getWeatherWithCash.current
								}}
								labelPos={'end'}
							/>
						</div>
						{/*<div*/}
						{/*	className={'cont'}*/}
						{/*>*/}

						{/*</div>*/}
						<ToolTip
							text={`Данные о погоде обновлены в ${getTimeParams(['timeString'], getWeatherWithCash.forecastTimeInSec).timeString}`}
							position={'bottom'}
							delayTimeMS={2000}
							isInfoToolTip={true}
						/>
					</div>
					:
					<div className='weather-progress cont'>
						<ThreeDots
							color='#E9EDF0CC'
							width="40"
						/>
					</div>
				}
			</div>
		</div>
	)
}

export default WeatherCard