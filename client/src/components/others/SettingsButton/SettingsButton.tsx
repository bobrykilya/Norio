import React from 'react'
import ToolTip from "../ToolTip/ToolTip"
import RoundButton from "../../common/Buttons/RoundButton/RoundButton"
import { TbSettings, TbSettingsFilled } from "react-icons/tb"



type SettingsButtonProps = {
	isAuthPage?: boolean;
}
const SettingsButton = ({ isAuthPage=false }: SettingsButtonProps) => {


	return (
		<RoundButton
			onClick={() => {}}
			className={'settings-button'}
		>
			{isAuthPage ?
				< TbSettings className='fa-icon' />
				:
				< TbSettingsFilled className='fa-icon' />
			}
			<ToolTip text='Открыть панель ошибок' position={`${isAuthPage ? 'bottom_left' : 'right'}`} />
		</RoundButton>
	)
}

export default SettingsButton 