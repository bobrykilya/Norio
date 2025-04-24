import React, { useState } from 'react'
import JumpingCard from "../../../common/JumpingCard/JumpingCard"
import { useTopCardState } from "../../../../stores/Utils-store"
import UserInfoEditForm from "./EditForms/UserInfoEditForm/UserInfoEditForm"
import AccountInfoEditForm from "./EditForms/AccountInfoEditForm/AccountInfoEditForm"
import { FormStatusButOptions } from "./EditForms/common/FormStatusButton/FormStatusButton"
import { useJwtInfoListState } from "../../../../stores/Auth-store"
import { ICommonVar } from "../../../../../../common/types/Global-types"
import { showSnackMessage } from "../../../../features/showSnackMessage/showSnackMessage"



export type TopCardFormsProps = {
	statusState: FormStatusButOptions;
	setStatusState: (state: FormStatusButOptions) => void;
}

export const fastSessionTestForDataEditing = (userId: ICommonVar['id']) => {
	const { getJwtInfoState } = useJwtInfoListState.getState()
	if (getJwtInfoState(userId).isFast) {
		showSnackMessage({
			type: "e",
			message: 'Вы не можете редактировать информацию аккаунта и пользователя во время быстрой сессии'
		})
		throw new Error('Forbidden operation of data editing')
	}
}

const TopCard = () => {

	const { topCardState, setTopCardState } = useTopCardState()
	const [statusState, setStatusState] = useState<FormStatusButOptions>('ok')

	const closeTopCard = () => {
		setTopCardState(null)
	}


	return (
		<JumpingCard
			className={'top_card-cover'}
			position={'top'}
			closeHooksParams={{
				conditionsList: [Boolean(topCardState), statusState === 'ok'],
				callback: closeTopCard
			}}
		>
			{
				topCardState === 'userInfo' &&
				<UserInfoEditForm
					statusState={statusState}
					setStatusState={setStatusState}
				/>
			}
			{
				topCardState === 'accountInfo' &&
				<AccountInfoEditForm
					statusState={statusState}
					setStatusState={setStatusState}
				/>
			}
			{/*{*/}
			{/*	topCardState === 'organization' &&*/}
			{/*	<AccountInfoEditForm*/}
			{/*		*/}
			{/*	/>*/}
			{/*}*/}
		</JumpingCard>
	)
}

export default TopCard