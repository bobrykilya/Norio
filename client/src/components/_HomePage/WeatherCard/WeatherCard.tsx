import React, { useEffect, useRef, useState } from 'react'
import { showSnackMessage } from "../../../features/showSnackMessage/showSnackMessage"
import CardLinkButton from "../CardLinkButton/CardLinkButton"
import SelectButton, { ISelectDropDownOptionListElem } from "../../common/Inputs/SelectButton/SelectButton"
import { FaLocationDot } from "react-icons/fa6"
import { LOCATIONS_LIST } from "../../../assets/common/Common-data"
import { ILocationWeather, ILocationWeatherElem, IWeatherTempObj } from "../../../../../common/types/Device-types"
import { ThreeDots } from 'react-loader-spinner'
import { useDeviceInfoState } from "../../../stores/Device-store"
import { getTimeParams } from "../../../utils/getTime"
import WeatherWithDescription from "./WeatherWithDescription/WeatherWithDescription"
import ToolTip from "../../others/ToolTip/ToolTip"
import { useFetchWeather } from "../../../queries/Weather-queries"
import { MY_LOC } from "../../../../constants"
import { queryClient } from "../../../http/tanstackQuery-client"
import { getCoord, handleLocationCoords } from "../../../services/Device-service"
import UnfoldingCard from "../../common/UnfoldingCard/UnfoldingCard"
import HourlyWeatherSlider from "./HourlyWeatherSlider/HourlyWeatherSlider"
import DailyWeatherElement from "./DailyWeatherElement/DailyWeatherElement"
import FutureWeather from "./FutureWeather/FutureWeather"



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

// @ts-ignore
const CITIES_AND_MY_LOCATION_LIST: ISelectButtonOptionListElem[] = LOCATIONS_LIST.map(loc => loc.city).concat({
	id: MY_LOC,
	title: 'Мои координаты',
	icon: <FaLocationDot className={'fa-icon'}/>,
	isFixed: true,
})

const WeatherCard = () => {

	const [isFullWeatherCard, setIsFullWeatherCard] = useState(false)
	const linkButtonRef = useRef(null)
	const toggleWeatherCard = () => {
		setIsFullWeatherCard(prev => !prev)
	}

	const { deviceInfoState, setDeviceLocationState, setDeviceLocationTitleState } = useDeviceInfoState()
	const deviceLocationState = deviceInfoState?.location

	const { data: weather, isPending } = useFetchWeather(deviceLocationState, {
		enabled: !!deviceLocationState && !!deviceLocationState?.coords
	})
	// console.log(weather)

	const saveSelectedValue = ({ id }: { id: string }) => {
		if (id === MY_LOC) {
			getCoords()
		} else {
			const storedDeviceLocation = LOCATIONS_LIST.find(el => el.city.id === id)
			setDeviceLocationState(handleLocationCoords(storedDeviceLocation))
		}
	}

	const getCoords = () => {
		return navigator.geolocation.getCurrentPosition(coordsSuccess, coordsError)
	}
	const coordsSuccess = async ({ coords }: { coords: {
			latitude: number;
			longitude: number;
		} }) => {
		const lat = getCoord(coords.latitude)
		const lon = getCoord(coords.longitude)
		const cashedWeather = queryClient.getQueryData(['weather', lat, lon]) as ILocationWeather

		setDeviceLocationState({
			city: {
				id: MY_LOC,
				title: !cashedWeather ? '' : cashedWeather.cityTitle
			},
			coords: {
				lat,
				lon
			}
		})
	}
	const coordsError = (err: any) => {
		showSnackMessage({ message: err.message, type: 'w' })
		setIsFullWeatherCard(false)
		setDeviceLocationState({
			city: {
				id: MY_LOC,
				title: 'Нет доступа к геоданным'
			},
		})
	}


	useEffect(() => {
		if (deviceLocationState?.city.id === MY_LOC) {
			getCoords()
		}
	}, [])

	useEffect(() => {
		if (deviceLocationState?.city.title !== weather?.cityTitle && weather?.cityTitle) {
			setDeviceLocationTitleState(weather.cityTitle)
		}
	}, [weather?.cityId === MY_LOC && !deviceLocationState?.city.title && weather?.cityTitle])


	return (
		<div
			className={'weather_card-frame cont'}
		>
			<UnfoldingCard
				isFullCard={isFullWeatherCard}
				closeCard={toggleWeatherCard}
			>
				<div
					className={'weather_card-header cont'}
				>
					<SelectButton
						OPTIONS_LIST={CITIES_AND_MY_LOCATION_LIST}
						selectedState={deviceLocationState?.city}
						onClick={saveSelectedValue}
						needToSort={true}
						toolTip={{
							text: 'Выбрать город для прогноза погоды',
							position: 'bottom',
						}}
					/>
					<CardLinkButton
						onClick={toggleWeatherCard}
						toolTip={{
							text: `${isFullWeatherCard ? 'Закрыть' : 'Открыть'} карточку погоды`,
							position: 'bottom',
						}}
						disabled={!weather}
						isCloseIcon={isFullWeatherCard}
						ref={linkButtonRef}
					/>
				</div>
				{
					weather && deviceLocationState?.coords ?
					<div
						className={`weather_part-cont cont ${isPending ? 'loading' : ''}`}
					>
						<div
							className={'weather_tool_tip-cont cont'}
						>
							<WeatherWithDescription
								weather={{
									label: 'Сейчас',
									...weather?.current,
								}}
								hourlyWeatherList={weather?.hourly}
							/>
							<FutureWeather
								hourlyWeatherList={weather?.hourly}
								currentWeather={weather?.current}
							/>
							<ToolTip
								text={`Данные о погоде обновлены в ${getTimeParams(['timeString'], weather?.forecastTimeInSec).timeString}`}
								position={'left'}
								delayTimeMS={2000}
								isAlwaysToolTip={true}
							/>
						</div>
						<div
							className={'unfolding_card-only_full cont'}
						>
							<HourlyWeatherSlider
								hourlyWeatherList={weather?.hourly}
								isReset={!isFullWeatherCard}
							/>
							<div
								className={'daily_weather_list-cont cont'}
							>
								{
									weather?.daily.map((el, num) =>
										<DailyWeatherElement
											key={el.dt}
											weather={el}
											label={num === 0 && 'Сегодня'}
										/>,
									)
								}
							</div>
						</div>
					</div>
					:
					<div className="weather-progress cont">
						<ThreeDots
							color="#E9EDF0CC"
							width="60"
						/>
					</div>
				}
			</UnfoldingCard>
		</div>
	)
}

export default WeatherCard