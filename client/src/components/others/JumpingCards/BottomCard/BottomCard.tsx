import React, { useEffect, useState } from 'react'
import JumpingCard from '../../../common/JumpingCard/JumpingCard'
import { useAvatarState, useBottomCardState } from '../../../../stores/Utils-store'
import AvatarList from './AvatarList/AvatarList'
import LogBook from './LogBook/LogBook'
import timeout from '../../../../utils/timeout'



const BottomCard = () => {

	const { bottomCardState, setBottomCardState } = useBottomCardState()
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
			// console.log(state)
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
				callback: () => setBottomCardState(null),
			}}
			forceCloseJumpingCard={!bottomCardState}
		>
			{getContent(content)}
		</JumpingCard>
	)
}

export default BottomCard
