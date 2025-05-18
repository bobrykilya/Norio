import React from 'react'

import { getTemp } from '../WeatherCard'
import WeatherElement from '../WeatherElement/WeatherElement'
import WeatherExtraInfo from '../WeatherExtraInfo/WeatherExtraInfo'
import { ILocationWeatherElem } from '@shared/types/Device-types'
import { capitalize } from '@utils/capitalize'
import { getTimeParams } from '@utils/getTime'



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


type WeatherWithDescriptionProps = {
	weather: ILocationWeatherElem & { label: string };
	hourlyWeatherList?: ILocationWeatherElem[];
}
const WeatherWithDescription = ({ weather, hourlyWeatherList }: WeatherWithDescriptionProps) => {

	const weatherAlertForecastTime = 10
	const weatherAlert = getWeatherAlert(hourlyWeatherList?.slice(1, weatherAlertForecastTime))


	return (
		<div
			className={'weather_with_description-cont cont'}
		>
			<WeatherElement
				weather={weather as ILocationWeatherElem & { label: string }}
				labelPos={'start'}
				isBigSize={true}
			/>
			<WeatherExtraInfo
				weather={weather}
			/>
			<div
				className={`weather_with_description_text-cont cont ${weatherAlert ? 'with_alert' : ''}`}
			>
				<span
					className={'weather_with_description-description'}
				>
					{capitalize(weather.description)}
				</span>
				<span
					className={'weather_with_description-fells_like'}
				>
					Ощущается как {getTemp(weather.feels_like)}
				</span>
				{weatherAlert &&
					<span
						className={'weather_with_description-alert'}
					>
						{weatherAlert}
					</span>
				}
			</div>
		</div>
	)
}

export default WeatherWithDescription