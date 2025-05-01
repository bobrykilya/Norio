import React from 'react'
import RoundButton from '../../../../../common/Buttons/RoundButton/RoundButton'
import { useBottomCardState } from '../../../../../../stores/Utils-store'
import { ICONS } from '../../../../../../assets/common/Icons-data'



type LogBookButtonProps = {
	isAuthPage?: boolean;
	delayTimeMS?: number;
}
const LogBookButton = ({ isAuthPage = false, delayTimeMS }: LogBookButtonProps) => {

	const setBottomCardState = useBottomCardState(s => s.setBottomCardState)


	return (
		<RoundButton
			onClick={() => setBottomCardState('logBook')}
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