import React from 'react'
import JumpingCard from "../../../common/JumpingCard/JumpingCard"
import { useTopCardState } from "../../../../stores/Utils-store"
import UserInfoEditCard from "../../AccountInfoCard/UserCard/EditCards/UserInfoEditCard/UserInfoEditCard"
import AccountInfoEditCard from "../../AccountInfoCard/UserCard/EditCards/AccountInfoEditCard/AccountInfoEditCard"
import { useUserInfoState } from "../../../../stores/User-store"



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
				<UserInfoEditCard
					userInfo={userInfoState}
				/>
			}
			{
				topCardState === 'user' &&
				<AccountInfoEditCard

				/>
			}
		</JumpingCard>
	)
}

export default TopCard