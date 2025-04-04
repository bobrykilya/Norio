import React, { useEffect, useRef, useState } from 'react'
import { ISignUp } from "../../../../../../../../common/types/Auth-types"
import { SubmitHandler, useForm } from 'react-hook-form'
import PhoneInput from "../../../../../common/Inputs/InputFields/PhoneInput/PhoneInput"
import DropDownSearchInput from "../../../../../common/Inputs/InputFields/DropDownSearchInput/DropDownSearchInput"
import UserNameInput from "../../../../../common/Inputs/InputFields/NameInput/NameInput"
import { COMPANIES_LIST, JOBS_LIST, STORES_LIST } from "../../../../../../assets/AuthPage/AuthPage-data"
import { HiOutlineHome } from "react-icons/hi"
import { GrUserExpert, GrUserWorker } from "react-icons/gr"
import { MdOutlineWorkOutline } from "react-icons/md"
import { BsPassport } from "react-icons/bs"
import { LiaBirthdayCakeSolid } from "react-icons/lia"
import { IUserRepository } from "../../../../../../../../api/src/types/DB-types"
import DateInput from "../../../../../common/Inputs/InputFields/DateInput/DateInput"
import FormStatusButton, { FormStatusButOptions } from "../common/FormStatusButton/FormStatusButton"
import FormSubmitButton from "../common/FormSubmitButton/FormSubmitButton"
import GenderSelectButton from "./GenderSelectButton/GenderSelectButton"
import { GENDER_LIST } from "../../../../../../assets/common/Common-data"
import { ISelectDropDownOptionListElem } from "../../../../../common/SelectDropDown/SelectDropDown"



type UserInfoEditForm = Omit<ISignUp, 'avatar'> & {
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
	const nameInputIcon = <GrUserExpert className='input_field-icon' />
	const defaultValues = {
		phone: '',
		store: '',
		lastName: '',
		firstName: '',
		middleName: '',
		company: '',
		job: '',
		birthday: null,
		gender: null,
	}
	const preloadValues = {
		company: 'Стройпродукт',
		...userInfo,
		phone: userInfo?.phone.slice(4),
	}


	const {
		register,
		handleSubmit,
		resetField,
		watch,
		setError,
		getValues,
		setValue,
		formState: { errors, dirtyFields, isDirty },
	} = useForm<UserInfoEditForm>({
		mode: 'onChange',
		reValidateMode: "onChange",
		defaultValues: defaultValues,
	})
	// console.log(watch('phone'))

	const commonProps = {
		register: register,
		errors: errors,
		reset: resetField,
		withCopyBut: true,
		cleanerState: true,
		isEmptyIcon: true,
	}
	const dropDownSearchInputProps = {
		...commonProps,
		setValue: setValue,
		setError: setError,
		watch: watch,
	}

	const changeGender = (state: ISelectDropDownOptionListElem) => {
		setGenderState(state)
		inputBirthdayRef.current.focus()
	}

	const formHasBeenUpdated = () => {
		setStatusState('ok')
	}

	const onSubmit: SubmitHandler<UserInfoEditForm> = async (data) => {
		if (!isDirty && (!genderState?.id || genderState.id === preloadValues.gender)) {
			return
		}

		data.phone = '+375' + data.phone
		let dirtyData = {}

		for (let name in dirtyFields) {
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

	useEffect(() => {
		 for (let name in defaultValues) {
			// @ts-ignore
			setValue(name, preloadValues[name])
		}
	}, [])

	useEffect(() => {
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
						name="birthday"
						inputRef={inputBirthdayRef}
						icon={<LiaBirthdayCakeSolid className="input_field-icon"/>}
						{...commonProps}
						cleanerState={Boolean(watch('birthday'))}
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
						inputRef={inputPhoneRef}
						getValues={getValues}
						setValue={setValue}
						{ ...commonProps }
					/>
					<DropDownSearchInput
						LIST={STORES_LIST}
						name='store'
						placeholder='Точка'
						icon={<HiOutlineHome className='input_field-icon'/>}
						{ ...dropDownSearchInputProps }
					/>
					<UserNameInput
						name='lastName'
						placeholder='Фамилия'
						inputMaxLength={25}
						inputType='name'
						icon={nameInputIcon}
						{ ...commonProps }
					/>
					<UserNameInput
						name='firstName'
						placeholder='Имя'
						inputType='name'
						icon={nameInputIcon}
						{ ...commonProps }
					/>
					<UserNameInput
						name='middleName'
						placeholder='Отчество'
						inputType='name'
						icon={nameInputIcon}
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
							icon={<MdOutlineWorkOutline className='input_field-icon'/>}
							{ ...dropDownSearchInputProps }
						/>
						<DropDownSearchInput
							LIST={JOBS_LIST}
							name='job'
							placeholder='Должность'
							icon={<GrUserWorker className='input_field-icon'/>}
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
								<BsPassport className={'fa-icon'} />
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