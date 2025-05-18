import React from 'react'

import NameTag from '../../NameTag/NameTag'
import SwitchUserButton from '../../SwitchUserButton/SwitchUserButton'
import SignInForm from './SignInForm/SignInForm'
import { SignContProps } from '@type/Auth-types'



const SignInCont = ({ actForm, isFormDisabled }: SignContProps) => {

	return (
		<section
			id='sign_in-cont'
			className={`sign-cont cont ${actForm === 'sign_in' ? 'active' : ''}`}
		>
			<SwitchUserButton
				disabled={isFormDisabled}
			/>
			<SignInForm
				isFormDisabled={isFormDisabled}
			/>
			<NameTag />
		</section>
	)
}

export default SignInCont