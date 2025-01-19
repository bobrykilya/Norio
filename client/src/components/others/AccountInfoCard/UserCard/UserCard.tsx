import React, { useContext, useRef, useState } from 'react'
import ToolTip from "../../ToolTip/ToolTip"
import { useUserInfoState } from "../../../../stores/Auth-store"
import { AuthContext } from "../../../../context/Auth-context"
import UnfoldingCard from "../../../common/UnfoldingCard/UnfoldingCard"
import SubmitBut from "../../../_AuthPage/SubmitBut/SubmitBut"
import { LuLogOut } from "react-icons/lu";
import RoundButton from "../../../common/Buttons/RoundButton/RoundButton"
// import { FaUserCircle } from "react-icons/fa"
import { FaUserGear, FaUserPen } from "react-icons/fa6"
import RecentUser from "./RecentUser/RecentUser"
import { TbTrashXFilled } from "react-icons/tb"
import { showSnackMessage } from "../../../../features/showSnackMessage/showSnackMessage"



export type IRecentUser = {
	username: string;
	name: string;
	job: string;
	avatar: string;
}
const RECENT_USERS_LIST: IRecentUser[] = [
	{
		username: 'sonya',
		name: 'Василевич Светлана',
		job: 'Главный бухгалтер',
		avatar: 'dog_9'
	},
	{
		username: 'sekr',
		name: 'Шнигир Виктория',
		job: 'Секретарь',
		avatar: 'antelope'
	},
]

type UserCardProps = {

}
const UserCard = ({  }: UserCardProps) => {

	const [isFullUserCard, setIsFullUserCard] = useState(true)
	const { userInfoState } = useUserInfoState()
	const { handleLogOut } = useContext(AuthContext)
	const toggleButtonRef = useRef(null)

	const toggleUserCard = () => {
		setIsFullUserCard(prev => !prev)
	}

	const copyUsername = () => {
		navigator.clipboard.writeText(userInfoState?.username)
			.then(() => {
				showSnackMessage({
					type: "s",
					message: `Скопировано: <span class=\'bold\'>${userInfoState?.username}</span>`,
				})
			})
			.catch(() => {
				showSnackMessage({
					type: "e",
					message: `Не удалось скопировать: <span class=\'bold\'>${userInfoState?.username}</span>`,
				})
			})
	}

	return (
		<div
			className={'user_card-frame cont'}
		>
			<UnfoldingCard
				isFullCard={isFullUserCard}
				ref={toggleButtonRef}
				toggleCard={toggleUserCard}
			>
				<button
					className="account-but cont"
					onClick={() => setIsFullUserCard(prev => !prev)}
					tabIndex={-1}
					ref={toggleButtonRef}
				>
					<div
						className={'account_img-cont'}
					>
						<img src={`/avatars/${userInfoState?.avatar}.jpg`} alt="Avatar error 3"/>
					</div>
					<ToolTip
						text={`${isFullUserCard ? 'Закрыть' : 'Открыть'} карточку пользователя`}
						position={`${isFullUserCard ? 'bottom' : 'bottom_left'}`}
					/>
				</button>
				<div
				    className={'account_change-buts cont'}
				>
					<button
						className={'account_change-but cont'}
						tabIndex={-1}
						onClick={() => {}}
					>
						<FaUserPen className={'fa-icon'}/>
						<ToolTip
							text={'Редактировать личные данные пользователя'}
						/>
					</button>
					<button
						className={'account_change-but cont'}
						tabIndex={-1}
						onClick={() => {}}
					>
						<FaUserGear className={'fa-icon'}/>
						<ToolTip
							text={'Редактировать данные аккаунта'}
						/>
					</button>
				</div>
				<div
				    className={'unfolding_card-only_full cont'}
				>
					<div
						className={'user_name-cont cont'}
						onClick={copyUsername}
					>
						<span
							className={'user-name cont'}
						>
							{`${userInfoState.firstName} ${userInfoState.middleName}`}
							<span>
								{userInfoState.lastName}
							</span>
						</span>
						<span
						    className={'user-job'}
						>
						    {userInfoState.job}
						</span>
						<ToolTip
							text={`Скопировать логин пользователя`}
							position={'left'}
						/>
					</div>
					{
						RECENT_USERS_LIST[0] &&
						<div
							className={'recent_users-cont cont'}
						>
							<div
								className={'recent_users_info-cont cont'}
							>
								<span
									className={'recent_users-info'}
								>
									Недавние аккаунты
								</span>
								<RoundButton
									icon={<TbTrashXFilled className={'fa-icon'} />}
									onClick={() => {}}
									toolTip={{
										text: 'Забыть недавние аккаунты'
									}}
								/>
							</div>
							{
								RECENT_USERS_LIST.map(user =>
									<RecentUser
										key={user.username}
										user={user}
									/>
								)
							}
						</div>
					}
				    <SubmitBut
						icon={<LuLogOut className={'fa-icon'} />}
						onClick={handleLogOut}
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