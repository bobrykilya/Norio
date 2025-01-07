import React from 'react'
import { ILocationWeatherElem } from "../../../../../../common/types/Device-types"
import { MdOutlineWaterDrop } from "react-icons/md"
import { FiWind } from "react-icons/fi"
import { BsCloudRain } from "react-icons/bs"
import { IoSnowOutline } from "react-icons/io5"



type WeatherExtraInfoProps = {
	weather: ILocationWeatherElem;
	isFull?: boolean;
}
const WeatherExtraInfo = ({ weather, isFull }: WeatherExtraInfoProps) => {

	const wind = Math.round(weather.wind_gust)
	const getWindDescription = (wind: number) => {
		if (wind > 10) {
			return 'strong'
		} else if (wind > 18) {
			return 'dangerous'
		}
	}
	const getAlertDescription = (alert: number) => {
		if (!alert) {
			return '0'
		}
		return `${alert}`
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
					<MdOutlineWaterDrop className={'fa-icon'}/>
					<span>
						{weather.humidity}%
				</span>
				</div>
				<div
					className={'weather_extra_info_el-cont cont'}
				>
					<FiWind className={'fa-icon'}/>
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
						<BsCloudRain className={'fa-icon'}/>
						<span>
						{getAlertDescription(weather.rain)}мм/ч
					</span>
					</div>
					<div
						className={'weather_extra_info_el-cont cont'}
					>
						<IoSnowOutline className={'fa-icon'}/>
						<span>
						{getAlertDescription(weather.snow)}мм/ч
					</span>
					</div>
				</div>
			}
		</div>
	)
}

export default WeatherExtraInfo