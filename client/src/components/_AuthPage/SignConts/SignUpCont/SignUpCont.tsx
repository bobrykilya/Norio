import React from 'react'

import clsx from 'clsx'

import NameTag from '../../NameTag/NameTag'
import SignUpForm from './SignUpForm/SignUpForm'
import { SignContProps } from '@type/Auth-types'



const SignUpCont = ({ actForm, isFormDisabled }: SignContProps) => {

	return (
		<section
			id='sign_up-cont'
			className={clsx(
				'sign-cont',
				'cont',
				actForm !== 'sign_in' && 'active',
			)}
		>
			<SignUpForm
				isFormDisabled={actForm === 'sign_up_info' || isFormDisabled}
				isFormBlur={actForm === 'sign_up_info'}
			/>
			<NameTag />
		</section>
	)
}

export default SignUpCont