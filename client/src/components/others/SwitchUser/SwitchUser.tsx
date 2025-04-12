import React, { useState } from 'react'
import RoundButton from "../../common/Buttons/RoundButton/RoundButton"
import SwitchUserElem from "./SwitchUserElem/SwitchUserElem"
import ToolTip from "../ToolTip/ToolTip"
import { MAX_SWITCH_USERS, SWITCH_USERS_LS } from "../../../../constants"
import LogOut from "../../../features/auth/logOut"
import { useJwtInfoListState } from "../../../stores/Auth-store"
import timeout from "../../../utils/timeout"
import { sortByAlphabet } from "../../../utils/sort"
import { IUserRepository } from "../../../../../api/src/types/DB-types"
import { ICONS } from "../../../assets/common/Icons-data"



type SwitchUserProps = {
	currentUser?: string;
	isAuthPage?: boolean;
	disabled?: boolean;
}
const SwitchUser = ({ currentUser, isAuthPage, disabled }: SwitchUserProps) => {

	if (MAX_SWITCH_USERS < 2) {
		return
	}

	const SAVED_USERS_LIST: IUserRepository[] = sortByAlphabet(useJwtInfoListState(s => s.jwtInfoListState).map(el => el.userInfo), 'lastName')
	const switchUsersList: string[] = JSON.parse(localStorage.getItem(SWITCH_USERS_LS)) || []

	const [usersList, setUsersList] = useState(switchUsersList)
	// console.log({ SAVED_USERS_LIST, usersList })

	const handleForgetAllUsers = async () => {
		setUsersList([])

		await timeout(300)
		LogOut.handleRemoveAllSwitchUsers()
	}


	return (
		<div
			className={`switch_user-cont cont ${disabled ? 'disabled' : ''}`}
		>
			<div
				className={'switch_user_info-cont cont'}
			>
				<span
					className={'switch_user-info cont'}
				>
					{!isAuthPage ? 'Сменить аккаунт' : 'Войти в аккаунт'}
					{
						!isAuthPage &&
						<ToolTip
							text={`Текущий аккаунт будет сохранён в фоне для быстрого возврата`}
							position={'left'}
						/>
					}
				</span>
				<RoundButton
					className={'before_hover-but'}
					onClick={handleForgetAllUsers}
					toolTip={{
						text: 'Забыть все фоновые аккаунты'
					}}
					size={'tiny'}
					disabled={(!isAuthPage ? !usersList[1] : !usersList[0])}
				>
					{ICONS.trash}
				</RoundButton>
			</div>
			{
				switchUsersList.map((username) => {
					if ((currentUser && username === currentUser) ) {
						return
					}

					const user = SAVED_USERS_LIST.find(userInfo => userInfo.username === username)

					if (!user) {
						return
					}


					return <SwitchUserElem
								key={username}
								user={user}
								isVisible={usersList.includes(username)}
								isAuthPage={isAuthPage}
								setUsersList={setUsersList}
							/>
					}
				)
			}
			<SwitchUserElem
				isNewUser={true}
				isVisible={!isAuthPage && !usersList[MAX_SWITCH_USERS - 1]}
			/>
		</div>
	)
}

export default SwitchUser