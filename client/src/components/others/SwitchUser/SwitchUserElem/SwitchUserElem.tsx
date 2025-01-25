import React from 'react'
import ToolTip from "../../ToolTip/ToolTip"
// import { IoIosAddCircle } from "react-icons/io"
// import { ISwitchUserElem } from "../SwitchUser"
import { IoAdd, IoClose } from "react-icons/io5"
import RoundButton from "../../../common/Buttons/RoundButton/RoundButton"
import { ISwitchUserElem } from "../SwitchUser"
// import { ISwitchUserElem } from "../SwitchUser"



type SwitchUserElemProps = {
	isHide: boolean;
	setUsersList?: React.Dispatch<React.SetStateAction<ISwitchUserElem[]>>;
	user?: ISwitchUserElem;
	isNewUser?: boolean;
}
const SwitchUserElem = ({ isHide, setUsersList, user, isNewUser }: SwitchUserElemProps) => {

	const handleChangeUser = () => {

	}

	const handleRemoveUser = async () => {
		setUsersList(prev => prev.filter(el => el.username !== user.username))
	}

	return (

		<div
			className={`switch_user_elem-cont cont ${isHide ? 'hide' : ''}`}
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
						<img src={`/avatars/${user.avatar}.jpg`} alt="Avatar error 3"/> :
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
							user.name :
							'Новый аккаунт'
						}
					</span>
					<span
						className={'switch_user_elem-job'}
					>
						{
							!isNewUser ?
							user.job :
							'Выполнить вход'
						}
					</span>
				</div>
				<ToolTip
					text={
						!isNewUser ?
						`Сменить аккаунт на ${user.username}` :
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
						text: `Забыть аккаунт ${user.username}`,
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