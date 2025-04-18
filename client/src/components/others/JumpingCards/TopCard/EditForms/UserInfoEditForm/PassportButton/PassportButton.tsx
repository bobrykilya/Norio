import React from 'react'
import { ICONS } from "../../../../../../../assets/common/Icons-data"
import ToolTip from "../../../../../ToolTip/ToolTip"



type PassportButtonProps = {
	state?: boolean;
}
const PassportButton = ({ state }: PassportButtonProps) => {


	return (
		<button
			className={'user_info_edit_form_passport-but cont'}
			type={'button'}
			onClick={() => {}}
		>
			{ICONS.passport}
			<span>
				Паспортные<br/> данные
			</span>
			<ToolTip
				message={`${state ? 'Показать' : 'Скрыть'} паспортные данные`}
			/>
		</button>
	)
}

export default PassportButton