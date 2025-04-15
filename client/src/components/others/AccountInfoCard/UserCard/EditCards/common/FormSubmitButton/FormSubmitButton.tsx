import React from 'react'
import RoundButton from "../../../../../../common/Buttons/RoundButton/RoundButton"
import { ICONS } from "../../../../../../../assets/common/Icons-data"



const FormSubmitButton = () => {


	return (
		<RoundButton
			className={'user_info_edit_card_submit-but round_blue-but'}
			isSubmitBut={true}
			toolTip={{
				message: 'Сохранить все поля',
				position: 'bottom'
			}}
		>
			{ICONS.save}
		</RoundButton>
	)
}

export default FormSubmitButton