import React from 'react'
import JumpingCard from "../../../common/JumpingCard/JumpingCard"
import { useTopCardState } from "../../../../stores/Utils-store"
import { useUserInfoState } from "../../../../stores/User-store"
import UserInfoEditForm from "./EditForms/UserInfoEditForm/UserInfoEditForm"
import AccountInfoEditForm from "./EditForms/AccountInfoEditForm/AccountInfoEditForm"



type TopCardProps = {

}
const TopCard = ({  }: TopCardProps) => {

	const { topCardState, setTopCardState } = useTopCardState()
	const userInfoState = useUserInfoState(s => s.userInfoState)

	const closeTopCard = () => {
		setTopCardState(null)
	}


	return (
		<JumpingCard
			className={'top_card-cover'}
			position={'top'}
			closeHooksParams={{
				conditionsList: [Boolean(topCardState)],
				callback: closeTopCard
			}}
		>
			{
				topCardState === 'userInfo' &&
				<UserInfoEditForm
					userInfo={userInfoState}
				/>
			}
			{
				topCardState === 'accountInfo' &&
				<AccountInfoEditForm

				/>
			}
			{
				topCardState === 'organization' &&
				<AccountInfoEditForm

				/>
			}
		</JumpingCard>
	)
}

export default TopCard