import React, { useRef, useState } from 'react'
import { getDateParams, getDayOfWeek, getMonth, getTimeParams, getTimeParamString } from "../../../../utils/getTime"
import ToolTip from "../../ToolTip/ToolTip"



type DateTimeProps = {

}
const DateTime = ({}: DateTimeProps) => {

	const { hours, minutes, seconds } = getTimeParams()
	const { month, dayNum, dateString } = getDateParams()
	const [hour, setHour] = useState<number>(hours)
	const [minute, setMinute] = useState<number>(minutes)
	const [second, setSecond] = useState(seconds)
	const interval = useRef(null)
	// console.log(dayNum)
	// console.log(`${getTimeParamString(hour)}:${getTimeParamString(minute)}:${getTimeParamString(second)}`)

	const handleEnterMouse = () => {
		interval.current = setInterval(() => {
			setSecond(new Date().getSeconds())
		}, 1000)
	}
	const handleLeaveMouse = () => {
		if (interval.current) clearTimeout(interval.current)
	}

	const setNewTime = ({ hours, minutes }) => {
		setHour(hours)
		setMinute(minutes)
	}
	
	const getNewTime = () => {
		setNewTime(getTimeParams())
	}

	setTimeout(() => {
		getNewTime()
	}, 1000*(60-seconds))

	return (
		<div
			className={'date_time-cont cont'}
			onMouseEnter={handleEnterMouse}
			onMouseLeave={handleLeaveMouse}
		>
			<h1>
				{`${getTimeParamString(hour)}:${getTimeParamString(minute)}`}
			</h1>
			<p>
				{dateString}
			</p>
			<ToolTip text={`${getTimeParamString(hour)}:${getTimeParamString(minute)}:${getTimeParamString(second)}, ${getDayOfWeek(dayNum)} ${getMonth(month)}`} position='bottom' />
		</div>
	)
}

export default DateTime