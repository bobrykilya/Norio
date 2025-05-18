import React, { useEffect, useState } from 'react'

import AvatarList from './AvatarList/AvatarList'
import LogBook from './LogBook/LogBook'
import JumpingCard from '@common/JumpingCard/JumpingCard'
import { useAvatarState, useJumpingCardsState } from '@stores/Utils-store'
import timeout from '@utils/timeout'



const BottomCard = () => {

	const [
		bottomCardState,
		setJumpingCardsState,
	] = useJumpingCardsState(s => [s.getJumpingCardsState('bottomCard'), s.setJumpingCardsState])
	const [content, setContent] = useState<typeof bottomCardState>(bottomCardState)
	const selectedAvatarState = useAvatarState(s => s.selectedAvatarState)

	const getContent = (state: typeof bottomCardState) => {
		switch (state) {
			case 'avatarList':
				return <AvatarList
					currentAvatar={selectedAvatarState}
				/>
			case 'logBook':
				return <LogBook />
			default:
				return null
		}
	}

	useEffect(() => {
		const changeContent = async (state: typeof bottomCardState) => {
			if (!state) {
				await timeout(3000)
				setContent(null)
			} else {
				setContent(state)
			}
		}

		changeContent(bottomCardState)
	}, [bottomCardState])
	// console.log({ bottomCardState, content })


	return (
		<JumpingCard
			className={'bottom_card-cover'}
			closeHooksParams={{
				conditionsList: [Boolean(bottomCardState)],
				callback: () => setJumpingCardsState('bottomCard', null),
			}}
		>
			{getContent(content)}
		</JumpingCard>
	)
}

export default BottomCard
