import React, { useEffect, useState } from 'react'

import CardLinkButton from '../CardLinkButton/CardLinkButton'
import DailyWeatherElement from './DailyWeatherElement/DailyWeatherElement'
import FutureWeather from './FutureWeather/FutureWeather'
import HourlyWeatherSlider from './HourlyWeatherSlider/HourlyWeatherSlider'
import WeatherWithDescription from './WeatherWithDescription/WeatherWithDescription'
import { MY_LOC } from '@/../constants'
import { queryClient } from '@/http/tanstackQuery-client'
import { useFetchWeather } from '@/queries/Weather-queries'
import { LOCATIONS_LIST } from '@assets/common/Common-data'
import { ICONS } from '@assets/common/Icons-data'
import SelectButton from '@common/Inputs/SelectButton/SelectButton'
import { Loader } from '@common/Loader/Loader'
import { ISelectDropDownOptionListElem } from '@common/SelectDropDown/SelectDropDown'
import UnfoldingCard from '@common/UnfoldingCard/UnfoldingCard'
import { showSnackMessage } from '@features/showSnackMessage/showSnackMessage'
import ToolTip from '@others/ToolTip/ToolTip'
import { getCoord, handleLocationCoords } from '@services/Device-service'
import { ILocationWeather, ILocationWeatherElem, IWeatherTempObj } from '@shared/types/Device-types'
import { useDeviceInfoState } from '@stores/Device-store'
import { getTimeParams } from '@utils/getTime'



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

const CITIES_AND_MY_LOCATION_LIST = LOCATIONS_LIST
	.map(loc => loc.city as ISelectDropDownOptionListElem)
	.concat({
		id: MY_LOC,
		title: 'Мои координаты',
		icon: ICONS.location,
		isFixed: true,
	})

const WeatherCard = () => {

	const [isFullWeatherCard, setIsFullWeatherCard] = useState(false)
	const toggleWeatherCard = () => {
		setIsFullWeatherCard(prev => !prev)
	}

	const { deviceInfoState, setDeviceLocationState, setDeviceLocationTitleState } = useDeviceInfoState()
	const deviceLocationState = deviceInfoState?.location

	const { data: weather, isPending, isError } = useFetchWeather(deviceLocationState, {
		enabled: !!deviceLocationState && !!deviceLocationState?.coords,
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
	const coordsSuccess = async ({ coords }: {
		coords: {
			latitude: number;
			longitude: number;
		}
	}) => {
		const lat = getCoord(coords.latitude)
		const lon = getCoord(coords.longitude)
		const cashedWeather = queryClient.getQueryData(['weather', lat, lon]) as ILocationWeather

		setDeviceLocationState({
			city: {
				id: MY_LOC,
				title: !cashedWeather ? '' : cashedWeather.cityTitle,
			},
			coords: {
				lat,
				lon,
			},
		})
	}
	const coordsError = (err: any) => {
		showSnackMessage({ message: err.message, type: 'w' })
		setIsFullWeatherCard(false)
		setDeviceLocationState({
			city: {
				id: MY_LOC,
				title: 'Нет доступа к геоданным',
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
				className={'weather-card'}
				closeHooksParams={{
					callback: toggleWeatherCard,
					conditionsList: [isFullWeatherCard],
				}}
			>
				<div
					className={'weather_card-header cont'}
				>
					<SelectButton
						OPTIONS_LIST={CITIES_AND_MY_LOCATION_LIST}
						selectedState={deviceLocationState?.city || isError && {
							id: MY_LOC,
							title: 'Сервис погоды не отвечает',
						}}
						onClick={saveSelectedValue}
						needToSort={true}
						toolTip={{
							message: 'Выбрать город для прогноза погоды',
							position: 'bottom',
						}}
						isTabDisabled={true}
					/>
					<CardLinkButton
						onClick={toggleWeatherCard}
						toolTip={{
							message: `${isFullWeatherCard ? 'Закрыть' : 'Открыть'} карточку погоды`,
							position: 'bottom',
						}}
						disabled={!weather}
						isCloseIcon={isFullWeatherCard}
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
									message={`Данные о погоде обновлены в ${getTimeParams(['timeString'], weather?.timeInSec).timeString}`}
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
										weather?.daily.map((el, index) =>
											<DailyWeatherElement
												key={el.dt}
												weather={el}
												label={index === 0 && 'Сегодня'}
											/>,
										)
									}
								</div>
							</div>
						</div>
						:
						<Loader
							contClassName={'weather_progress-cont'}
						/>
				}
			</UnfoldingCard>
		</div>
	)
}

export default WeatherCard