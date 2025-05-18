import React from 'react'

import { TopCardFormsProps } from '../../TopCard-lib'
import FormStatusButton from '../common/FormStatusButton/FormStatusButton'
import FormSubmitButton from '../common/FormSubmitButton/FormSubmitButton'
import { useAccountInfoEditForm } from './AccountInfoEditForm-lib'
import { ICONS } from '@/assets/common/Icons-data'
import NameInput from '@common//Inputs/InputFields/NameInput/NameInput'
import PasswordInput from '@common//Inputs/InputFields/PasswordInput/PasswordInput'
import SelectAvatarButton from '@others/JumpingCards/BottomCard/AvatarList/SelectAvatarButton/SelectAvatarButton'
import { ICommonVar } from '@shared/types/Global-types'



export type IAccountInfoEditForm = {
	username: ICommonVar['username'],
	email?: ICommonVar['email'],
	prevPassword?: ICommonVar['password'],
	newPassword?: ICommonVar['password'],
	confirmNewPassword?: ICommonVar['password'],
}

const AccountInfoEditForm = ({ statusState, setStatusState }: TopCardFormsProps) => {

	const {
		handleSubmit,
		handleSaveForm,
		handleClickUndoBut,
		commonProps,
		nameInputProps,
		inputRefPrevPassword,
		avatar,
		setAvatar,
		errorAvatar,
		setErrorAvatar,
	} = useAccountInfoEditForm({ statusState, setStatusState })


	return (
		<form
			className={'account_info_edit-form edit-form cont'}
			onSubmit={handleSubmit(handleSaveForm)}
		>
			<div
				className={'account_info_edit_form-header cont'}
			>
				<div
					className={'account_info_edit_form_title_and_username-cont'}
				>
					<div
						className={'edit_form_status_and_title-cont cont'}
					>
						<FormStatusButton
							state={statusState}
							handleClickUndoBut={handleClickUndoBut}
						/>
						<div
							className={'edit_form-title white-card'}
						>
							Данные аккаунта
						</div>
					</div>
					<div
						className={'account_info_edit_form_username-card white-card'}
					>
						<NameInput
							name={'username'}
							inputType={'sign_up'}
							placeholder={'Логин'}
							icon={ICONS.user}
							autoComplete={'off'}
							{...nameInputProps}
						/>
					</div>
				</div>
				<div
					className={'account_info_edit_form_password-card white-card'}
				>
					<PasswordInput
						name={'prevPassword'}
						placeholder={'Старый пароль'}
						inputType='sign_in'
						autoComplete={'password'}
						icon={ICONS.prevPassword}
						required={false}
						inputRefPassword={inputRefPrevPassword}
						{...commonProps}
					/>
					<PasswordInput
						name={'newPassword'}
						placeholder={'Новый пароль'}
						inputType={'sign_up'}
						autoComplete={'new-password'}
						required={false}
						{...commonProps}
					/>
					<PasswordInput
						name={'confirmNewPassword'}
						placeholder={'Повтор нового пароля'}
						inputType={'confirm'}
						autoComplete={'new-password'}
						matchWithName={'newPassword'}
						required={false}
						{...commonProps}
					/>
				</div>
			</div>
			<div
				className={'account_info_edit_form-footer cont'}
			>
				<SelectAvatarButton
					selectedAvatar={avatar}
					setSelectedAvatar={setAvatar}
					error={errorAvatar}
					setError={setErrorAvatar}
					isWhiteVersion={true}
				/>
				<div
					className={'account_info_edit_form_email-card white-card'}
				>
					<NameInput
						name={'email'}
						inputType={'email'}
						placeholder={'Эл. почта'}
						icon={ICONS.email}
						autoComplete={'email'}
						inputMaxLength={50}
						{...nameInputProps}
					/>
				</div>
				<FormSubmitButton />
			</div>
		</form>
	)
}

export default AccountInfoEditForm