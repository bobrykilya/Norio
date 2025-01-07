import React from 'react'
import WeatherElement from "../WeatherElement/WeatherElement"
import { ILocationWeatherElem } from "../../../../../../common/types/Device-types"

import { capitalize } from "../../../../utils/capitalize"
import { getTemp } from "../WeatherCard"
import WeatherExtraInfo from "../WeatherExtraInfo/WeatherExtraInfo"



type WeatherWithDescriptionProps = {
	weather: ILocationWeatherElem & { label: string };
	weatherAlert?: string;
}
const WeatherWithDescription = ({ weather, weatherAlert }: WeatherWithDescriptionProps) => {
	
	return (
		<div
			className={'weather_with_description-cont cont'}
		>
			<WeatherElement
				weather={weather as ILocationWeatherElem & { label: string }}
				labelPos={'start'}
				isBigSize={true}
			/>
			<WeatherExtraInfo
				weather={weather}
			/>
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