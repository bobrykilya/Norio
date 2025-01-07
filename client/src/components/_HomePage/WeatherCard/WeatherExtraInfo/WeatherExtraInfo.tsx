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
		if (wind > 18) {
			return 'dangerous'
		} else if (wind > 10) {
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
		if (snow > 4) {
			return 'dangerous'
		} else if (snow > 2) {
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
						<span
							className={`${getRainDescription(weather.rain)}`}
						>
							{getAlert(weather.rain)}мм/ч
						</span>
					</div>
					<div
						className={'weather_extra_info_el-cont cont'}
					>
						<IoSnowOutline className={'fa-icon'}/>
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