import React from 'react'
import { TbSettings, TbSettingsFilled } from "react-icons/tb"
import RoundButton from "../../common/Buttons/RoundButton/RoundButton"



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
				isAuthPage ?
				<TbSettings className='fa-icon' /> :
				<TbSettingsFilled className='fa-icon' />
			}
		</RoundButton>
	)
}

export default SettingsButton 