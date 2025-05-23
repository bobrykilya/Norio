import React, { useEffect, useRef, useState } from 'react'

import clsx from 'clsx'

import { TOOLTIP_DELAY_TIME } from '@/../constants'



export type AvailableToolTipPositions =
	'top'
	| 'bottom'
	| 'left'
	| 'right'
	| 'top_left'
	| 'top_right'
	| 'bottom_left'
	| 'bottom_right';

export type ToolTipProps = {
	message: string;
	position?: AvailableToolTipPositions;
	delayTimeMS?: number;
	isBlock?: boolean;
	isAlwaysToolTip?: boolean;
}
const ToolTip = ({ message, position = 'top', delayTimeMS, isBlock, isAlwaysToolTip = false }: ToolTipProps) => {
	const [isToolTipVisible, setIsToolTipVisible] = useState(false)
	const timer = useRef<number | null>(null)

	const handleEnterMouse = () => {
		// console.log('enter mouse')
		if (!isBlock) {
			timer.current = window.setTimeout(() => {
				// console.log('open')
				setIsToolTipVisible(true)
			}, delayTimeMS || TOOLTIP_DELAY_TIME)
		}
	}

	const handleLeaveMouse = () => {
		// console.log(timer.current)
		setIsToolTipVisible(false)
		if (timer.current) clearTimeout(timer.current)
	}

	useEffect(() => {
		if (isBlock) {
			handleLeaveMouse()
		}
	}, [isBlock])

	return (
		<div
			className='tool_tip-cont'
			onMouseEnter={handleEnterMouse}
			onMouseLeave={handleLeaveMouse}
		>
			<div className={clsx('tool_tip', isToolTipVisible && 'active', position)}>
				{message}
			</div>
		</div>
	)
}

export default ToolTip