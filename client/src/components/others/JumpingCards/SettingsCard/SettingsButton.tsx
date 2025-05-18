import React from 'react'

import { ICONS } from '@assets/common/Icons-data'
import RoundButton from '@common/Buttons/RoundButton/RoundButton'



type SettingsButtonProps = {
	isAuthPage?: boolean;
	delayTimeMS?: number;
}
const SettingsButton = ({ isAuthPage = false, delayTimeMS }: SettingsButtonProps) => {


	return (
		<RoundButton
			onClick={() => {
			}}
			className={'settings-but before_hover-but'}
			toolTip={{
				message: 'Открыть панель ошибок',
				position: isAuthPage ? 'bottom_left' : 'right',
				delayTimeMS,
			}}
		>
			{
				isAuthPage ? ICONS.settings : ICONS.settingsFilled
			}
		</RoundButton>
	)
}

export default SettingsButton 