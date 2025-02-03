import React, { useState } from 'react'
import RoundButton from "../../common/Buttons/RoundButton/RoundButton"
import SwitchUserElem from "./SwitchUserElem/SwitchUserElem"
import { TbTrashXFilled } from "react-icons/tb"
import ToolTip from "../ToolTip/ToolTip"
import { MAX_SWITCH_USERS } from "../../../../constants"
import LogOut from "../../../features/auth/logOut"
import { useJwtInfoListState } from "../../../stores/Auth-store"
import timeout from "../../../utils/timeout"
import { sortByAlphabet } from "../../../utils/sort"



type SwitchUserProps = {
	currentUser?: string;
	isAuthPage?: boolean;
	disabled?: boolean;
}
const SwitchUser = ({ currentUser, isAuthPage, disabled }: SwitchUserProps) => {

	if (MAX_SWITCH_USERS < 2) {
		return
	}

	const SAVED_USERS_LIST = sortByAlphabet(useJwtInfoListState(s => s.jwtInfoListState).map(el => el.userInfo), 'lastName')

	const [usersList, setUsersList] = useState(SAVED_USERS_LIST)
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
						text: 'Забыть все аккаунты'
					}}
					size={'tiny'}
					disabled={(!isAuthPage ? !usersList[1] : !usersList[0])}
				>
					<TbTrashXFilled className={'fa-icon'} />
				</RoundButton>
			</div>
			{
				SAVED_USERS_LIST.map((user, index) => {
					if ((currentUser && user.username === currentUser) ) {
						return
					}
					// if ((index > MAX_SWITCH_USERS - 2)) {
					// 	return
					// }


					return <SwitchUserElem
								key={user.username}
								user={user}
								isVisible={usersList.includes(user)}
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