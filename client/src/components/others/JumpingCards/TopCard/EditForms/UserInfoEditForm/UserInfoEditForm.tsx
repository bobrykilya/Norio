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
import { IUserInfoEditReq } from "../../../../../../../../common/types/User-types"
import UserService from "../../../../../../services/User-service"
import { useUserInfoState } from "../../../../../../stores/User-store"
import PassportButton from "./PassportButton/PassportButton"



export type IUserInfoEditForm = Omit<ISignUp, 'avatar'> & {
	company?: string;
	birthday?: string;
}
type UserInfoEditFormProps = {
	userInfo: IUserRepository;
}
const UserInfoEditForm = ({ userInfo }: UserInfoEditFormProps) => {
	// console.log('UserInfoEditForm form has been updated')

	const [statusState, setStatusState] = useState<FormStatusButOptions>('ok')
	const [isPassportInfoOpened, setIsPassportInfoOpened] = useState(false)
	const setUserInfoState = useUserInfoState(s => s.setUserInfoState)
	const defaultGender = GENDER_LIST.find(el => el.id === userInfo?.gender) || null
	const [genderState, setGenderState] = useState<ISelectDropDownOptionListElem>(defaultGender)
	const inputPhoneRef = useRef<HTMLInputElement>(null)
	const inputBirthdayRef = useRef<HTMLInputElement>(null)
	const defaultValues: IUserInfoEditForm = {
		birthday: '',
		phone: '',
		store: '',
		lastName: '',
		firstName: '',
		middleName: '',
		company: '',
		job: '',
	}
	const preloadValues: IUserInfoEditForm = {
		...userInfo,
		birthday: getDateInShortString(userInfo?.birthday),
	}


	const {
		register,
		handleSubmit,
		resetField: reset,
		reset: resetForm,
		watch,
		getValues,
		setError,
		setValue,
		formState: { errors, isDirty, touchedFields },
	} = useForm<IUserInfoEditForm>({
		mode: 'onChange',
		reValidateMode: "onChange",
		defaultValues
	})

	const commonProps = {
		register,
		errors,
		reset,
		watch,
		withCopyBut: true,
		withEmptyIcon: true,
		undoFieldButParams: {
			onClick: handleClickUndoFieldBut,
			preloadValues
		}
	}
	const dropDownSearchInputProps = {
		...commonProps,
		setValue,
		setError,
	}

	const formHasBeenUpdated = async (data: IUserInfoEditReq) => {
		if (await UserService.editUserInfo(data)) {
			setUserInfoState({
				...userInfo,
				...data as IUserRepository
			})
			showSnackMessage({
				type: "s",
				message: 'Изменения сохранены'
			})
			setStatusState('ok')
		}
	}
	const handleClickUndoBut = () => {
		setGenderState(defaultGender)
		resetForm()
		preloadFormValuesSetting()
	}
	function handleClickUndoFieldBut(name: string) {
		const typedName = name as keyof IUserInfoEditForm
		reset(typedName)
		setValue(typedName, preloadValues[typedName])
	}

	const handleSaveForm: SubmitHandler<IUserInfoEditForm> = async (data) => {
		const dirtyData = getDirtyData()
		if (!Object.keys(dirtyData)[0]) {
			return
		}

		//* 'birthday' converting from string to number
		if (dirtyData.birthday || dirtyData.birthday === '') {
			dirtyData.birthday = getDateInSecondsFromRussianDate(data.birthday)
		}

		// console.log('save: ', dirtyData)
		await formHasBeenUpdated(dirtyData)
	}

	const getDirtyData = () => {
		if (!isDirty && genderState?.id === defaultGender?.id && !Object.keys(touchedFields)[0]) {
			return {}
		}

		const dirtyData: IUserInfoEditReq = {}

		if (genderState?.id !== defaultGender?.id) {
			dirtyData.gender = genderState?.id as ICommonVar['gender']
		}

		Object.keys(preloadValues).forEach(key => {
			const val = getValues(key as keyof IUserInfoEditForm)
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
			setValue(name as keyof IUserInfoEditForm, preloadValues[name])
		}
	}


	useEffect(() => {
		preloadFormValuesSetting()
	}, [])

	//* Update form inputs and selects watching
	useLayoutEffect(() => {
		if (Object.keys(getDirtyData())[0]) {
			if (statusState !== 'undo') {
				setStatusState('undo')
			}
		} else {
			if (statusState !== 'ok') {
				setStatusState('ok')
			}
		}
	}, [...Object.keys(defaultValues).map(key => watch(key as keyof IUserInfoEditForm)), genderState?.id])


	return (
		<form
			className={'user_info_edit-form cont'}
			onSubmit={handleSubmit(handleSaveForm)}
		>
			<div
				className={'user_info_edit_form-header cont'}
			>
				<div
					className={'user_info_edit_form_status_and_title-cont cont'}
				>
					<FormStatusButton
						state={statusState}
						handleClickUndoBut={handleClickUndoBut}
					/>
					<div
						className={'user_info_edit_form-title cont white-card'}
					>
						Личные данные
					</div>
				</div>
				<div
					className={'user_info_edit_form_birth_and_gender-cont cont white-card'}
				>
					<DateInput
						name='birthday'
						inputDateRef={inputBirthdayRef}
						icon={ICONS.birthday}
						withEmptyIcon={true}
						autoFocus={!preloadValues.birthday}
						{ ...commonProps }
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
					className={'user_info_edit_form_main_form-card cont white-card'}
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
						autoComplete={'home'}
						{ ...dropDownSearchInputProps }
					/>
					<NameInput
						name='lastName'
						placeholder='Фамилия'
						inputMaxLength={25}
						inputType='name'
						icon={ICONS.name}
						autoComplete={'family-name'}
						{ ...commonProps }
					/>
					<NameInput
						name='firstName'
						placeholder='Имя'
						inputType='name'
						icon={ICONS.name}
						autoComplete={'given-name'}
						{ ...commonProps }
					/>
					<NameInput
						name='middleName'
						placeholder='Отчество'
						inputType='name'
						icon={ICONS.name}
						autoComplete={'additional-name'}
						{ ...commonProps }
					/>
				</div>
				<div
					className={'user_info_edit_form_footer_right-column cont'}
				>
					<div
						className={'user_info_edit_form_company-card cont white-card'}
					>
						<DropDownSearchInput
							LIST={COMPANIES_LIST}
							name='company'
							placeholder='Организация'
							icon={ICONS.company}
							autoComplete={'organization'}
							{ ...dropDownSearchInputProps }
						/>
						<DropDownSearchInput
							LIST={JOBS_LIST}
							name='job'
							placeholder='Должность'
							icon={ICONS.job}
							autoComplete={'organization-title'}
							{ ...dropDownSearchInputProps }
						/>
					</div>
					<div
						className={'user_info_edit_form_footer_right_column-footer cont'}
					>
						<div
							className={'user_info_edit_form_passport-card cont white-card'}
						>
							<PassportButton
								state={isPassportInfoOpened}
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