import React, { useEffect, useState } from 'react'
import ToolTip from "../../ToolTip/ToolTip"
import RoundButton from "../../../common/Buttons/RoundButton/RoundButton"
import logOut from "../../../../features/auth/logOut"
import { IUserRepository } from "../../../../../../api/src/types/DB-types"
import timeout from "../../../../utils/timeout"
import { useJwtInfoListState } from "../../../../stores/Auth-store"
import AuthCommon from "../../../../features/auth/authCommon"
import { SWITCH_USERS_LS } from "../../../../../constants"
import { ICONS } from "../../../../assets/common/Icons-data"



type SwitchUserElemProps = {
	isVisible: boolean;
	setUsersList?: React.Dispatch<React.SetStateAction<string[]>>;
	user?: IUserRepository;
	isNewUser?: boolean;
	isAuthPage?: boolean;
}
const SwitchUserElem = ({ isVisible, setUsersList, user, isNewUser, isAuthPage }: SwitchUserElemProps) => {

	const [isRendered, setIsRendered] = useState(false)


	const handleChangeUser = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.stopPropagation()
		if (!isNewUser) {
			setIsRendered(false)
			await timeout(300)
		}

		logOut.handleSwitchUser(user?.username)
	}

	const handleAuthUser = () => {
		const switchUsersList: string[] = JSON.parse(localStorage.getItem(SWITCH_USERS_LS))

		if (switchUsersList[0] && !switchUsersList.includes(user.username)) {
			setUsersList(prev => prev.filter(username => username !== user.username))
			return
		}
		AuthCommon.saveUserInfoOnBrowser(useJwtInfoListState.getState().getJwtInfoState(user.username).userInfo)
	}


	const handleRemoveUser = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.stopPropagation()
		setUsersList(prev => prev.filter(username => username !== user.username))

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
				onClick={(e) => {
					if (!isAuthPage) {
						handleChangeUser(e)
					} else {
						handleAuthUser()
					}
				}}
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
						ICONS.add
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
				{
					!isAuthPage ?
					<ToolTip
						message={
							!isNewUser ?
							`Сменить аккаунт на ${user?.username}` :
							'Сменить аккаунт на нового пользователя'
						}
						position={'left'}
					/> :
					<ToolTip
						message={`Войти в аккаунт ${user?.username}`}
						position={'right'}
					/>
				}
			</button>
			{
				!isNewUser &&
				<RoundButton
					onClick={handleRemoveUser}
					toolTip={{
						message: `Забыть аккаунт ${user?.username}`,
					}}
					size={'tiny'}
				>
					{ICONS.close}
				</RoundButton>
			}
		</div>
	)
}

export default SwitchUserElem