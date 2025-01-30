import React, { useEffect, useState } from 'react'
import ToolTip from "../../ToolTip/ToolTip"
// import { IoIosAddCircle } from "react-icons/io"
// import { ISwitchUserElem } from "../SwitchUser"
import { IoAdd, IoClose } from "react-icons/io5"
import RoundButton from "../../../common/Buttons/RoundButton/RoundButton"
import logOut from "../../../../features/auth/logOut"
import { IUserRepository } from "../../../../../../api/src/types/DB-types"
import timeout from "../../../../utils/timeout"
// import { ISwitchUserElem } from "../SwitchUser"



type SwitchUserElemProps = {
	isVisible: boolean;
	setUsersList?: React.Dispatch<React.SetStateAction<IUserRepository[]>>;
	user?: IUserRepository;
	isNewUser?: boolean;
}
const SwitchUserElem = ({ isVisible, setUsersList, user, isNewUser }: SwitchUserElemProps) => {

	const [isRendered, setIsRendered] = useState(false)


	const handleChangeUser = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.stopPropagation()
		if (!isNewUser) {
			setIsRendered(false)
			await timeout(300)
		}

		logOut.handleSwitchUser(user?.username)
	}

	const handleRemoveUser = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.stopPropagation()
		setUsersList(prev => prev.filter(el => el.username !== user.username))

		await timeout(300)
		logOut.handleRemoveSwitchUser(user.username)
	}


	useEffect(() => {
		setTimeout(() => setIsRendered(true));
	}, [])


	return (

		<div
			className={`switch_user_elem-cont cont ${isRendered && isVisible ? 'opened' : ''}`}
		>
			<button
				className={'switch_user_elem-but cont'}
				tabIndex={-1}
				onClick={handleChangeUser}
			>
				<div
					className={'switch_user_elem_img-cont cont'}
				>
					{
						!isNewUser ?
						<img
							src={`/avatars/${user?.avatar}.jpg`}
							alt="IMG Error 6"
						/> :
						<IoAdd className={'fa-icon'} />
					}
				</div>
				<div
					className={'switch_user_elem_text-cont cont'}
				>
					<span
						className={'switch_user_elem-name'}
					>
						{
							!isNewUser ?
							`${user?.lastName} ${user?.firstName}` :
							'Новый аккаунт'
						}
					</span>
					<span
						className={'switch_user_elem-job'}
					>
						{
							!isNewUser ?
							user?.job :
							'Выполнить вход'
						}
					</span>
				</div>
				<ToolTip
					text={
						!isNewUser ?
						`Сменить аккаунт на ${user?.username}` :
						'Сменить аккаунт на нового пользователя'
					}
					position={'left'}
				/>
			</button>
			{
				!isNewUser &&
				<RoundButton
					onClick={handleRemoveUser}
					toolTip={{
						text: `Забыть аккаунт ${user?.username}`,
					}}
					size={'tiny'}
				>
					<IoClose className={'fa-icon'} />
				</RoundButton>
			}
		</div>
	)
}

export default SwitchUserElem