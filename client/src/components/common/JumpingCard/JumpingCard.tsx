import React, { useEffect, useState } from 'react'
import useCloseOnEsc, { IUseCloseOnEsc } from '../../../hooks/useCloseOnEsc'
import CoverAppTitle from '../CoverAppTitle/CoverAppTitle'
import { useModalState } from '../../../stores/Utils-store'
import timeout from '../../../utils/timeout'



export type JumpingCardOptions = 'top' | 'left' | 'right'

type JumpingCardProps = {
	children: any;
	closeHooksParams: IUseCloseOnEsc;
	className: string;
	position?: JumpingCardOptions;
	other_children?: any;
	isPrerender?: boolean;
	forceCloseJumpingCard?: boolean;
}
const JumpingCard = ({
						 children,
						 className,
						 position,
						 other_children,
						 isPrerender,
						 closeHooksParams,
						 forceCloseJumpingCard,
					 }: JumpingCardProps) => {

	const [addJumpingCardState, removeJumpingCardState, dropDownState, snackBarState] = useModalState(s => [s.addJumpingCardState, s.removeJumpingCardState, s.dropDownState, s.snackBarState])
	const isCardOpened = closeHooksParams.conditionsList[0]
	const [isJumpingCardOpened, setIsJumpingCardOpened] = useState(isCardOpened)


	const handleCloseJumpingCard = async () => {
		setIsJumpingCardOpened(false)
		await timeout(300)
		closeHooksParams.callback()
	}

	const handleClickOutside = () => {
		if ([...closeHooksParams.conditionsList, !dropDownState].includes(false)) {
			return
		}

		handleCloseJumpingCard()
	}

	useCloseOnEsc({
		conditionsList: [...closeHooksParams.conditionsList, !dropDownState, !snackBarState],
		callback: handleCloseJumpingCard,
	})


	//* BlurModalState - For forms Esc blur while JumpingCard is opened
	useEffect(() => {
		if (isCardOpened) {
			addJumpingCardState(className)
			setIsJumpingCardOpened(true)
		} else {
			removeJumpingCardState(className)
			setIsJumpingCardOpened(false)
		}
	}, [isCardOpened])

	//* Handling for force closing without prerender
	useEffect(() => {
		if (forceCloseJumpingCard) {
			handleCloseJumpingCard()
		}
	}, [forceCloseJumpingCard])


	return (
		<div
			className={`${className || ''} jumping_card_cover-cont cover cont ${isJumpingCardOpened ? 'opened' : ''} ${position || ''}`}
		>
			<div
				className={'jumping_card-cont cont'}
			>
				{
					isPrerender ?
						children :
						isCardOpened && children
				}
				{
					isPrerender ?
						other_children :
						isCardOpened && other_children
				}
			</div>
			<div
				className={'jumping_card-cover'}
				onClick={handleClickOutside}
			>
				<CoverAppTitle dim={true} />
			</div>
		</div>
	)
}

export default JumpingCard