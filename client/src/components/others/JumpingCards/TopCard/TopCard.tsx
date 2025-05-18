import React, { useState } from 'react'

import AccountInfoEditForm from './EditForms/AccountInfoEditForm/AccountInfoEditForm'
import { FormStatusButOptions } from './EditForms/common/FormStatusButton/FormStatusButton'
import UserInfoEditForm from './EditForms/UserInfoEditForm/UserInfoEditForm'
import JumpingCard from '@common/JumpingCard/JumpingCard'
import { useDeferredCardContent } from '@features/JumpingCard/useDeferredCardContent'
import { useJumpingCardsState } from '@stores/Utils-store'



const TopCard = () => {

	const [statusState, setStatusState] = useState<FormStatusButOptions>('ok')
	const [
		topCardState,
		setJumpingCardsState,
	] = useJumpingCardsState(s => [s.getJumpingCardsState('topCard'), s.setJumpingCardsState])
	const { displayedState, isCardVisible } = useDeferredCardContent(topCardState);

	const getContent = () => {
		switch (displayedState) {
			case 'userInfo':
				return <UserInfoEditForm
					statusState={statusState}
					setStatusState={setStatusState}
				/>
			case 'accountInfo':
				return <AccountInfoEditForm
					statusState={statusState}
					setStatusState={setStatusState}
				/>
			default:
				return null
		}
	}

	// if (!isCardVisible) {
	// 	return null
	// }


	return (
		<JumpingCard
			className={'top_card-cover'}
			position={'top'}
			closeHooksParams={{
				conditionsList: [Boolean(topCardState), statusState === 'ok'],
				callback: () => setJumpingCardsState('topCard', null),
			}}
		>
			<UserInfoEditForm
				statusState={statusState}
				setStatusState={setStatusState}
			/>
		</JumpingCard>
	)
}

export default TopCard