import React from 'react'

import { useJumpingCardsState } from '@stores/Utils-store'



const WriteBirthdayButton = () => {

	const setJumpingCardsState = useJumpingCardsState(s => s.setJumpingCardsState)
	const handleClick = () => {
		setJumpingCardsState('topCard', 'userInfo')
	}

	return (
		<button
			type={'button'}
			className={'write_birthday-but'}
			onClick={handleClick}
			tabIndex={-1}
		>
			<p>Указать дату рождения<br /> для гороскопа</p>
		</button>
	)
}

export default WriteBirthdayButton