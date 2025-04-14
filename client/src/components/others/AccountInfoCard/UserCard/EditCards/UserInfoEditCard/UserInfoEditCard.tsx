import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ISignUp } from "../../../../../../../../common/types/Auth-types"
import { SubmitHandler, useForm } from 'react-hook-form'
import PhoneInput from "../../../../../common/Inputs/InputFields/PhoneInput/PhoneInput"
import DropDownSearchInput from "../../../../../common/Inputs/InputFields/DropDownSearchInput/DropDownSearchInput"
import NameInput from "../../../../../common/Inputs/InputFields/NameInput/NameInput"
import { COMPANIES_LIST, JOBS_LIST, STORES_LIST } from "../../../../../../assets/AuthPage/AuthPage-data"
import { IUserRepository } from "../../../../../../../../api/src/types/DB-types"
import DateInput from "../../../../../common/Inputs/InputFields/DateInput/DateInput"
import FormStatusButton, { FormStatusButOptions } from "../common/FormStatusButton/FormStatusButton"
import FormSubmitButton from "../common/FormSubmitButton/FormSubmitButton"
import GenderSelectButton from "./GenderSelectButton/GenderSelectButton"
import { GENDER_LIST } from "../../../../../../assets/common/Common-data"
import { ISelectDropDownOptionListElem } from "../../../../../common/SelectDropDown/SelectDropDown"
import { getDateInSecondsFromRussianDate, getDateInShortString } from "../../../../../../utils/getTime"
import { ICONS } from "../../../../../../assets/common/Icons-data"
import { ICommonVar } from "../../../../../../../../common/types/Global-types"
import { showSnackMessage } from "../../../../../../features/showSnackMessage/showSnackMessage"



type IUserInfoEdit = Omit<ISignUp, 'avatar'> & {
	company: string;
	birthday?: string;
}
type UserInfoEditCardProps = {
	userInfo: IUserRepository;
}
type IDirtyData =  Partial<Omit<IUserInfoEdit, 'birthday'>> & {
	birthday?: string | number;
}
const UserInfoEditCard = ({ userInfo }: UserInfoEditCardProps) => {
	// console.log('UserInfoEditCard form has been updated')

	const [statusState, setStatusState] = useState<FormStatusButOptions>('ok')
	const defaultGender = GENDER_LIST.find(el => el.id === userInfo?.gender) || null
	const [genderState, setGenderState] = useState<ISelectDropDownOptionListElem>(defaultGender)
	const inputPhoneRef = useRef<HTMLInputElement>(null)
	const inputBirthdayRef = useRef<HTMLInputElement>(null)
	const defaultValues: IUserInfoEdit = {
		birthday: '',
		phone: '',
		store: '',
		lastName: '',
		firstName: '',
		middleName: '',
		company: '',
		job: '',
	}
	const preloadValues: IUserInfoEdit = {
		...userInfo,
		company: 'Стройпродукт', //! Change
		birthday: getDateInShortString(userInfo?.birthday),
	}
	// console.log(preloadValues.phone)


	const {
		register,
		handleSubmit,
		resetField: reset,
		reset: resetForm,
		watch,
		getValues,
		setError,
		setValue,
		formState: { errors, isDirty },
	} = useForm<IUserInfoEdit>({
		mode: 'onChange',
		reValidateMode: "onChange",
		defaultValues
	})

	const commonProps = {
		register,
		errors,
		reset,
		setValue,
		withCopyBut: true,
		withEmptyIcon: true,
	}
	const dropDownSearchInputProps = {
		...commonProps,
		setError,
		watch,
	}

	const formHasBeenUpdated = () => {
		showSnackMessage({
			type: "s",
			message: 'Изменения сохранены'
		})
	}
	const handleUndoButClick = () => {
		setGenderState(GENDER_LIST.find(el => el.id === userInfo?.gender))
		resetForm()
		preloadFormValuesSetting()
	}

	const onSaveForm: SubmitHandler<IUserInfoEdit> = async (data) => {
		const dirtyData = getDirtyData()
		if (!Object.keys(dirtyData)[0]) {
			return
		}

		if (dirtyData.birthday) {
			dirtyData.birthday = getDateInSecondsFromRussianDate(data.birthday)
		}

		formHasBeenUpdated()
		console.log('save: ', dirtyData)
	}

	const getDirtyData = () => {
		if (!isDirty && genderState?.id === defaultGender?.id) {
			return {}
		}

		const dirtyData: IDirtyData = {}

		if (getValues('birthday') !== preloadValues.birthday) {
			dirtyData.birthday = ''
		}
		if (genderState?.id !== defaultGender?.id) {
			dirtyData.gender = genderState?.id as ICommonVar['gender']
		}

		Object.keys(preloadValues).forEach(key => {
			const val = getValues(key as keyof IUserInfoEdit)
			if (val === undefined || val === preloadValues[key]) {
				return
			}
			dirtyData[key] = val
		})


		// console.log('dirtyData: ', dirtyData)
		return dirtyData
	}

	const preloadFormValuesSetting = () => {
		for (const name in defaultValues) {
			setValue(name as keyof IUserInfoEdit, preloadValues[name])
		}
	}


	useEffect(() => {
		preloadFormValuesSetting()
	}, [])

	//* Update form inputs and selects watching
	useLayoutEffect(() => {
		if (Object.keys(getDirtyData())[0]) {
			if (statusState === 'undo') {
				return
			}
			setStatusState('undo')
		} else {
			if (statusState === 'ok') {
				return
			}
			setStatusState('ok')
		}
	}, [...Object.keys(defaultValues).map(key => watch(key as keyof IUserInfoEdit)), genderState?.id])


	return (
		<form
			className={'user_info_edit-form cont'}
			onSubmit={handleSubmit(onSaveForm)}
		>
			<div
				className={'user_info_edit_card-header cont'}
			>
				<div
					className={'user_info_edit_card_status_and_title-cont cont'}
				>
					<FormStatusButton
						state={statusState}
						handleUndoButClick={handleUndoButClick}
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
						withEmptyIcon={true}
						{ ...commonProps }
					/>
					<GenderSelectButton
						selectedState={genderState}
						onClick={setGenderState}
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
					<NameInput
						name='lastName'
						placeholder='Фамилия'
						inputMaxLength={25}
						inputType='name'
						icon={ICONS.name}
						{ ...commonProps }
					/>
					<NameInput
						name='firstName'
						placeholder='Имя'
						inputType='name'
						icon={ICONS.name}
						{ ...commonProps }
					/>
					<NameInput
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