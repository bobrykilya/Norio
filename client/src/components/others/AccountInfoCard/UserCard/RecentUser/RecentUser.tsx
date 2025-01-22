import React from 'react'
import { IRecentUser } from "../UserCard"
import ToolTip from "../../../ToolTip/ToolTip"
import { IoClose } from "react-icons/io5"
import RoundButton from "../../../../common/Buttons/RoundButton/RoundButton"



type RecentUserProps = {
	user: IRecentUser;
}
const RecentUser = ({ user }: RecentUserProps) => {


	return (

		<div
			className={'recent_user-cont cont'}
		>
			<button
				className={'recent_user-but cont'}
				tabIndex={-1}
				onClick={() => {
				}}
			>
				<div
					className={'recent_user_img-cont cont'}
				>
					<img src={`/avatars/${user.avatar}.jpg`} alt="Avatar error 3"/>
				</div>
				<div
					className={'recent_user_text-cont cont'}
				>
						<span
							className={'recent_user-name'}
						>
							{user.name}
						</span>
					<span
						className={'recent_user-job'}
					>
							{user.job}
						</span>
				</div>
				<ToolTip
					text={`Сменить аккаунт пользователя на ${user.username}`}
					position={'left'}
				/>
			</button>
			<RoundButton
				onClick={() => {}}
				toolTip={{
					text: `Забыть пользователя ${user.username}`,
					position: 'bottom'
				}}
				size={'tiny'}
			>
				<IoClose className={'fa-icon'} />
			</RoundButton>
		</div>
	)
}

export default RecentUser