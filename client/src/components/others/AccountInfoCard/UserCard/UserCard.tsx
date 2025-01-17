import React, { useContext, useRef, useState } from 'react'
import ToolTip from "../../ToolTip/ToolTip"
import { useUserInfoState } from "../../../../stores/Auth-store"
import { AuthContext } from "../../../../context/Auth-context"
import UnfoldingCard from "../../../common/UnfoldingCard/UnfoldingCard"
import SubmitBut from "../../../_AuthPage/SubmitBut/SubmitBut"
import { LuLogOut } from "react-icons/lu";



type UserCardProps = {

}
const UserCard = ({  }: UserCardProps) => {

	const [isFullUserCard, setIsFullUserCard] = useState(false)
	const { userInfoState } = useUserInfoState()
	const { handleLogOut } = useContext(AuthContext)
	const toggleButtonRef = useRef(null)

	const toggleUserCard = () => {
		setIsFullUserCard(prev => !prev)
	}

	return (
		<div
			className={'user_card-frame cont'}
		>
			<UnfoldingCard
				isFullCard={isFullUserCard}
				ref={toggleButtonRef}
				toggleCard={toggleUserCard}
			>
				<button
					className="account-but cont"
					onClick={() => setIsFullUserCard(prev => !prev)}
					tabIndex={-1}
					ref={toggleButtonRef}
				>
					<div
						className={'account_img-cont'}
					>
						<img src={`/avatars/${userInfoState?.avatar}.jpg`} alt="Avatar error 3"/>
					</div>
					<ToolTip
						text={`${isFullUserCard ? 'Закрыть' : 'Открыть'} карточку пользователя`}
						position={'bottom_left'}
					/>
				</button>
				<div
				    className={'unfolding_card-only_full cont'}
				>
				    <SubmitBut
						icon={<LuLogOut className={'fa-icon'} />}
						onClick={handleLogOut}
						useOnClick={true}
					/>
				</div>
			</UnfoldingCard>
		</div>
	)
}

export default UserCard