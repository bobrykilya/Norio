import React, { useRef, useState } from 'react'

import clsx from 'clsx'

import { getTemp } from '../WeatherCard'
import WeatherExtraInfo from '../WeatherExtraInfo/WeatherExtraInfo'
import { useClickOutside } from '@hooks/useClickOutside'
import { ILocationWeatherElem } from '@shared/types/Device-types'
import { capitalize } from '@utils/capitalize'
import { getDayOfWeek, getMonth, getTimeParams } from '@utils/getTime'



type DailyWeatherElementProps = {
	weather: ILocationWeatherElem;
	label?: string;
}
const DailyWeatherElement = ({ weather, label }: DailyWeatherElementProps) => {

	const dayParams = getTimeParams(['dayNum', 'day', 'month'], weather.dt)
	const [isDailyExtraInfoOpened, setIsDailyExtraInfoOpened] = useState(false)
	const butRef = useRef(null)
	const extraInfoRef = useRef(null)

	const switchDailyExtraInfoState = () => {
		setIsDailyExtraInfoOpened(prev => !prev)
	}

	useClickOutside({
		ref: extraInfoRef,
		butRef: butRef,
		callback: switchDailyExtraInfoState,
		conditionsList: [isDailyExtraInfoOpened],
	})


	return (
		<div
			className={'daily_weather_el-cont'}
		>
			<button
				className={clsx('daily_weather_el-but', 'cont', 'before_lines-hover', isDailyExtraInfoOpened && 'extra_info_opened')}
				tabIndex={-1}
				onClick={switchDailyExtraInfoState}
				ref={butRef}
			>
				<div
					className={'daily_weather_el_text-cont cont'}
				>
					<p
						className={`daily_weather_el-day`}
					>
						{label || getDayOfWeek(dayParams.dayNum)},
						{` ${dayParams.day} ${getMonth(dayParams.month)}`}
					</p>
					<span
						className={'daily_weather_el-description'}
					>
						{capitalize(weather.description)}
					</span>
				</div>
				<div
					className={'daily_weather_el_weather-cont cont'}
				>
					<div
						className={'daily_weather_el-icon'}
					>
						<img src={`/weather/${weather.icon}.svg`} alt='?' />
					</div>
					<p
						className={'daily_weather_el-temp'}
					>
						{getTemp(weather.temp)}
					</p>
				</div>
			</button>
			<div
				className={clsx('daily_extra_info-cont', 'cont', isDailyExtraInfoOpened && 'opened')}
				ref={extraInfoRef}
			>
				<WeatherExtraInfo
					weather={weather}
					isFull={true}
				/>
			</div>
		</div>
	)
}

export default DailyWeatherElement