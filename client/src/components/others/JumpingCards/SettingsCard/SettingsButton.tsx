import React from 'react'
import RoundButton from "../../../common/Buttons/RoundButton/RoundButton"
import { ICONS } from "../../../../assets/common/Icons-data"



type SettingsButtonProps = {
	isAuthPage?: boolean;
	delayTimeMS?: number;
}
const SettingsButton = ({ isAuthPage=false, delayTimeMS }: SettingsButtonProps) => {


	return (
		<RoundButton
			onClick={() => {}}
			className={'settings-but before_hover-but'}
			toolTip={{
				text: 'Открыть панель ошибок',
				position: isAuthPage ? 'bottom_left' : 'right',
				delayTimeMS
			}}
		>
			{
				isAuthPage ? ICONS.settings : ICONS.settingsFilled
			}
		</RoundButton>
	)
}

export default SettingsButton 