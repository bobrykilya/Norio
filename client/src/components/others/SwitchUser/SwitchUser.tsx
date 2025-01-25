import React, { useRef, useState } from 'react'
import RoundButton from "../../common/Buttons/RoundButton/RoundButton"
import SwitchUserElem from "./SwitchUserElem/SwitchUserElem"
import { TbTrashXFilled } from "react-icons/tb"
import timeout from "../../../utils/timeout"
import ToolTip from "../ToolTip/ToolTip"
import { IUserRepository } from "../../../../../api/src/types/DB-types"
import { MAX_SWITCH_USERS } from "../../../../constants"



export type ISwitchUserElem = {
	username: string;
	name: string;
	job: string;
	avatar: string;
}
const SWITCH_USERS_LIST: ISwitchUserElem[] = [
	{
		username: 'sonya',
		name: 'Василевич Светлана',
		job: 'Главный бухгалтер',
		avatar: 'dog_9'
	},
	{
		username: 'sekr',
		name: 'Шнигир Виктория',
		job: 'Секретарь',
		avatar: 'antelope'
	},
]

type SwitchUserProps = {
	userInfo: IUserRepository;
}
const SwitchUser = ({ userInfo }: SwitchUserProps) => {

	if (MAX_SWITCH_USERS < 2) {
		return
	}

	const [usersList, setUsersList] = useState<ISwitchUserElem[]>(SWITCH_USERS_LIST)
	const usersContRef = useRef(null)

	const handleForgetAllUsers = async () => {
		setUsersList([])

		await timeout(400)

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
					disabled={!usersList[0]}
				>
					<TbTrashXFilled className={'fa-icon'} />
				</RoundButton>
			</div>
			{
				SWITCH_USERS_LIST.map(user =>
					<SwitchUserElem
						key={user.username}
						user={user}
						isHide={!usersList.includes(user)}
						setUsersList={setUsersList}
					/>
				)
			}
			<SwitchUserElem
				isNewUser={true}
				isHide={!!usersList[MAX_SWITCH_USERS - 2]}
			/>
		</div>
	)
}

export default SwitchUser