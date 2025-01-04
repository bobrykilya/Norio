import React from 'react'
import { getTemp } from "../WeatherCard"
import { ILocationWeatherElem } from "../../../../../../common/types/Device-types"
import { getDayOfWeek, getTimeParams } from "../../../../utils/getTime"
import { capitalize } from "../../../../utils/capitalize"



type DailyWeatherElementProps = {
	weather: ILocationWeatherElem;
	label?: string
}
const DailyWeatherElement = ({ weather, label }: DailyWeatherElementProps) => {

	return (
		<div
			className={'daily_weather_el-cont cont'}
		>
			<div
			    className={'daily_weather_el_text-cont cont'}
			>
				<p
					className={`daily_weather_el-day`}
				>
					{label || getDayOfWeek(getTimeParams(['dayNum'], weather.dt).dayNum, true)}
				</p>
				<span
					className={'daily_weather_el-description'}
				>
					{capitalize(weather.description)}
				</span>
			</div>
			<div
			    className={'daily_weather_el_weather-cont cont'}
			>
				<div
					className={'daily_weather_el-icon'}
				>
					<img src={`/weather/${weather.icon}.svg`} alt="?"/>
				</div>
				<p
					className={'daily_weather_el-temp'}
				>
					{getTemp(weather.temp)}
				</p>
			</div>
		</div>
	)
}

export default DailyWeatherElement