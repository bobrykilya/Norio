import React, { useEffect, useRef, useState } from 'react'

import ToolTip from '../../ToolTip/ToolTip'
import { getDayOfWeek, getMonth, getTimeParams } from '@utils/getTime'



const DateTime = () => {

	const {
		second,
		month,
		timeString,
		timeStringFull,
		dayNum,
		dateString,
	} = getTimeParams(['second', 'month', 'timeString', 'timeStringFull', 'dayNum', 'dateString'])
	const [time, setTime] = useState(timeString)
	const [, setSeconds] = useState(null)
	const onMouseInterval = useRef(null)

	const handleEnterMouse = () => {
		onMouseInterval.current = setInterval(() => {
			setSeconds(new Date().getSeconds())
		}, 1000)
	}
	const handleLeaveMouse = () => {
		if (onMouseInterval.current) clearTimeout(onMouseInterval.current)
	}

	useEffect(() => {
		const timeout = setTimeout(() => {
			setTime(getTimeParams(['timeString']).timeString)
		}, 1000 * (60 - second))

		return () => {
			clearTimeout(timeout)
		}
	}, [time])


	return (
		<div
			className={'date_time-cont cont'}
			onMouseEnter={handleEnterMouse}
			onMouseLeave={handleLeaveMouse}
		>
			<h1>
				{time}
			</h1>
			<p>
				{dateString}
			</p>
			<ToolTip
				message={`${timeStringFull}, ${getDayOfWeek(dayNum)} ${getMonth(month, true)}`}
				position='bottom'
				isAlwaysToolTip={true}
			/>
		</div>
	)
}

export default DateTime