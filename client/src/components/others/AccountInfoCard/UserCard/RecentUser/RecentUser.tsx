import React, { useRef } from 'react'
import { IRecentUser } from "../UserCard"
import ToolTip from "../../../ToolTip/ToolTip"
import { IoClose } from "react-icons/io5"
import RoundButton from "../../../../common/Buttons/RoundButton/RoundButton"
import timeout from "../../../../../utils/timeout"



type RecentUserProps = {
	user: IRecentUser;
}
const RecentUser = ({ user }: RecentUserProps) => {

	const userContRef = useRef(null)


	const handleChangeUser = () => {

	}

	const handleRemoveUser = async () => {
		userContRef.current.classList.add('hide')

		await timeout(200)

		
	}

	return (

		<div
			className={'recent_user-cont cont'}
			ref={userContRef}
		>
			<button
				className={'recent_user-but cont'}
				tabIndex={-1}
				onClick={handleChangeUser}
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
				onClick={handleRemoveUser}
				toolTip={{
					text: `Забыть пользователя ${user.username}`,
				}}
				size={'tiny'}
			>
				<IoClose className={'fa-icon'} />
			</RoundButton>
		</div>
	)
}

export default RecentUser