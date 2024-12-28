import React from 'react'



type WeatherElementProps = {
	label: string;
	iconId: string;
	temperature: string;
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
					{temperature}
				</p>
			</div>
		</div>
	)
}

export default WeatherElement