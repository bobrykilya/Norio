import React from 'react'

import { ICONS } from '@assets/common/Icons-data'
import { ILocationWeatherElem } from '@shared/types/Device-types'



type WeatherExtraInfoProps = {
	weather: ILocationWeatherElem;
	isFull?: boolean;
}
const WeatherExtraInfo = ({ weather, isFull }: WeatherExtraInfoProps) => {

	const wind = Math.round(weather.wind_gust)
	const getWindDescription = (wind: number) => {
		if (wind > 18) {
			return 'dangerous'
		} else if (wind > 12) {
			return 'strong'
		}
	}
	const getRainDescription = (rain: number) => {
		if (rain > 25) {
			return 'dangerous'
		} else if (rain > 15) {
			return 'strong'
		}
	}
	const getSnowDescription = (snow: number) => {
		if (snow > 3.5) {
			return 'dangerous'
		} else if (snow > 1.7) {
			return 'strong'
		}
	}

	const getAlert = (alert: number) => {
		if (!alert) {
			return '0'
		}
		return alert.toString()
	}

	return (
		<div
			className={`weather_extra_info-cont cont ${isFull ? 'full' : ''}`}
		>
			<div
				className={'weather_extra_info_double-cont cont'}
			>
				<div
					className={`weather_extra_info_el-cont cont`}
				>
					{ICONS.humidity}
					<span>
						{weather.humidity}%
				</span>
				</div>
				<div
					className={'weather_extra_info_el-cont cont'}
				>
					{ICONS.wind}
					<span
						className={`${getWindDescription(wind)}`}
					>
						{wind}м/c
				</span>
				</div>
			</div>
			{
				isFull &&
				<div
					className={'weather_extra_info_double-cont cont'}
				>
					<div
						className={'weather_extra_info_el-cont cont'}
					>
						{ICONS.rain}
						<span
							className={`${getRainDescription(weather.rain)}`}
						>
							{getAlert(weather.rain)}мм/ч
						</span>
					</div>
					<div
						className={'weather_extra_info_el-cont cont'}
					>
						{ICONS.snow}
						<span
							className={`${getSnowDescription(weather.snow)}`}
						>
							{getAlert(weather.snow)}мм/ч
						</span>
					</div>
				</div>
			}
		</div>
	)
}

export default WeatherExtraInfo