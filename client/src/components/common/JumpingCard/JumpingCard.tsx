import React from 'react'

import CoverAppTitle from '../CoverAppTitle/CoverAppTitle'
import { IUseCloseOnEsc } from '@hooks/useCloseOnEsc'
import { useModalState } from '@stores/Utils-store'



export type JumpingCardOptions = 'top' | 'left' | 'right'

type JumpingCardProps = {
	children: any;
	closeHooksParams: IUseCloseOnEsc;
	className: string;
	position?: JumpingCardOptions;
	other_children?: any;
}
const JumpingCard = ({
						 children,
						 className,
						 position,
						 other_children,
						 closeHooksParams,
					 }: JumpingCardProps) => {

	const [
		addModal,
		removeModal,
		isModalOnTop,
	] = useModalState(s => [s.addModal, s.removeModal, s.isModalOnTop])
	const isOpened = closeHooksParams.conditionsList[0]


	const handleClickOutside = () => {
		if (closeHooksParams.conditionsList.concat(isModalOnTop(className)).includes(false)) {
			return
		}

		closeHooksParams.callback()
	}

	// useCloseOnEsc({
	// 	callback: closeHooksParams.callback,
	// 	conditionsList: closeHooksParams.conditionsList.concat(isModalOnTop(className)),
	// })


	//* BlurModalState - For forms Esc blur while JumpingCard is opened
	// useEffect(() => {
	// 	if (isOpened) {
	// 		addModal({
	// 			type: 'jump',
	// 			name: className,
	// 			callback: closeHooksParams.callback,
	// 		})
	// 	} else {
	// 		removeModal({
	// 			name: className,
	// 		})
	// 	}
	// }, [isOpened])
	console.log(isOpened)

	return (
		<div
			className={`${className || ''} jumping_card_cover-cont cover cont ${isOpened ? 'opened' : ''} ${position || ''}`}
		>
			<div
				className={'jumping_card-cont cont'}
			>
				{
					isOpened &&
					children
				}
				{
					isOpened &&
					other_children
				}
			</div>
			<div
				className={`jumping_card-cover ${isModalOnTop(className) ? 'visible' : ''}`}
				onClick={handleClickOutside}
			>
				<CoverAppTitle dim={true} />
			</div>
		</div>
	)
}

export default JumpingCard