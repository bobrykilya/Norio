import React from 'react'

import SignUpInfoForm from './SignUpInfoForm/SignUpInfoForm'
import { SignContProps } from '@type/Auth-types'



const SignUpInfoCont = ({ actForm, isFormDisabled }: SignContProps) => {

	return (
		<section
			id='sign_up_info-cont'
			className={`sign-cont cont ${actForm === 'sign_up_info' ? 'active' : ''}`}
		>
			<SignUpInfoForm
				isFormDisabled={isFormDisabled}
				isAvatarButDisabled={actForm !== 'sign_up_info'}
			/>
		</section>
	)
}

export default SignUpInfoCont