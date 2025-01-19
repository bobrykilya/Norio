import React from 'react'
import { IRecentUser } from "../UserCard"
import ToolTip from "../../../ToolTip/ToolTip"



type RecentUserProps = {
	user: IRecentUser;
}
const RecentUser = ({ user }: RecentUserProps) => {


	return (
		<button
			className={'recent_user-but cont'}
			tabIndex={-1}
			onClick={() => {}}
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
	)
}

export default RecentUser