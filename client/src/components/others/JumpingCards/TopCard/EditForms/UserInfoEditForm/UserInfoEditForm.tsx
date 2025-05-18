import React from 'react'

import { TopCardFormsProps } from '../../TopCard-lib'
import FormStatusButton from '../common/FormStatusButton/FormStatusButton'
import FormSubmitButton from '../common/FormSubmitButton/FormSubmitButton'
import GenderSelectButton from './GenderSelectButton/GenderSelectButton'
import PassportButton from './PassportButton/PassportButton'
import { useUserInfoEditForm } from './UserInfoEditForm-lib'
import { COMPANIES_LIST, JOBS_LIST, STORES_LIST } from '@/assets/AuthPage/AuthPage-data'
import { ICONS } from '@/assets/common/Icons-data'
import DateInput from '@common/Inputs/InputFields/DateInput/DateInput'
import DropDownSearchInput from '@common/Inputs/InputFields/DropDownSearchInput/DropDownSearchInput'
import NameInput from '@common/Inputs/InputFields/NameInput/NameInput'
import PhoneInput from '@common/Inputs/InputFields/PhoneInput/PhoneInput'
import { ISignUp } from '@shared/types/Auth-types'



export type IUserInfoEditForm = Omit<ISignUp, 'avatar'> & {
	company?: string;
	birthday?: string;
}

const UserInfoEditForm = ({ statusState, setStatusState }: TopCardFormsProps) => {
	// console.log('UserInfoEditForm form has been updated')

	const {
		handleSubmit,
		handleSaveForm,
		handleClickUndoBut,
		commonProps,
		dropDownSearchInputProps,
		genderState,
		setGenderState,
	} = useUserInfoEditForm({ statusState, setStatusState })


	return (
		<form
			className={'user_info_edit-form edit-form cont'}
			onSubmit={handleSubmit(handleSaveForm)}
		>
			<div
				className={'user_info_edit_form-header cont'}
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
						Личные данные
					</div>
				</div>
				<div
					className={'user_info_edit_form_birth_and_gender-cont white-card'}
				>
					<DateInput
						name='birthday'
						icon={ICONS.birthday}
						withEmptyIcon={true}
						{...commonProps}
					/>
					<GenderSelectButton
						selectedState={genderState}
						onClick={setGenderState}
					/>
				</div>
			</div>
			<div
				className={'user_info_edit_form-footer cont'}
			>
				<div
					className={'user_info_edit_form_main_form-card white-card'}
				>
					<PhoneInput
						name='phone'
						{...commonProps}
					/>
					<DropDownSearchInput
						LIST={STORES_LIST}
						name='store'
						placeholder='Точка'
						icon={ICONS.store}
						autoComplete={'home'}
						{...dropDownSearchInputProps}
					/>
					<NameInput
						name='lastName'
						placeholder='Фамилия'
						inputMaxLength={25}
						inputType='name'
						icon={ICONS.name}
						autoComplete={'family-name'}
						{...commonProps}
					/>
					<NameInput
						name='firstName'
						placeholder='Имя'
						inputType='name'
						icon={ICONS.name}
						autoComplete={'given-name'}
						{...commonProps}
					/>
					<NameInput
						name='middleName'
						placeholder='Отчество'
						inputType='name'
						icon={ICONS.name}
						autoComplete={'additional-name'}
						{...commonProps}
					/>
				</div>
				<div
					className={'user_info_edit_form_footer_right-column cont'}
				>
					<div
						className={'user_info_edit_form_company-card white-card'}
					>
						<DropDownSearchInput
							LIST={COMPANIES_LIST}
							name='company'
							placeholder='Организация'
							icon={ICONS.company}
							autoComplete={'organization'}
							{...dropDownSearchInputProps}
						/>
						<DropDownSearchInput
							LIST={JOBS_LIST}
							name='job'
							placeholder='Должность'
							icon={ICONS.job}
							autoComplete={'organization-title'}
							{...dropDownSearchInputProps}
						/>
					</div>
					<div
						className={'user_info_edit_form_footer_right_column-footer cont'}
					>
						<div
							className={'user_info_edit_form_passport-card white-card'}
						>
							<PassportButton
								// state={isPassportInfoOpened}
							/>
						</div>
						<FormSubmitButton />
					</div>
				</div>
			</div>
		</form>
	)
}

export default UserInfoEditForm