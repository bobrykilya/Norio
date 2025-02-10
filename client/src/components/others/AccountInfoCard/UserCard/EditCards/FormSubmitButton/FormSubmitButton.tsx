import React from 'react'
import RoundButton from "../../../../../common/Buttons/RoundButton/RoundButton"
import { IoIosSave } from "react-icons/io"



type FormSubmitButProps = {}
const FormSubmitButton = ({}: FormSubmitButProps) => {


	return (
		<RoundButton
			className={'user_info_edit_card_submit-but'}
			isSubmitBut={true}
		>
			<IoIosSave className={'fa-icon'} />
		</RoundButton>
	)
}

export default FormSubmitButton