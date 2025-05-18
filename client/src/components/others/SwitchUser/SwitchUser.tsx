import React, { useState } from 'react'

import ToolTip from '../ToolTip/ToolTip'
import SwitchUserElem from './SwitchUserElem/SwitchUserElem'
import { MAX_SWITCH_USERS, SWITCH_USERS_ID_LS } from '@/../constants'
import { ICONS } from '@/assets/common/Icons-data'
import { IUserRepository } from '@api/src/types/DB-types'
import RoundButton from '@common/Buttons/RoundButton/RoundButton'
import { ISwitchUsersIdLS } from '@features/auth/authCommon'
import LogOut from '@features/auth/logOut'
import { ICommonVar } from '@shared/types/Global-types'
import { useJwtInfoListState } from '@stores/Auth-store'
import { getLSObject } from '@utils/localStorage'
import { sortByAlphabet } from '@utils/sort'
import timeout from '@utils/timeout'



type SwitchUserProps = {
	currentUserId?: ICommonVar['id'];
	isAuthPage?: boolean;
	disabled?: boolean;
}
const SwitchUser = ({ currentUserId, isAuthPage, disabled }: SwitchUserProps) => {

	if (MAX_SWITCH_USERS < 2) {
		return
	}

	const jwtInfoListState = useJwtInfoListState(s => s.jwtInfoListState)
	const SAVED_USERS_INFO_LIST: IUserRepository[] = sortByAlphabet(jwtInfoListState
		.map(el => el.userInfo), 'lastName')
	const switchUsersIdList = getLSObject<ISwitchUsersIdLS>(SWITCH_USERS_ID_LS) || []

	const [usersIdList, setUsersIdList] = useState(switchUsersIdList)
	// console.log({ SAVED_USERS_LIST: SAVED_USERS_INFO_LIST, usersList: usersIdList })

	const handleForgetAllUsers = async () => {
		setUsersIdList([])

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
							message={`Текущий аккаунт будет сохранён в фоне для быстрого возврата`}
							position={'left'}
						/>
					}
				</span>
				<RoundButton
					className={'before_hover-but'}
					onClick={handleForgetAllUsers}
					toolTip={{
						message: 'Забыть все фоновые аккаунты',
					}}
					size={'xs'}
					disabled={(!isAuthPage ? !usersIdList[1] : !usersIdList[0])}
				>
					{ICONS.trash}
				</RoundButton>
			</div>
			{
				switchUsersIdList.map((userId) => {
						if ((currentUserId && userId === currentUserId)) {
							return
						}

						const user = SAVED_USERS_INFO_LIST.find(userInfo => userInfo.userId === userId)

						if (!user) {
							return
						}


						return <SwitchUserElem
							key={userId}
							userInfo={user}
							isVisible={usersIdList.includes(userId)}
							isAuthPage={isAuthPage}
							setUsersIdList={setUsersIdList}
						/>
					},
				)
			}
			<SwitchUserElem
				isNewUser={true}
				isVisible={!isAuthPage && !usersIdList[MAX_SWITCH_USERS - 1]}
			/>
		</div>
	)
}

export default SwitchUser