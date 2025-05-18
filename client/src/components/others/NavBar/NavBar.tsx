import React, { useRef, useState } from 'react'

import clsx from 'clsx'
import { useLocation } from 'react-router-dom'

import RoundButton from '../../common/Buttons/RoundButton/RoundButton'
import LogBookButton from '../JumpingCards/BottomCard/LogBook/LogBookButton/LogBookButton'
import SettingsButton from '../JumpingCards/SettingsCard/SettingsButton'
import ToolTip from '../ToolTip/ToolTip'
import { TOOLTIP_DELAY_TIME } from '@/../constants'
import { NAV_BAR_LIST } from '@assets/common/Common-data'
import { ICONS } from '@assets/common/Icons-data'
import { getPathToLogo } from '@utils/createString'



type NavBarProps = {}
const NavBar = ({}: NavBarProps) => {

	const location = useLocation()
	const curr_path = location.pathname.split('/')[1]
	// console.log(curr_path)

	const [toolTipDelayTimeMS, setToolTipDelayTimeMS] = useState(TOOLTIP_DELAY_TIME)
	const timer = useRef<number | null>(null)

	const handleEnterMouse = () => {
		timer.current = window.setTimeout(() => {
			setToolTipDelayTimeMS(100)
		}, TOOLTIP_DELAY_TIME)
	}

	const handleLeaveMouse = () => {
		setToolTipDelayTimeMS(TOOLTIP_DELAY_TIME)
		if (timer.current) {
			clearTimeout(timer.current)
		}
	}

	return (
		<div
			className='nav_bar-card cont'
			onMouseEnter={handleEnterMouse}
			onMouseLeave={handleLeaveMouse}
		>
			<button
				className='logo-cont cont'
				tabIndex={-1}
				// title='Улыбнись, заяц)'
			>
				<img className='app_icon-img' src={getPathToLogo()} alt='*' />
				<ToolTip
					message={'Улыбнись, заяц)'}
					position={'bottom_right'}
					isAlwaysToolTip={true}
					delayTimeMS={5000}
				/>
				{/*<AppTitle />*/}
			</button>
			<nav
				className='nav_bar-cont cont card'
			>
				{
					NAV_BAR_LIST.map(el => {
						return (
							<RoundButton
								key={el.id}
								onClick={() => {
								}}
								className={clsx('clear-but', el.id === curr_path && 'selected')}
								toolTip={{
									message: el.title,
									position: 'right',
									isAlwaysToolTip: true,
									delayTimeMS: toolTipDelayTimeMS,
								}}
								size={'l'}
							>
								{el.icon}
							</RoundButton>
						)
					})
				}
			</nav>
			<div
				className={'nav_bar-footer cont'}
			>
				<LogBookButton
					delayTimeMS={toolTipDelayTimeMS}
				/>
				<RoundButton
					onClick={() => {
					}}
					className={'info-but before_hover-but'}
					toolTip={{
						message: 'Описание приложения и инструкция',
						position: 'right',
						delayTimeMS: toolTipDelayTimeMS,
					}}
				>
					{ICONS.instructionsFilled}
				</RoundButton>
				<SettingsButton
					delayTimeMS={toolTipDelayTimeMS}
				/>
			</div>
		</div>
	)
}

export default NavBar