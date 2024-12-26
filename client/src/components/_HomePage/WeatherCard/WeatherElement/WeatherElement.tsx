import React from 'react'
import { getTemp } from "../WeatherCard"



type WeatherElementProps = {
	label: string;
	iconId: string;
	temperature: number;
	labelPos?: 'start' | 'center' | 'end';
	isBigSize?: boolean;
}
const WeatherElement = ({ label, iconId, temperature, labelPos='center', isBigSize=false }: WeatherElementProps) => {

	return (
		<div
			className={'weather_el-cont'}
		>
			<p
				className={`weather_el-label ${labelPos}`}
			>
				{label}
			</p>
			<div
				className={`weather_el-body cont ${isBigSize ? 'big' : ''}`}
			>
				<div
					className={'weather_el-icon'}
				>
					<img src={`/weather/${iconId}.svg`} alt="?" />
				</div>
				<p
					className={'weather_el-temp'}
				>
					{getTemp(temperature)}
				</p>
			</div>
		</div>
	)
}

export default WeatherElement