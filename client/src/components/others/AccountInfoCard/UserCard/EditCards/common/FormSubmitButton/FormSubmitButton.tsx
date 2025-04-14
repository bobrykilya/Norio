import React from 'react'
import RoundButton from "../../../../../../common/Buttons/RoundButton/RoundButton"
import { ICONS } from "../../../../../../../assets/common/Icons-data"



type FormSubmitButProps = {}
const FormSubmitButton = ({}: FormSubmitButProps) => {


	return (
		<RoundButton
			className={'user_info_edit_card_submit-but round_blue-but'}
			isSubmitBut={true}
		>
			{ICONS.save}
		</RoundButton>
	)
}

export default FormSubmitButton