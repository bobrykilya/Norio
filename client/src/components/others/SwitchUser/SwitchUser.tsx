import React, { useRef, useState } from 'react'
import RoundButton from "../../common/Buttons/RoundButton/RoundButton"
import SwitchUserElem from "./SwitchUserElem/SwitchUserElem"
import { TbTrashXFilled } from "react-icons/tb"
import ToolTip from "../ToolTip/ToolTip"
import { IUserRepository } from "../../../../../api/src/types/DB-types"
import { MAX_SWITCH_USERS } from "../../../../constants"
import LogOut from "../../../features/auth/logOut"
import { useJwtInfoListState } from "../../../stores/Auth-store"
import timeout from "../../../utils/timeout"



export type ISwitchUserElem = {
	username: string;
	name: string;
	job: string;
	avatar: string;
}

type SwitchUserProps = {
	userInfo: IUserRepository;
}
const SwitchUser = ({ userInfo }: SwitchUserProps) => {

	if (MAX_SWITCH_USERS < 2) {
		return
	}

	const SAVED_USERS_LIST = useJwtInfoListState(s => s.jwtInfoListState).map(el => el.userInfo)
	// console.log(SAVED_USERS_LIST)

	const [usersList, setUsersList] = useState(SAVED_USERS_LIST)
	const usersContRef = useRef(null)

	const handleForgetAllUsers = async () => {
		setUsersList([])

		await timeout(300)

		LogOut.handleRemoveAllSwitchUsers()
	}


	return (
		<div
			className={`switch_user-cont cont`}
			ref={usersContRef}
		>
			<div
				className={'switch_user_info-cont cont'}
			>
				<span
					className={'switch_user-info cont'}
				>
					Сменить аккаунт
					<ToolTip
						text={`Текущий аккаунт будет сохранён в фоне для быстрого возврата`}
						position={'left'}
					/>
				</span>
				<RoundButton
					className={'before_hover-but'}
					onClick={handleForgetAllUsers}
					toolTip={{
						text: 'Забыть все аккаунты'
					}}
					size={'tiny'}
					disabled={!usersList[1]}
				>
					<TbTrashXFilled className={'fa-icon'} />
				</RoundButton>
			</div>
			{
				SAVED_USERS_LIST.map(user => {
					if (user.username === userInfo.username) {
						return
					}

					return <SwitchUserElem
								key={user.username}
								user={user}
								isVisible={usersList.includes(user)}
								setUsersList={setUsersList}
							/>
					}
				)
			}
			<SwitchUserElem
				isNewUser={true}
				isVisible={!usersList[MAX_SWITCH_USERS - 1]}
			/>
		</div>
	)
}

export default SwitchUser