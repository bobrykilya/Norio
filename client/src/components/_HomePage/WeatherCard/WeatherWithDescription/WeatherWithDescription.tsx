import React from 'react'
import WeatherElement from "../WeatherElement/WeatherElement"
import { getTemp } from "../WeatherCard"
import { ILocationWeatherElem } from "../../../../../../common/types/Device-types"
import { MdOutlineWaterDrop } from "react-icons/md"
import { FiWind } from "react-icons/fi"
import { capitalize } from "../../../../utils/capitalize"



type WeatherWithDescriptionProps = {
	weather: ILocationWeatherElem & { label: string };
	weatherAlert?: string;
}
const WeatherWithDescription = ({ weather, weatherAlert }: WeatherWithDescriptionProps) => {

	const wind = Math.round(weather.wind_gust)
	const getWindDescription = (wind: number) => {
		if (wind > 10) {
			return 'strong'
		} else if (wind > 18) {
			return 'dangerous'
		}

	}

	
	return (
		<div
			className={'weather_with_description-cont cont'}
		>
			<WeatherElement
				weather={weather}
				labelPos={'start'}
				isBigSize={true}
			/>
			<div
				className={`weather_extra_info-cont cont`}
			>
				<div
					className={'weather_extra_info_el-cont cont'}
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
			<div
				className={'weather_with_description_text-cont cont'}
			>
				<span
					className={'weather_with_description-title'}
				>
					{capitalize(weather.description)}
				</span>
				<span
					className={'weather_with_description-description'}
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