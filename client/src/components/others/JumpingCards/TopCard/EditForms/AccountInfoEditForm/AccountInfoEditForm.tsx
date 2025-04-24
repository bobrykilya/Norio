import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { fastSessionTestForDataEditing, TopCardFormsProps } from "../../TopCard"
import { useUserInfoState } from "../../../../../../stores/User-store"
import { SubmitHandler, useForm } from 'react-hook-form'
import FormStatusButton from "../common/FormStatusButton/FormStatusButton"
import PasswordInput from "../../../../../common/Inputs/InputFields/PasswordInput/PasswordInput"
import FormSubmitButton from "../common/FormSubmitButton/FormSubmitButton"
import { ICONS } from "../../../../../../assets/common/Icons-data"
import { ICommonVar } from "../../../../../../../../common/types/Global-types"
import { IAccountInfoEditReq } from "../../../../../../../../common/types/User-types"
import NameInput from "../../../../../common/Inputs/InputFields/NameInput/NameInput"
import { AVATARS_LIST } from "../../../../../../assets/AuthPage/AuthPage-data"
import AvatarButton from "../../../../../_AuthPage/AvatarListCard/AvatarButton"
import { showSnackMessage } from "../../../../../../features/showSnackMessage/showSnackMessage"
import { useMatchConfirmPassword } from "../../../../../../hooks/useMatchConfirmPassword"
import UserService from "../../../../../../services/User-service"
import { IUserRepository } from "../../../../../../../../api/src/types/DB-types"



const updateBrowsersPasswordCredential = async (data: IAccountInfoEditReq, userInfo: IUserRepository) => {

	if ("PasswordCredential" in window) {
		let credential = new PasswordCredential({
			id: data.username || userInfo.username,
			password: data.password || '-',
			name: `${userInfo.lastName} ${userInfo.firstName}`
		})

		try {
			await navigator.credentials.store(credential)
		} catch (err) {
		}
	}
}

export type IAccountInfoEditForm = {
	username: ICommonVar['username'],
	email?: ICommonVar['email'],
	prevPassword?: ICommonVar['password'],
	newPassword?: ICommonVar['password'],
	confirmNewPassword?: ICommonVar['password'],
}

