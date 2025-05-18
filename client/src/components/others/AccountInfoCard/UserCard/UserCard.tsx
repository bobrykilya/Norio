import React, { useState } from 'react'

import UserNameCopyButton from './UserNameCopyButton/UserNameCopyButton'
import { ICONS } from '@assets/common/Icons-data'
import RoundButton from '@common/Buttons/RoundButton/RoundButton'
import SwapImg from '@common/SwapImg/SwapImg'
import UnfoldingCard from '@common/UnfoldingCard/UnfoldingCard'
import SubmitBut from '@components/_AuthPage/SubmitBut/SubmitBut'
import LogOut from '@features/auth/logOut'
import SwitchUser from '@others/SwitchUser/SwitchUser'
import ToolTip from '@others/ToolTip/ToolTip'
import { useUserInfoState } from '@stores/User-store'
import { useJumpingCardsState } from '@stores/Utils-store'
import { getPathToAvatar } from '@utils/createString'



type UserCardProps = {
	fastSessionState?: boolean;
}
const UserCard = ({ fastSessionState }: UserCardProps) => {

	const [isFullUserCard, setIsFullUserCard] = useState(false)
	const { userInfoState } = useUserInfoState()
	const setJumpingCardsState = useJumpingCardsState(s => s.setJumpingCardsState)

	const toggleUserCard = () => {
		setIsFullUserCard(prev => !prev)
	}


	return (
		<div
			className={'user_card-frame cont'}
		>
			<UnfoldingCard
				className={'user-card'}
				closeHooksParams={{
					callback: () => setIsFullUserCard(false),
					conditionsList: [isFullUserCard],
				}}
			>
				<div
					className={'account_change_buts-cont cont'}
				>
					<RoundButton
						className={'left clear-but'}
						onClick={() => setJumpingCardsState('topCard', 'userInfo')}
						toolTip={{
							message: 'Личные данные пользователя',
						}}
					>
						{ICONS.userEdit}
					</RoundButton>
					<button
						className='account-but cont'
						onClick={toggleUserCard}
						tabIndex={-1}
					>
						<div
							className={'account_img-cont'}
						>
							<SwapImg
								path={getPathToAvatar(userInfoState?.avatar)}
							/>
						</div>
						<ToolTip
							message={`${isFullUserCard ? 'Закрыть' : 'Открыть'} карточку пользователя`}
							position={`${isFullUserCard ? 'bottom' : 'bottom_left'}`}
						/>
					</button>
					<RoundButton
						className={'right clear-but'}
						onClick={() => setJumpingCardsState('topCard', 'accountInfo')}
						toolTip={{
							message: 'Данные аккаунта',
						}}
					>
						{ICONS.accountEdit}
					</RoundButton>
				</div>
				<div
					className={'unfolding_card-only_full cont'}
				>
					{
						fastSessionState &&
						<span
							className={'fast_session-info'}
						>
						    -- Быстрая сессия --
						</span>
					}
					<UserNameCopyButton
						userInfoState={userInfoState}
					/>
					<SwitchUser
						currentUserId={userInfoState.userId}
						disabled={!isFullUserCard}
					/>
					<SubmitBut
						icon={ICONS.logout}
						onClick={LogOut.currentUserLogOut}
						useOnClick={true}
						toolTip={{
							message: 'Выйти из аккаунта пользователя',
							position: 'bottom',
						}}
					/>
				</div>
			</UnfoldingCard>
		</div>
	)
}

export default UserCard