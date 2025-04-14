import React, { useState } from 'react'
import ToolTip from "../../ToolTip/ToolTip"
import UnfoldingCard from "../../../common/UnfoldingCard/UnfoldingCard"
import SubmitBut from "../../../_AuthPage/SubmitBut/SubmitBut"
import UserNameCopyButton from "./UserNameCopyButton/UserNameCopyButton"
import RoundButton from "../../../common/Buttons/RoundButton/RoundButton"
import SwitchUser from "../../../others/SwitchUser/SwitchUser"
import LogOut from "../../../../features/auth/logOut"
import SwapImg from "../../../common/SwapImg/SwapImg"
import { useTopCardState } from "../../../../stores/Utils-store"
import { ICONS } from "../../../../assets/common/Icons-data"
import { useUserInfoState } from "../../../../stores/User-store"



type UserCardProps = {

}
const UserCard = ({  }: UserCardProps) => {

	const [isFullUserCard, setIsFullUserCard] = useState(false)
	const { userInfoState } = useUserInfoState()
	const { setTopCardState } = useTopCardState()


	const toggleUserCard = () => {
		setIsFullUserCard(prev => !prev)
	}


	return (
		<div
			className={'user_card-frame cont'}
		>
			<UnfoldingCard
				isFullCard={isFullUserCard}
				closeCard={toggleUserCard}
			>
				<div
				    className={'account_change_buts-cont cont'}
				>
					<RoundButton
						className={'left clear-but'}
						onClick={() => setTopCardState('userInfo')}
						toolTip={{
							text: 'Личные данные пользователя'
						}}
					>
						{ICONS.userEdit}
					</RoundButton>
					<button
						className="account-but cont"
						onClick={toggleUserCard}
						tabIndex={-1}
					>
						<div
							className={'account_img-cont'}
						>
							<SwapImg
								path={`/avatars/${userInfoState?.avatar}.jpg`}
							/>
						</div>
						<ToolTip
							text={`${isFullUserCard ? 'Закрыть' : 'Открыть'} карточку пользователя`}
							position={`${isFullUserCard ? 'bottom' : 'bottom_left'}`}
						/>
					</button>
					<RoundButton
						className={'right clear-but'}
						onClick={() => setTopCardState('user')}
						toolTip={{
							text: 'Данные аккаунта'
						}}
					>
						{ICONS.accountEdit}
					</RoundButton>
				</div>
				<div
				    className={'unfolding_card-only_full cont'}
				>
					<UserNameCopyButton
						userInfoState={userInfoState}
					/>
					<SwitchUser
						currentUser={userInfoState.username}
						disabled={!isFullUserCard}
					/>
				    <SubmitBut
						icon={ICONS.logout}
						onClick={LogOut.currentUserLogOut}
						useOnClick={true}
						toolTip={{
							text: 'Выйти из аккаунта пользователя',
							position: 'bottom'
						}}
					/>
				</div>
			</UnfoldingCard>
		</div>
	)
}

export default UserCard