import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ISignUp } from "../../../../../../../../common/types/Auth-types"
import { SubmitHandler, useForm } from 'react-hook-form'
import PhoneInput from "../../../../../common/Inputs/InputFields/PhoneInput/PhoneInput"
import DropDownSearchInput from "../../../../../common/Inputs/InputFields/DropDownSearchInput/DropDownSearchInput"
import UserNameInput from "../../../../../common/Inputs/InputFields/NameInput/NameInput"
import { COMPANIES_LIST, JOBS_LIST, STORES_LIST } from "../../../../../../assets/AuthPage/AuthPage-data"
import { IUserRepository } from "../../../../../../../../api/src/types/DB-types"
import DateInput from "../../../../../common/Inputs/InputFields/DateInput/DateInput"
import FormStatusButton, { FormStatusButOptions } from "../common/FormStatusButton/FormStatusButton"
import FormSubmitButton from "../common/FormSubmitButton/FormSubmitButton"
import GenderSelectButton from "./GenderSelectButton/GenderSelectButton"
import { GENDER_LIST } from "../../../../../../assets/common/Common-data"
import { ISelectDropDownOptionListElem } from "../../../../../common/SelectDropDown/SelectDropDown"
import { getDateInShortString } from "../../../../../../utils/getTime"
import { ICONS } from "../../../../../../assets/common/Icons-data"



type IUserInfoEditForm = Omit<ISignUp, 'avatar'> & {
	company?: string;
	birthday?: number;
}
type UserInfoEditCardProps = {
	userInfo: IUserRepository;
}
const UserInfoEditCard = ({ userInfo }: UserInfoEditCardProps) => {
	// console.log('UserInfoEditCard form has been updated')

	const [statusState, setStatusState] = useState<FormStatusButOptions>('ok')
	const [genderState, setGenderState] = useState<ISelectDropDownOptionListElem>(GENDER_LIST.find(el => el.id === userInfo?.gender) || null)
	const inputPhoneRef = useRef<HTMLInputElement>(null)
	const inputBirthdayRef = useRef<HTMLInputElement>(null)
	const defaultValues: IUserInfoEditForm = {
		store: '',
		lastName: '',
		firstName: '',
		middleName: '',
		job: '',
		company: '',
		phone: '',
		gender: null,
		birthday: null,
	}
	const preloadValues = {
		...userInfo,
		company: 'Стройпродукт', //! Change
		phone: userInfo?.phone.slice(4),
		birthday: getDateInShortString(userInfo?.birthday),
	}


	const {
		register,
		handleSubmit,
		resetField,
		watch,
		setError,
		setValue,
		formState: { errors, dirtyFields, isDirty },
	} = useForm<IUserInfoEditForm>({
		mode: 'onChange',
		reValidateMode: "onChange",
		defaultValues,
	})

	const commonProps = {
		register,
		errors,
		reset: resetField,
		withCopyBut: true,
		isEmptyIcon: true,
		cleanerState: true,
	}
	const dropDownSearchInputProps = {
		...commonProps,
		setValue,
		setError,
		watch,
	}

	const changeGender = (state: ISelectDropDownOptionListElem) => {
		setGenderState(state)
	}

	const formHasBeenUpdated = () => {
		setStatusState('ok')
	}

	const onSubmit: SubmitHandler<IUserInfoEditForm> = async (data) => {
		if (!isDirty && (!genderState?.id || genderState.id === preloadValues.gender)) {
			return
		}

		data.phone = '+375' + data.phone
		let dirtyData = {}

		for (const name in dirtyFields) {
			if (data[name] === preloadValues[name]) {
				return
			}
			dirtyData[name] = data[name]
		}

		if (genderState?.id && genderState.id !== preloadValues.gender) {
			dirtyData['gender'] = genderState.id
		}
		if (!Object.keys(dirtyData)[0]) {
			return
		}

		console.log(dirtyData)
		formHasBeenUpdated()
	}

	//* Values setting
	useEffect(() => {
		 for (const name in defaultValues) {
			setValue(name as keyof IUserInfoEditForm, preloadValues[name])
		}
	}, [])

	useLayoutEffect(() => {
		if (isDirty || (genderState?.id && genderState.id !== preloadValues.gender)) {
			setStatusState('undo')
		}
	}, [isDirty, genderState?.id])


	return (
		<form
			className={'user_info_edit-form cont'}
			onSubmit={handleSubmit(onSubmit)}
		>
			<div
				className={'user_info_edit_card-header cont'}
			>
				<div
					className={'user_info_edit_card_status_and_title-cont cont'}
				>
					<FormStatusButton
						state={statusState}
					/>
					<div
						className={'user_info_edit_card-title cont white-card'}
					>
						Личные данные
					</div>
				</div>
				<div
					className={'user_info_edit_card_birth_and_gender-cont cont white-card'}
				>
					<DateInput
						name='birthday'
						inputDateRef={inputBirthdayRef}
						icon={ICONS.birthday}
						cleanerState={Boolean(watch('birthday'))}
						isEmptyIcon={!preloadValues.birthday}
						{ ...commonProps }
					/>
					<GenderSelectButton
						selectedState={genderState}
						onClick={changeGender}
					/>
				</div>
			</div>
			<div
				className={'user_info_edit_card-footer cont'}
			>
				<div
					className={'user_info_edit_card_main_form-card cont white-card'}
				>
					<PhoneInput
						name='phone'
						inputPhoneRef={inputPhoneRef}
						{ ...commonProps }
					/>
					<DropDownSearchInput
						LIST={STORES_LIST}
						name='store'
						placeholder='Точка'
						icon={ICONS.store}
						{ ...dropDownSearchInputProps }
					/>
					<UserNameInput
						name='lastName'
						placeholder='Фамилия'
						inputMaxLength={25}
						inputType='name'
						icon={ICONS.name}
						{ ...commonProps }
					/>
					<UserNameInput
						name='firstName'
						placeholder='Имя'
						inputType='name'
						icon={ICONS.name}
						{ ...commonProps }
					/>
					<UserNameInput
						name='middleName'
						placeholder='Отчество'
						inputType='name'
						icon={ICONS.name}
						{ ...commonProps }
					/>
				</div>
				<div
					className={'user_info_edit_card_footer_right-column cont'}
				>
					<div
						className={'user_info_edit_card_company-card cont white-card'}
					>
						<DropDownSearchInput
							LIST={COMPANIES_LIST}
							name='company'
							placeholder='Организация'
							icon={ICONS.company}
							{ ...dropDownSearchInputProps }
						/>
						<DropDownSearchInput
							LIST={JOBS_LIST}
							name='job'
							placeholder='Должность'
							icon={ICONS.job}
							{ ...dropDownSearchInputProps }
						/>
					</div>
					<div
						className={'user_info_edit_card_footer_right_column-footer cont'}
					>
						<div
							className={'user_info_edit_card_passport-card cont white-card'}
						>
							<button
								className={'user_info_edit_card_passport-but cont'}
								type={'button'}
							>
								{ICONS.passport}
								<span>
								    Паспортные<br/> данные
								</span>
							</button>
						</div>
						<FormSubmitButton />
					</div>
				</div>
			</div>
		</form>
	)
}

export default UserInfoEditCard