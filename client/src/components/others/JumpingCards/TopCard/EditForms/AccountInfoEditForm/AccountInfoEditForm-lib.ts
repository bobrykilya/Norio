import { useEffect, useLayoutEffect, useRef, useState } from 'react'

import { SubmitHandler, useForm } from 'react-hook-form'

import { fastSessionTestForDataEditing, TopCardFormsProps } from '../../TopCard-lib'
import { IAccountInfoEditForm } from './AccountInfoEditForm'
import { IUserRepository } from '@api/src/types/DB-types'
import AuthCommon from '@features/auth/authCommon'
import { showSnackMessage } from '@features/showSnackMessage/showSnackMessage'
import { useMatchConfirmPassword } from '@hooks/useMatchConfirmPassword'
import UserService from '@services/User-service'
import { IAccountInfoEditReq } from '@shared/types/User-types'
import { useUserInfoState } from '@stores/User-store'
import { useAvatarState } from '@stores/Utils-store'
import { createName } from '@utils/createString'



export const updateBrowsersPasswordCredential = async (data: IAccountInfoEditReq, userInfo: IUserRepository) => {

	if ('PasswordCredential' in window) {
		let credential = new PasswordCredential({
			id: data.username || userInfo.username,
			password: data.password || '-',
			name: createName(userInfo, ['lastName', 'firstName']),
		})

		try {
			await navigator.credentials.store(credential)
		} catch (err) {
		}
	}
}

export const useAccountInfoEditForm = ({ statusState, setStatusState }: TopCardFormsProps) => {

	const { userInfoState: userInfo } = useUserInfoState()
	const {
		listOfUsedAvatarsState,
		setListOfUsedAvatarsState,
		selectedAvatarState: avatar,
		setSelectedAvatarState: setAvatar,
	} = useAvatarState()
	const defaultAvatar = userInfo?.avatar
	const [errorAvatar, setErrorAvatar] = useState<{ message: string } | null>(null)
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

	const checkUsedAvatars = async () => {
		if (!listOfUsedAvatarsState || !listOfUsedAvatarsState[0]) {
			setListOfUsedAvatarsState((await UserService.getUsedAvatarsList()).avatarsList)
		}
	}


	const {
		register,
		handleSubmit,
		reset: resetForm,
		resetField: reset,
		watch,
		getValues,
		setError,
		setValue,
		setFocus,
		formState: { errors, isDirty, touchedFields },
	} = useForm<IAccountInfoEditForm>({
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
	}

	const nameInputProps = {
		...commonProps,
		withCopyBut: true,
		withEmptyIcon: true,
		undoFieldButParams: {
			onClick: handleClickUndoFieldBut,
			preloadValues,
		},
	}

	const resetPasswords = () => {
		reset('prevPassword')
		reset('newPassword')
		reset('confirmNewPassword')
	}
	const resetEditFields = () => {
		resetForm()
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

			if (data.username || data.newPassword) {
				//* Username or Password saving for browser
				await updateBrowsersPasswordCredential(data, userInfo)
			} else if (!data.username) {
				//* userInfoState updating if username hasn't been updated
				// (otherwise userState will be update with AuthCommon.loginUser)
				AuthCommon.updateUser({ userId: userInfo.userId, data })
			}

			showSnackMessage({
				type: 's',
				message: 'Изменения сохранены',
			})
			setStatusState('ok')
			resetPasswords()
		} else {
			setStatusState('undo')
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
		} else if (dirtyData.newPassword) {
			if (dirtyData.newPassword === dirtyData.prevPassword) {
				showSnackMessage({
					type: 'e',
					message: 'Новый пароль не должен совпадать с предыдущим',
				})
				return
			}
			delete dirtyData.confirmNewPassword
		}


		await updateFormData(dirtyData)
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
					return true
				}
				dirtyData[key] = val
			}
		}


		// console.log('dirtyData: ', dirtyData)
		return booleanRes ? false : dirtyData
	}

	const preloadFormValuesSetting = () => {
		for (const name in preloadValues) {
			setValue(name as keyof IAccountInfoEditForm, preloadValues[name])
		}
		setAvatar(defaultAvatar)
	}


	//* confirmPassword's error react validation
	useMatchConfirmPassword({
		passVal: 'newPassword',
		confirmVal: 'confirmNewPassword',
		watch,
		setError,
	})

	useEffect(() => {
		preloadFormValuesSetting()
		checkUsedAvatars()
		if (!preloadValues.email) {
			setFocus('email')
		}
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

	return {
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
	}
}