import React from 'react'
import { ILocationWeatherElem } from "../../../../../../common/types/Device-types"
import { getTemp } from "../WeatherCard"



type WeatherElementProps = {
	weather: ILocationWeatherElem & { label: string };
	labelPos?: 'start' | 'center' | 'end';
	isBigSize?: boolean;
}
const WeatherElement = ({ weather, labelPos='center', isBigSize=false }: WeatherElementProps) => {

	return (
		<div
			className={'weather_el-cont'}
		>
			<p
				className={`weather_el-label ${labelPos}`}
			>
				{weather.label}
			</p>
			<div
				className={`weather_el-body cont ${isBigSize ? 'big' : ''}`}
			>
				<div
					className={'weather_el-icon'}
				>
					<img src={`/weather/${weather.icon}.svg`} alt="?" />
				</div>
				<p
					className={'weather_el-temp'}
				>
					{getTemp(weather.temp)}
				</p>
			</div>
		</div>
	)
}

export default WeatherElement