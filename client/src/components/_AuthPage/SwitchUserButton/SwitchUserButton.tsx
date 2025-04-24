import React, { useEffect, useRef, useState } from 'react'
import { useJwtInfoListState } from "../../../stores/Auth-store"
import ToolTip from "../../others/ToolTip/ToolTip"
import { MAX_SWITCH_USERS, SWITCH_USERS_ID_LS } from "../../../../constants"
import DropDown from "../../common/DropDown/DropDown"
import SwitchUser from "../../others/SwitchUser/SwitchUser"
import { ICONS } from "../../../assets/common/Icons-data"
import { getLSObject } from "../../../utils/localStorage"
import { ISwitchUsersIdLS } from "../../../features/auth/authCommon"



type SwitchUserButtonProps = {
	disabled: boolean;
}
const SwitchUserButton = ({ disabled }: SwitchUserButtonProps) => {

	const avatarsQuantity = MAX_SWITCH_USERS - 1
	const jwtInfoListState = useJwtInfoListState(s => s.jwtInfoListState)
	const switchUsersIdList = getLSObject<ISwitchUsersIdLS>(SWITCH_USERS_ID_LS) || []
	const noAvatarsQuantity = avatarsQuantity - switchUsersIdList.length
	const [isSwitchUserOpened, setIsSwitchUserOpened] = useState(false)
	const butRef = useRef(null)


	const switchOpened = () => {
		butRef.current.blur()
		setIsSwitchUserOpened(prev => !prev)
	}

	useEffect(() => {
		if (!switchUsersIdList[0]) {
			setIsSwitchUserOpened(false)
		}
	}, [switchUsersIdList[0]])

	return (
		<div
			className={'switch_user_but-cont cont'}
		>
			<button
				className={'switch_user-but cont'}
				disabled={disabled || !switchUsersIdList[0]}
				onClick={switchOpened}
				ref={butRef}
			>
				<span
					className={'switch_users-title cont'}
				>
					Активные
				</span>
				<div
					className={'switch_users_img-cont cont'}
				>
					{
						switchUsersIdList.map((userId, index) => {
								if (index > MAX_SWITCH_USERS - 2) {
									return
								}

								const userInfo = jwtInfoListState.find(userState => userState.userInfo.userId === userId)?.userInfo

								if (!userInfo) {
									return
								}

								return <div
									key={userId}
									className={'switch_user_img-cont cont'}
								>
									<img src={`/avatars/${userInfo.avatar}.jpg`} alt="IMG switch userInfo but"/>
								</div>
							}
						)
					}
					{
						noAvatarsQuantity > 0 &&
						Array.from({ length: noAvatarsQuantity }).map((_, index) =>
							<div
								key={`empty_avatar_${index}`}
								className={'switch_user_img-cont cont'}
							>
								{ICONS.emptyAvatar}
							</div>
						)
					}
				</div>
				<ToolTip
					message={'Выбрать раннее авторизованного пользователя'}
					position={'bottom'}
					isBlock={isSwitchUserOpened}
				/>
			</button>
			<DropDown
				closeHooksParams={{
					butRef,
					callback: () => setIsSwitchUserOpened(false),
					conditionsList: [isSwitchUserOpened]
				}}
			>
				<SwitchUser
					isAuthPage={true}
					disabled={!isSwitchUserOpened}
				/>
			</DropDown>
		</div>

	)
}

export default SwitchUserButton 