const AccountInfoEditForm = ({ statusState, setStatusState }: TopCardFormsProps) => {

	const { userInfoState: userInfo, setUserInfoState } = useUserInfoState()
	const defaultAvatar = userInfo?.avatar
	const [avatar, setAvatar] = useState<ICommonVar['avatar']>(defaultAvatar)
	const inputRefPrevPassword = useRef<HTMLInputElement>(null)
	const defaultValues: IAccountInfoEditForm = {
		username: '',
		email: '',
		prevPassword: '',
		newPassword: '',
		confirmNewPassword: '',
	}
	const preloadValues: IAccountInfoEditForm = {
		...defaultValues,
		username: userInfo?.username,
		email: userInfo?.email || '',
	}


	const {
		register,
		handleSubmit,
		resetField: reset,
		watch,
		getValues,
		setError,
		setValue,
		formState: { errors, isDirty, touchedFields },
	} = useForm<IAccountInfoEditForm>({
		mode: 'onChange',
		reValidateMode: 'onChange',
		defaultValues
	})

	const commonProps = {
		register,
		errors,
		reset,
		watch,
		setValue,
	}

	const nameInputProps = {
		...commonProps,
		withCopyBut: true,
		withEmptyIcon: true,
		undoFieldButParams: {
			onClick: handleClickUndoFieldBut,
			preloadValues
		}
	}

	const resetPasswords = () => {
		reset('prevPassword')
		reset('newPassword')
		reset('confirmNewPassword')
	}
	const resetEditFields = () => {
		reset('username')
		reset('email')
	}

	const handleClickUndoBut = () => {
		setAvatar(defaultAvatar)
		resetEditFields()
		preloadFormValuesSetting()
	}
	function handleClickUndoFieldBut(name: string) {
		const typedName = name as keyof IAccountInfoEditForm
		reset(typedName)
		setValue(typedName, preloadValues[typedName])
	}

	const updateFormData = async (data: IAccountInfoEditReq) => {
		// console.log(data)

		setStatusState('loading')
		if (await UserService.editAccountInfo(data)) {

			if (data.username || data.password) {
				//* Username or Password saving for browser
				await updateBrowsersPasswordCredential(data, userInfo)
			} else if (!data.username) {
				//* userInfoState updating if username hasn't been updated
				// (otherwise userState will be update with AuthCommon.loginUser)
				setUserInfoState({
					...userInfo,
					...data as IUserRepository
				})
			}
			
			showSnackMessage({
				type: "s",
				message: 'Изменения сохранены',
			})
			setStatusState('ok')
			resetPasswords()
		} else {
			if (Object.keys(data).length === 1 && data.newPassword) {
				setStatusState('ok')
			} else {
				setStatusState('undo')
			}
		}
	}

	const handleSaveForm: SubmitHandler<IAccountInfoEditForm> = async () => {
		fastSessionTestForDataEditing(userInfo.userId)

		const dirtyData = getDirtyData() as IAccountInfoEditReq
		if (!Object.keys(dirtyData)[0] || (Object.keys(dirtyData).length === 1 && dirtyData.prevPassword)) {
			return
		} else if (dirtyData.newPassword && !dirtyData.prevPassword) {
			inputRefPrevPassword.current.focus()
			return
		}

		if (dirtyData.prevPassword) {
			if (await UserService.checkPassword(dirtyData.prevPassword)) {
				dirtyData.password = dirtyData.newPassword
				delete dirtyData.prevPassword
				delete dirtyData.newPassword
				delete dirtyData.confirmNewPassword

				await updateFormData(dirtyData)
			}
		} else {
			await updateFormData(dirtyData)
		}
	}

	const getDirtyData = (booleanRes?: boolean) => {
		if (!isDirty && avatar === defaultAvatar && !Object.keys(touchedFields)[0]) {
			return booleanRes ? false : {}
		}

		const dirtyData: IAccountInfoEditReq = {}

		if (avatar !== defaultAvatar) {
			if (booleanRes) {
				return true
			}
			dirtyData.avatar = avatar
		}

		for (const key of Object.keys(defaultValues)) {
			const val = getValues(key as keyof IAccountInfoEditForm)
			if (val !== undefined && val !== preloadValues[key]) {
				if (booleanRes) {
					if (!key.includes('Password')) {
						return true
					}
				}
				dirtyData[key] = val
			}
		}


		// console.log('dirtyData: ', dirtyData)
		return booleanRes ? false : dirtyData
	}

	const preloadFormValuesSetting = () => {
		for (const name in preloadValues) {
			if (name.includes('Password')) {
				continue
			}
			setValue(name as keyof IAccountInfoEditForm, preloadValues[name])
		}
	}


	//* confirmPassword's error react validation
	useMatchConfirmPassword({
		passVal: 'newPassword',
		confirmVal: 'confirmNewPassword',
		watch,
		setError
	})

	useEffect(() => {
		preloadFormValuesSetting()
	}, [])

	//* Update form inputs and selects watching
	useLayoutEffect(() => {
		if (getDirtyData(true)) {
			if (statusState !== 'undo') {
				setStatusState('undo')
			}
		} else {
			if (statusState !== 'ok') {
				setStatusState('ok')
			}
		}
	}, [...Object.keys(defaultValues).map(key => watch(key as keyof IAccountInfoEditForm))])


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
							{ ...nameInputProps }
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
						{ ...commonProps }
					/>
					<PasswordInput
						name={'newPassword'}
						placeholder={'Новый пароль'}
						inputType={'sign_up'}
						autoComplete={'new-password'}
						required={false}
						{ ...commonProps }
					/>
					<PasswordInput
						name={'confirmNewPassword'}
						placeholder={'Повтор нового пароля'}
						inputType={'confirm'}
						autoComplete={'new-password'}
						matchWithName={'newPassword'}
						required={false}
						{ ...commonProps }
					/>
				</div>
			</div>
			<div
			    className={'account_info_edit_form-footer cont'}
			>
				<AvatarButton
					LIST={AVATARS_LIST}
					currentAvatar={avatar}
					setAvatar={setAvatar}
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
						autoFocus={!preloadValues.email}
						{ ...nameInputProps }
					/>
				</div>
				<FormSubmitButton />
			</div>
		</form>
	)
}

export default AccountInfoEditForm