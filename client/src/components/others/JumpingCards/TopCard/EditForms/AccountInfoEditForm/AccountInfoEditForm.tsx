import React from 'react'
import { TopCardFormsProps } from "../../TopCard"
import { useUserInfoState } from "../../../../../../stores/User-store"
import { getDateInShortString } from "../../../../../../utils/getTime"
import { IUserInfoEditForm } from "../UserInfoEditForm/UserInfoEditForm"
import { SubmitHandler, useForm } from 'react-hook-form'
import FormStatusButton from "../common/FormStatusButton/FormStatusButton"



type IAccountInfoEditForm = {

}

const AccountInfoEditForm = ({ statusState, setStatusState }: TopCardFormsProps) => {

	const { userInfoState: userInfo, setUserInfoState } = useUserInfoState()
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
	} = useForm<IAccountInfoEditForm>({
		mode: 'onChange',
		reValidateMode: "onChange",
		defaultValues
	})

	const handleClickUndoBut = () => {
		resetForm()
		// preloadFormValuesSetting()
	}

	const handleSaveForm: SubmitHandler<IAccountInfoEditForm> = async (data) => {

	}


	return (
		<form
			className={'account_info_edit-form cont'}
			onSubmit={handleSubmit(handleSaveForm)}
		>
			<FormStatusButton
				state={statusState}
				handleClickUndoBut={handleClickUndoBut}
			/>
		</form>
	)
}

export default AccountInfoEditForm