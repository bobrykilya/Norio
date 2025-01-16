import React from 'react'
import WeatherElement from "../WeatherElement/WeatherElement"
import { ILocationWeatherElem } from "../../../../../../common/types/Device-types"
import { getTimeParams } from "../../../../utils/getTime"



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


type FutureWeatherProps = {
	hourlyWeatherList?: ILocationWeatherElem[];
	currentWeather?: ILocationWeatherElem;
}
const FutureWeather = ({ hourlyWeatherList, currentWeather }: FutureWeatherProps) => {

	const weatherStepInHours = 6
	const weather2 = getFutureWeather(hourlyWeatherList[weatherStepInHours + 1])
	const weather3 = getFutureWeather(hourlyWeatherList[weatherStepInHours * 2 + 1])


	return (
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
					...currentWeather
				}}
				labelPos={'end'}
			/>
		</div>
	)
}

export default FutureWeather