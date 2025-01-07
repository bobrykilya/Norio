import React, { useState } from 'react'
import { ILocationWeatherElem } from "../../../../../../common/types/Device-types"
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6"
import RoundButton from "../../../common/Buttons/RoundButton/RoundButton"
import { getTemp } from "../WeatherCard"
import { getTimeParams } from "../../../../utils/getTime"



type HourlyWeatherSliderProps = {
	hourlyWeatherList: ILocationWeatherElem[];
}
const HourlyWeatherSlider = ({ hourlyWeatherList }: HourlyWeatherSliderProps) => {
	const [isSecondList, setIsSecondList] = useState(false)

	return (
		<div
			className={'hourly_weather_slider-cont cont'}
		>
			<RoundButton
				className={'left'}
				onClick={() => setIsSecondList(false)}
				disabled={!isSecondList}
			>
				<FaAngleLeft className={'fa-icon'}/>
			</RoundButton>
			<div
				className={`hourly_weather-slider cont ${isSecondList ? 'second_list' : ''}`}
			>
				<div
					className={'hourly_weather_list-cont cont'}
				>
					{
						hourlyWeatherList.slice(1, 19).map(weather =>
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
				</div>
			</div>
			<RoundButton
				className={'right'}
				onClick={() => setIsSecondList(true)}
				disabled={isSecondList}
			>
				<FaAngleRight className={'fa-icon'}/>
			</RoundButton>
		</div>
	)
}

export default HourlyWeatherSlider