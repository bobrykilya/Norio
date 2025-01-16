import React, { useRef, useState } from 'react'
import { ILocationWeatherElem } from "../../../../../../common/types/Device-types"
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6"
import RoundButton from "../../../common/Buttons/RoundButton/RoundButton"
import { getTemp } from "../WeatherCard"
import { getTimeParams } from "../../../../utils/getTime"
import timeout from "../../../../utils/timeout"



type HourlyWeatherSliderProps = {
	hourlyWeatherList: ILocationWeatherElem[];
}
const HourlyWeatherSlider = ({ hourlyWeatherList }: HourlyWeatherSliderProps) => {

	const [isScrollBlocked, setIsScrollBlocked] = useState(false)
	const scrollListRef = useRef(null)
	const scrollListEnd = scrollListRef.current?.scrollWidth - scrollListRef.current?.clientWidth
	const scrollListPosition = scrollListRef.current?.scrollLeft + 3
	const scrollValue = 270
	const debounceScrollDelay = 220
	// console.log({ scrollListPosition })

	const useDebounce = async () => {
		setIsScrollBlocked(true)
		await timeout(debounceScrollDelay)
		setIsScrollBlocked(false)
	}
	const handleScrollToTheStart = async () => {
		if (scrollListPosition < 5) {
			return
		}
		scrollListRef.current.scrollTo({ left: 0, behavior: 'smooth' })
		await useDebounce()
	}
	const handleScrollToTheEnd = async () => {
		if (scrollListPosition > scrollListEnd) {
			return
		}
		scrollListRef.current.scrollTo({ left: scrollListEnd, behavior: 'smooth' })
		await useDebounce()
	}

	const handleScrollList = async (e: React.WheelEvent<HTMLUListElement>) => {
		if (isScrollBlocked) return

		if (e.deltaY > 0) {
			if (scrollListPosition > scrollListEnd) {
				return
			}
			e.currentTarget.scrollLeft += scrollValue
			await useDebounce()
		} else {
			if (scrollListPosition < 5) {
				return
			}
			e.currentTarget.scrollLeft -= scrollValue
			await useDebounce()
		}
	}


	return (
		<div
			className={'hourly_weather_slider-cont cont'}
		>
			<RoundButton
				className={'left'}
				onClick={handleScrollToTheStart}
			>
				<FaAngleLeft className={'fa-icon'}/>
			</RoundButton>
			<ul
				className={'hourly_weather_list-cont cont'}
				onWheel={handleScrollList}
				ref={scrollListRef}
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
								<img src={`/weather/${weather.icon}.svg`} alt="?"/>
							</div>
							<p
								className={`hourly_weather_el-time`}
							>
								{getTimeParams(['timeString'], weather.dt).timeString}
							</p>
						</li>
					)
				}
			</ul>
			<RoundButton
				className={'right'}
				onClick={handleScrollToTheEnd}
			>
				<FaAngleRight className={'fa-icon'}/>
			</RoundButton>
		</div>
	)
}

export default HourlyWeatherSlider