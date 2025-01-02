import React from 'react'
import { ILocationWeatherElem } from "../../../../../../common/types/Device-types"
import { getTemp } from "../WeatherCard"
import { getTimeParams } from "../../../../utils/getTime"



type TimeWeatherElementProps = {
	weather: ILocationWeatherElem;
}
const HourlyWeatherElement = ({ weather }: TimeWeatherElementProps) => {

	return (
		<div
			className={'hourly_weather_el-cont cont'}
		>
			<p
				className={'hourly_weather_el-temp'}
			>
				{getTemp(weather.temp)}
			</p>
			<div
				className={'hourly_weather_el-icon'}
			>
				<img src={`/weather/${weather.icon}.svg`} alt="?"/>
			</div>
			<p
				className={`hourly_weather_el-time`}
			>
				{getTimeParams(['timeString'], weather.dt).timeString}
			</p>
		</div>
	)
}

export default HourlyWeatherElement