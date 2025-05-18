import React, { useEffect, useRef } from 'react'

import clsx from 'clsx'

import { IUseCloseOnEsc } from '@hooks/useCloseOnEsc'
import { useModalState } from '@stores/Utils-store'



type UnfoldingCardProps = {
	className: string;
	closeHooksParams: IUseCloseOnEsc;
	children: any;
}
const UnfoldingCard = ({ className, closeHooksParams, children }: UnfoldingCardProps) => {

	const cardRef = useRef(null)
	const [
		addModal,
		removeModal,
		isModalOnTop,
	] = useModalState(s => [s.addModal, s.removeModal, s.isModalOnTop])
	const isFullCard = closeHooksParams.conditionsList[0]

	// useClickOutside({
	// 	ref: cardRef,
	// 	callback: closeHooksParams.callback,
	// 	conditionsList: closeHooksParams.conditionsList.concat(isModalOnTop(className)),
	// })
	//
	// useCloseOnEsc({
	// 	callback: closeHooksParams.callback,
	// 	conditionsList: closeHooksParams.conditionsList.concat(isModalOnTop(className)),
	// })

	useEffect(() => {
		if (isFullCard) {
			addModal({
				type: 'unfold',
				callback: closeHooksParams.callback,
			})
		} else {
			removeModal({
				type: 'unfold',
			})
		}
	}, [isFullCard])


	return (
		<div
			className={clsx(className, 'unfolding-card', 'card', 'cont', isFullCard && 'full')}
			ref={cardRef}
		>
			{children}
		</div>
	)
}

export default UnfoldingCard