import React, { useState } from 'react'
import ToolTip from "../../ToolTip/ToolTip"
import { useUserInfoState } from "../../../../stores/Auth-store"
import UnfoldingCard from "../../../common/UnfoldingCard/UnfoldingCard"
import SubmitBut from "../../../_AuthPage/SubmitBut/SubmitBut"
import { LuLogOut } from "react-icons/lu";
import { FaUserGear, FaUserPen } from "react-icons/fa6"
import UserNameCopyButton from "./UserNameCopyButton/UserNameCopyButton"
import RoundButton from "../../../common/Buttons/RoundButton/RoundButton"
import SwitchUser from "../../../others/SwitchUser/SwitchUser"
import LogOut from "../../../../features/auth/logOut"
import SwapImg from "../../../common/SwapImg/SwapImg"



type UserCardProps = {

}
const UserCard = ({  }: UserCardProps) => {

	const [isFullUserCard, setIsFullUserCard] = useState(false)
	const { userInfoState } = useUserInfoState()


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
						onClick={() => {}}
						toolTip={{
							text: 'Личные данные пользователя'
						}}
					>
						<FaUserPen className={'fa-icon'} />
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
						onClick={() => {}}
						toolTip={{
							text: 'Данные аккаунта'
						}}
					>
						<FaUserGear className={'fa-icon'} />
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
						icon={<LuLogOut className={'fa-icon'} />}
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