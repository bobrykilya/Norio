import React, { useEffect, useRef, useState } from 'react'
import { PiUser } from "react-icons/pi"
import { useJwtInfoListState } from "../../../stores/Auth-store"
import ToolTip from "../../others/ToolTip/ToolTip"
import { MAX_SWITCH_USERS, SWITCH_USERS_LS } from "../../../../constants"
import DropDown from "../../common/DropDown/DropDown"
import SwitchUser from "../../others/SwitchUser/SwitchUser"



type SwitchUserButtonProps = {
	disabled: boolean;
}
const SwitchUserButton = ({ disabled }: SwitchUserButtonProps) => {

	const avatarsQuantity = MAX_SWITCH_USERS - 1
	const jwtInfoListState = useJwtInfoListState(s => s.jwtInfoListState)
	const switchUsersList: string[] = JSON.parse(localStorage.getItem(SWITCH_USERS_LS)) || []
	const noAvatarsQuantity = avatarsQuantity - switchUsersList.length
	const [isSwitchUserOpened, setIsSwitchUserOpened] = useState(false)
	const butRef = useRef(null)


	const switchOpened = () => {
		butRef.current.blur()
		setIsSwitchUserOpened(prev => !prev)
	}

	useEffect(() => {
		if (!switchUsersList[0]) {
			setIsSwitchUserOpened(false)
		}
	}, [switchUsersList[0]])

	return (
		<div
			className={'switch_user_but-cont cont'}
		>
			<button
				className={'switch_user-but cont'}
				disabled={disabled || !switchUsersList[0]}
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
						switchUsersList.map((username, index) => {
								if (index > MAX_SWITCH_USERS - 2) {
									return
								}

								const userInfo = jwtInfoListState.find(user => user.userInfo.username === username)?.userInfo

								if (!userInfo) {
									return
								}

								return <div
									key={username}
									className={'switch_user_img-cont cont'}
								>
									<img src={`/avatars/${userInfo.avatar}.jpg`} alt="IMG switch user but"/>
								</div>
							}
						)
					}
					{
						noAvatarsQuantity > 0 &&
						Array.from({ length: noAvatarsQuantity }).map((any, index) =>
							<div
								key={index}
								className={'switch_user_img-cont cont'}
							>
								<PiUser className="fa-icon"/>
							</div>
						)
					}
				</div>
				<ToolTip
					text={'Выбрать раннее авторизованного пользователя'}
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