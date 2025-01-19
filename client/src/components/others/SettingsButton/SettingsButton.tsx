import React from 'react'
import RoundButton from "../../common/Buttons/RoundButton/RoundButton"
import { TbSettings, TbSettingsFilled } from "react-icons/tb"



type SettingsButtonProps = {
	isAuthPage?: boolean;
	delayTimeMS?: number;
}
const SettingsButton = ({ isAuthPage=false, delayTimeMS }: SettingsButtonProps) => {


	return (
		<RoundButton
			icon={isAuthPage ?
				<TbSettings className='fa-icon' /> :
				<TbSettingsFilled className='fa-icon' />
			}
			onClick={() => {}}
			className={'settings-button'}
			toolTip={{
				text: 'Открыть панель ошибок',
				position: isAuthPage ? 'bottom_left' : 'right',
				delayTimeMS
			}}
		/>
	)
}

export default SettingsButton 