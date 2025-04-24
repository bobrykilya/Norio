import React, { useEffect, useState } from 'react'
import ToolTip from "../../ToolTip/ToolTip"
import RoundButton from "../../../common/Buttons/RoundButton/RoundButton"
import logOut from "../../../../features/auth/logOut"
import { IUserRepository } from "../../../../../../api/src/types/DB-types"
import timeout from "../../../../utils/timeout"
import { useJwtInfoListState } from "../../../../stores/Auth-store"
import AuthCommon, { ISwitchUsersIdLS } from "../../../../features/auth/authCommon"
import { SWITCH_USERS_ID_LS } from "../../../../../constants"
import { ICONS } from "../../../../assets/common/Icons-data"
import { ICommonVar } from "../../../../../../common/types/Global-types"
import { getLSObject } from "../../../../utils/localStorage"



type SwitchUserElemProps = {
	isVisible: boolean;
	setUsersIdList?: React.Dispatch<React.SetStateAction<ICommonVar['id'][]>>;
	userInfo?: IUserRepository;
	isNewUser?: boolean;
	isAuthPage?: boolean;
}
const SwitchUserElem = ({ isVisible, setUsersIdList, userInfo, isNewUser, isAuthPage }: SwitchUserElemProps) => {

	const [isRendered, setIsRendered] = useState(false)


	const handleChangeUser = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.stopPropagation()
		if (!isNewUser) {
			setIsRendered(false)
			await timeout(300)
		}

		logOut.handleSwitchUser(userInfo?.userId)
	}

	const handleAuthUser = () => {
		const switchUsersIdList = getLSObject<ISwitchUsersIdLS>(SWITCH_USERS_ID_LS)

		if (switchUsersIdList[0] && !switchUsersIdList.includes(userInfo.userId)) {
			setUsersIdList(prev => prev.filter(userId => userId !== userInfo.userId))
			return
		}
		AuthCommon.saveUserInfoOnBrowser(useJwtInfoListState.getState().getJwtInfoState(userInfo.userId).userInfo)
	}


	const handleRemoveUser = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.stopPropagation()
		setUsersIdList(prev => prev.filter(userId => userId !== userInfo.userId))

		await timeout(300)
		logOut.handleRemoveSwitchUser(userInfo.userId)
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
							src={`/avatars/${userInfo?.avatar}.jpg`}
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
							`${userInfo?.lastName} ${userInfo?.firstName}` :
							'Новый аккаунт'
						}
					</span>
					<span
						className={'switch_user_elem-job'}
					>
						{
							!isNewUser ?
							userInfo?.job :
							'Выполнить вход'
						}
					</span>
				</div>
				{
					!isAuthPage ?
					<ToolTip
						message={
							!isNewUser ?
							`Сменить аккаунт на ${userInfo?.username}` :
							'Сменить аккаунт на нового пользователя'
						}
						position={'left'}
					/> :
					<ToolTip
						message={`Войти в аккаунт ${userInfo?.username}`}
						position={'right'}
					/>
				}
			</button>
			{
				!isNewUser &&
				<RoundButton
					onClick={handleRemoveUser}
					toolTip={{
						message: `Забыть аккаунт ${userInfo?.username}`,
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