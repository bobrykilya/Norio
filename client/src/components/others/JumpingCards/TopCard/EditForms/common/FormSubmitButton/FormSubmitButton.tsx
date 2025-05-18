import React from 'react'

import { ICONS } from '@assets/common/Icons-data'
import RoundButton from '@common/Buttons/RoundButton/RoundButton'



const FormSubmitButton = () => {


	return (
		<RoundButton
			className={'user_info_edit_form_submit-but round_blue-but'}
			type={'submit'}
			toolTip={{
				message: 'Сохранить все поля',
				position: 'bottom',
			}}
			tabIndex={-1}
		>
			{ICONS.save}
		</RoundButton>
	)
}

export default FormSubmitButton