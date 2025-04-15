import React from 'react'
import { useTopCardState } from "../../../../stores/Utils-store"



const WriteBirthdayButton = () => {

	const setTopCardState = useTopCardState(s => s.setTopCardState)
	const handleClick = () => {
		setTopCardState('userInfo')
	}

	return (
		<button
			type={'button'}
			className={'write_birthday-but'}
			onClick={handleClick}
			tabIndex={-1}
		>
			<p>Указать дату рождения<br/> для гороскопа</p>
		</button>
	)
}

export default WriteBirthdayButton