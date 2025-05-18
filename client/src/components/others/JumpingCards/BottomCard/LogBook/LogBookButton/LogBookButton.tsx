import React from 'react'

import { ICONS } from '@assets/common/Icons-data'
import RoundButton from '@common/Buttons/RoundButton/RoundButton'
import { useJumpingCardsState } from '@stores/Utils-store'



type LogBookButtonProps = {
	isAuthPage?: boolean;
	delayTimeMS?: number;
}
const LogBookButton = ({ isAuthPage = false, delayTimeMS }: LogBookButtonProps) => {

	const setJumpingCardsState = useJumpingCardsState(s => s.setJumpingCardsState)


	return (
		<RoundButton
			onClick={() => setJumpingCardsState('bottomCard', 'logBook')}
			className={'log_book-but before_hover-but'}
			toolTip={{
				message: 'Открыть панель ошибок',
				position: isAuthPage ? 'bottom_left' : 'right',
				delayTimeMS,
			}}
		>
			{
				isAuthPage ? ICONS.logBook : ICONS.logBookFilled
			}
		</RoundButton>
	)
}

export default LogBookButton