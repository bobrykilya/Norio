import React, { useEffect, useRef, useState } from 'react'

import { getTemp } from '../WeatherCard'
import { ICONS } from '@assets/common/Icons-data'
import RoundButton from '@common/Buttons/RoundButton/RoundButton'
import { ILocationWeatherElem } from '@shared/types/Device-types'
import { throttle } from '@utils/debounce'
import { getTimeParams } from '@utils/getTime'



type ScrollTestOptions = 'start' | 'end'
type HourlyWeatherSliderProps = {
	hourlyWeatherList: ILocationWeatherElem[];
	isReset?: boolean;
}
const HourlyWeatherSlider = ({ hourlyWeatherList, isReset }: HourlyWeatherSliderProps) => {

	const [scrollPosition, setScrollPosition] = useState(0)
	const scrollListRef = useRef(null)
	const scrollListEnd = scrollListRef.current?.scrollWidth - scrollListRef.current?.clientWidth //* 521
	const scrollValue = 265
	const debounceScrollDelay = 150
	const debounceFault = 5
	// console.log({ scrollPosition })

	const scrollTest = (option: ScrollTestOptions = 'start') => {
		if (option === 'start') {
			return scrollPosition < debounceFault
		} else {
			return scrollPosition + debounceFault > scrollListEnd
		}
	}


	const handleScrollToTheStart = async () => {
		scrollListRef.current.scrollTo({ left: 0, behavior: 'smooth' })
		setScrollPosition(0)
	}
	const handleScrollToTheEnd = async () => {
		scrollListRef.current.scrollTo({ left: scrollListEnd, behavior: 'smooth' })
		setScrollPosition(scrollListEnd)
	}


	const handleScrollList = async (e: React.WheelEvent<HTMLUListElement>) => {

		if (e.deltaY < 0) {
			if (scrollTest()) {
				return
			}
			scrollListRef.current.scrollLeft -= scrollValue
			setScrollPosition(scrollListRef.current.scrollLeft - scrollValue)
		} else {
			if (scrollTest('end')) {
				return
			}
			scrollListRef.current.scrollLeft += scrollValue
			setScrollPosition(scrollListRef.current.scrollLeft + scrollValue)
		}
	}

	useEffect(() => {
		if (isReset) {
			if (scrollTest()) {
				return
			}
			handleScrollToTheStart()
		}
	}, [isReset])

	return (
		<div
			className={'hourly_weather_slider-cont cont'}
		>
			<RoundButton
				onClick={handleScrollToTheStart}
				className={'left before_hover-but'}
				disabled={scrollTest()}
				size={'xs'}
			>
				{ICONS.arrowLeft}
			</RoundButton>
			<ul
				className={'hourly_weather_list-cont cont'}
				onWheel={throttle(handleScrollList, debounceScrollDelay)}
				ref={scrollListRef}
				tabIndex={-1}
			>
				{
					hourlyWeatherList.slice(1, 19).map(weather =>
						<li
							className={'hourly_weather_el-cont cont'}
							key={weather.dt}
						>
							<p
								className={'hourly_weather_el-temp'}
							>
								{getTemp(weather.temp)}
							</p>
							<div
								className={'hourly_weather_el-icon'}
							>
								<img src={`/weather/${weather.icon}.svg`} alt='?' />
							</div>
							<p
								className={'hourly_weather_el-time'}
							>
								{getTimeParams(['timeString'], weather.dt).timeString}
							</p>
						</li>,
					)
				}
			</ul>
			<RoundButton
				onClick={handleScrollToTheEnd}
				className={'right before_hover-but'}
				disabled={scrollTest('end')}
				size={'xs'}
			>
				{ICONS.arrowRight}
			</RoundButton>
		</div>
	)
}

export default HourlyWeatherSlider