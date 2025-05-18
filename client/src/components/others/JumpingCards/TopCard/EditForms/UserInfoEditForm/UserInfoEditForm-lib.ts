import { useEffect, useLayoutEffect, useState } from 'react'

import { SubmitHandler, useForm } from 'react-hook-form'

import { fastSessionTestForDataEditing, TopCardFormsProps } from '../../TopCard-lib'
import { IUserInfoEditForm } from './UserInfoEditForm'
import { GENDER_LIST } from '@/assets/common/Common-data'
import { IUserRepository } from '@api/src/types/DB-types'
import { ISelectDropDownOptionListElem } from '@common/SelectDropDown/SelectDropDown'
import AuthCommon from '@features/auth/authCommon'
import { showSnackMessage } from '@features/showSnackMessage/showSnackMessage'
import UserService from '@services/User-service'
import { ICommonVar } from '@shared/types/Global-types'
import { IUserInfoEditReq } from '@shared/types/User-types'
import { useUserInfoState } from '@stores/User-store'
import { getDateInSecondsFromRussianDate, getDateInShortString } from '@utils/getTime'



export const useUserInfoEditForm = ({ statusState, setStatusState }: TopCardFormsProps) => {

	// const [isPassportInfoOpened, setIsPassportInfoOpened] = useState(false)
	const { userInfoState: userInfo } = useUserInfoState()
	const defaultGender = GENDER_LIST.find(el => el.id === userInfo?.gender) || null
	const [genderState, setGenderState] = useState<ISelectDropDownOptionListElem>(defaultGender)
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
		setFocus,
		formState: { errors, isDirty, touchedFields },
	} = useForm<IUserInfoEditForm>({
		mode: 'onChange',
		reValidateMode: 'onChange',
		defaultValues,
	})
	// console.log(watch('lastName'))

	const commonProps = {
		register,
		errors,
		reset,
		watch,
		setValue,
		withCopyBut: true,
		withEmptyIcon: true,
		undoFieldButParams: {
			onClick: handleClickUndoFieldBut,
			preloadValues,
		},
	}
	const dropDownSearchInputProps = {
		...commonProps,
		setError,
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

	const updateFormData = async (data: IUserInfoEditReq) => {
		setStatusState('loading')
		if (await UserService.editUserInfo(data)) {
			AuthCommon.updateUser({
				userId: userInfo.userId,
				data: data as Partial<IUserRepository>,
			})

			showSnackMessage({
				type: 's',
				message: 'Изменения сохранены',
			})
			setStatusState('ok')
		} else {
			setStatusState('undo')
		}
	}

	const handleSaveForm: SubmitHandler<IUserInfoEditForm> = async (data) => {
		fastSessionTestForDataEditing(userInfo.userId)

		const dirtyData = getDirtyData() as IUserInfoEditReq
		if (!Object.keys(dirtyData)[0]) {
			return
		}

		//* 'birthday' converting from string to number
		if (dirtyData.birthday || dirtyData.birthday === '') {
			dirtyData.birthday = getDateInSecondsFromRussianDate(data.birthday)
		}

		// console.log('save: ', dirtyData)
		setStatusState('loading')
		await updateFormData(dirtyData)
	}

	const getDirtyData = (booleanRes?: boolean) => {
		if (!isDirty && genderState?.id === defaultGender?.id && !Object.keys(touchedFields)[0]) {
			return booleanRes ? false : {}
		}

		const dirtyData: IUserInfoEditReq = {}

		if (genderState?.id !== defaultGender?.id) {
			if (booleanRes) {
				return true
			}
			dirtyData.gender = genderState?.id as ICommonVar['gender']
		}

		for (const key of Object.keys(defaultValues)) {
			const val = getValues(key as keyof IUserInfoEditForm)
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
		for (const name in defaultValues) {
			setValue(name as keyof IUserInfoEditForm, preloadValues[name])
		}
	}


	useEffect(() => {
		preloadFormValuesSetting()
		if (!preloadValues.birthday) {
			setFocus('birthday')
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
	}, [...Object.keys(defaultValues).map(key => watch(key as keyof IUserInfoEditForm)), genderState?.id])

	return {
		handleSubmit,
		handleSaveForm,
		handleClickUndoBut,
		commonProps,
		dropDownSearchInputProps,
		genderState,
		setGenderState,
	}
}