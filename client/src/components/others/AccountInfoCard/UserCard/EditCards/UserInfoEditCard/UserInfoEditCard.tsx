import React, { useEffect, useRef } from 'react'
import RoundButton from "../../../../../common/Buttons/RoundButton/RoundButton"
// import { LiaBirthdayCakeSolid } from "react-icons/lia"
import { IoIosSave } from "react-icons/io"
import { BiBadgeCheck } from "react-icons/bi"
import { ISignUp } from "../../../../../../../../common/types/Auth-types"
import { SubmitHandler, useForm } from 'react-hook-form'
import PhoneInput from "../../../../../common/Inputs/InputFields/PhoneInput/PhoneInput"
import DropDownSearchInput from "../../../../../common/Inputs/InputFields/DropDownSearchInput/DropDownSearchInput"
import UserNameInput from "../../../../../common/Inputs/InputFields/NameInput/NameInput"
import { COMPANIES_LIST, JOBS_LIST, STORES_LIST } from "../../../../../../assets/AuthPage/AuthPage-data"
import { HiOutlineHome } from "react-icons/hi"
import { GrUserExpert, GrUserWorker } from "react-icons/gr"
import { MdOutlineWorkOutline } from "react-icons/md"
import { BsPassport } from "react-icons/bs";
import { IUserRepository } from "../../../../../../../../api/src/types/DB-types"


// const diff = (a1, a2, key) => a1.filter(o1 => !a2.some(o2 => o1[key] === o2[key]))

type UserInfoEditForm = Omit<ISignUp, 'avatar'> & {
	company?: string;
	birthday?: number;
}
type UserInfoEditCardProps = {
	userInfo: IUserRepository;
}
const UserInfoEditCard = ({ userInfo }: UserInfoEditCardProps) => {

	const inputRefPhone = useRef<HTMLInputElement>(null)
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
	}
	const preloadValues = {
		company: 'Стройпродукт',
		...userInfo,
		phone: userInfo?.phone.slice(4)
	}


	const {
		register,
		handleSubmit,
		resetField,
		watch,
		setError,
		setValue,
		formState: { errors, dirtyFields, isDirty },
	} = useForm<UserInfoEditForm>({
		mode: 'onChange',
		reValidateMode: "onChange",
		defaultValues: defaultValues,
	})

	const onSubmit: SubmitHandler<UserInfoEditForm> = async (data) => {
		if (!isDirty) {
			return
		}

		data.phone = '+375' + data.phone
		let dirtyData = {}

		Object.keys(dirtyFields).map(name => {
			if (data[name] === preloadValues[name]) {
				return
			}
			dirtyData[name] = data[name]
		})
		console.log(dirtyData)
	}

	useEffect(() => {
		Object.keys(defaultValues).map(name => {
			// @ts-ignore
			setValue(name, preloadValues[name])
		})
	}, [])


	return (
		<form
			className={'user_info_edit-form cont'}
			onSubmit={handleSubmit(onSubmit)}
		>
			<div
				className={'user_info_edit_card-header cont'}
			>
				<RoundButton
					className={'user_info_edit_card_status-but white-card'}
					onClick={() => {}}
				>
					<BiBadgeCheck className={'fa-icon'} />
				</RoundButton>
				<div
					className={'user_info_edit_card-title cont white-card'}
				>
					Личные данные пользователя
				</div>
				<div
					className={'user_info_edit_card_birth-card cont white-card'}
				>
					Дата рождения
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
						register={register}
						error={errors?.phone}
						reset={resetField}
						inputRef={inputRefPhone}
						withCopyBut={true}
						cleanerState={true}
					/>
					<DropDownSearchInput
						LIST={STORES_LIST}
						name='store'
						placeholder='Точка'
						icon={<HiOutlineHome className='input_field-icon'/>}
						register={register}
						error={errors?.store}
						reset={resetField}
						setValue={setValue}
						setError={setError}
						watch={watch}
						withCopyBut={true}
						cleanerState={true}
					/>
					<UserNameInput
						name='lastName'
						placeholder='Фамилия'
						icon={nameInputIcon}
						inputType='name'
						register={register}
						error={errors?.lastName}
						reset={resetField}
						inputMaxLength={25}
						withCopyBut={true}
						cleanerState={true}
					/>
					<UserNameInput
						name='firstName'
						placeholder='Имя'
						icon={nameInputIcon}
						inputType='name'
						register={register}
						error={errors?.firstName}
						reset={resetField}
						withCopyBut={true}
						cleanerState={true}
					/>
					<UserNameInput
						name='middleName'
						placeholder='Отчество'
						icon={nameInputIcon}
						inputType='name'
						register={register}
						error={errors?.middleName}
						reset={resetField}
						withCopyBut={true}
						cleanerState={true}
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
							register={register}
							error={errors?.company}
							reset={resetField}
							setValue={setValue}
							setError={setError}
							watch={watch}
							withCopyBut={true}
							cleanerState={true}
						/>
						<DropDownSearchInput
							LIST={JOBS_LIST}
							name='job'
							placeholder='Должность'
							icon={<GrUserWorker className='input_field-icon'/>}
							register={register}
							error={errors?.job}
							reset={resetField}
							setValue={setValue}
							setError={setError}
							watch={watch}
							withCopyBut={true}
							cleanerState={true}
						/>
					</div>
					<div
						className={'user_info_edit_card_footer_right_column-footer cont'}
					>
						<div
							className={'user_info_edit_card_passport-card cont white-card'}
						>
							<button
								className={'cont'}
								type={'button'}
							>
								<BsPassport className={'fa-icon'} />
								<span>
								    Паспортные<br/> данные
								</span>
							</button>
						</div>
						<RoundButton
							className={'user_info_edit_card_submit-but'}
							isSubmitBut={true}
						>
							<IoIosSave className={'fa-icon'} />
						</RoundButton>
					</div>
				</div>
			</div>
		</form>
	)
}

export default UserInfoEditCard