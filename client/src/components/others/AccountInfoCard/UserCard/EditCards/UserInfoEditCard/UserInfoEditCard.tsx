import React, { useRef } from 'react'
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



type UserInfoEditForm = Omit<ISignUp, 'avatar'> & {
	company: string;
	birthday: number;
}
type UserInfoEditCardProps = {

}
const UserInfoEditCard = ({  }: UserInfoEditCardProps) => {

	const inputRefPhone = useRef<HTMLInputElement>(null)
	const nameInputIcon = <GrUserExpert className='input_field-icon' />

	const {
		register,
		handleSubmit,
		resetField,
		watch,
		setError,
		setValue,
		formState: { errors }
	} = useForm<UserInfoEditForm>({
		mode: 'onChange',
		reValidateMode: "onChange",
		defaultValues: {
			phone: '295697981',
			store: 'Офис',
			lastName: 'Бобрик',
			firstName: 'Илья',
			middleName: 'Юрьевич',
			company: 'Стройпродукт',
			job: 'Управляющий',
			birthday: 21142,
		}
	})

	// setValue('job', 'Управляющий')

	const onSubmit: SubmitHandler<UserInfoEditForm> = async (data) => {
		data.phone = '+375' + data.phone
		console.log(data)
	}

	// useEffect(() => {
		// inputRefPhone.current.focus()
	// }, [])


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
					/>
					<UserNameInput
						name='firstName'
						placeholder='Имя'
						icon={nameInputIcon}
						inputType='name'
						register={register}
						error={errors?.firstName}
						reset={resetField}
					/>
					<UserNameInput
						name='middleName'
						placeholder='Отчество'
						icon={nameInputIcon}
						inputType='name'
						register={register}
						error={errors?.middleName}
						reset={resetField}
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
							error={errors?.job}
							reset={resetField}
							setValue={setValue}
							setError={setError}
							watch={watch}
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