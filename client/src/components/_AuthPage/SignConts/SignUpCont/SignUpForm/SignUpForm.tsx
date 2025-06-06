import React, { useEffect, useState } from 'react'

import clsx from 'clsx'
import { useForm } from 'react-hook-form'

import SignUp from '../../../../../features/auth/signUp'
import SubmitBut from '../../../SubmitBut/SubmitBut'
import { ICONS } from '@assets/common/Icons-data'
import NameInput from '@common/Inputs/InputFields/NameInput/NameInput'
import PasswordInput from '@common/Inputs/InputFields/PasswordInput/PasswordInput'
import useCloseOnEsc from '@hooks/useCloseOnEsc'
import { useMatchConfirmPassword } from '@hooks/useMatchConfirmPassword'
import { ICheckUserReq } from '@shared/types/Auth-types'
import { useCoverPanelState } from '@stores/Auth-store'
import { useModalState } from '@stores/Utils-store'



type SignUpFormProps = {
	isFormBlur: boolean;
	isFormDisabled: boolean;
}
const SignUpForm = ({ isFormBlur, isFormDisabled }: SignUpFormProps) => {
	// console.log('SignUp')

	const { setCoverPanelState } = useCoverPanelState()
	const isModalStackEmpty = useModalState(s => s.isModalStackEmpty())
	const [isLoading, setIsLoading] = useState(false)
	const defaultValues = {
		username: '',
		password: '',
		confirmPassword: '',
	}
	const preloadValues = {
		username: 'Userl',
		password: '1234User',
		confirmPassword: '1234User',
	}

	const {
		register,
		handleSubmit,
		resetField: reset,
		watch,
		setValue,
		setError,
		setFocus,
		formState: { errors },
	} = useForm({
		mode: 'onChange',
		reValidateMode: 'onChange',
		defaultValues,
	})

	const commonProps = {
		register,
		errors,
		reset,
		watch,
		setValue,
		disabled: isFormDisabled,
	}

	const onSubmit = async (data: ICheckUserReq & { confirmPassword: string }) => {
		delete data.confirmPassword

		setIsLoading(true)
		await SignUp.handleCheckUser(data)
			.catch(() => setFocus('username'))
			.finally(() => setIsLoading(false))
	}


	//* confirmPassword's error react validation
	useMatchConfirmPassword({
		passVal: 'password',
		confirmVal: 'confirmPassword',
		watch,
		setError,
	})


	//* For forms Esc blur while any DropDown, SnackBar or JumpingCard is opened
	useCloseOnEsc({
		conditionsList: [!isFormDisabled, isModalStackEmpty],
		callback: () => setCoverPanelState('sign_in'),
	})

	//! Remove
	const preloadFormValuesSetting = () => {
		for (const name in defaultValues) {
			setValue(name as keyof {
				username: string;
				password: string;
				confirmPassword: string;
			}, preloadValues[name])
		}
	}
	useEffect(() => {
		preloadFormValuesSetting()
	}, [])


	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			id='sign_up-form'
			className='form cont'
		>
			<div
				className={clsx(
					'inputs-cont',
					'cont',
					isFormBlur && 'blur',
				)}
			>
				<NameInput
					name='username'
					placeholder='Логин'
					icon={ICONS.user}
					inputType='sign_up'
					autoFocus={true}
					{...commonProps}
				/>
				<PasswordInput
					name={'password'}
					inputType={'sign_up'}
					autoComplete={'new-password'}
					{...commonProps}
				/>
				<PasswordInput
					name={'confirmPassword'}
					inputType={'confirm'}
					autoComplete={'new-password'}
					matchWithName={'password'}
					{...commonProps}
				/>
			</div>
			<div
				className={clsx(
					'blur_icon-cont',
					'cont',
					isFormBlur && 'active',
				)}
			>
				{ICONS.check}
			</div>
			<SubmitBut
				icon={ICONS.next}
				disabled={isFormDisabled}
				blur={isFormBlur}
				isLoading={isLoading}
				toolTip={{
					message: 'Продолжить регистрацию',
				}}
			/>
		</form>
	)
}

export default SignUpForm