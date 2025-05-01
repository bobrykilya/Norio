import React, { useRef } from 'react'
import { useClickOutside } from '../../../hooks/useClickOutside'
import useCloseOnEsc from '../../../hooks/useCloseOnEsc'
import { useModalState } from '../../../stores/Utils-store'



type UnfoldingCardProps = {
	isFullCard: boolean;
	closeCard: () => void;
	className?: string;
	children: any;
}
const UnfoldingCard = ({ isFullCard, closeCard, className, children }: UnfoldingCardProps) => {

	const cardRef = useRef(null)
	const getCommonModalState = useModalState(s => s.getCommonModalState)
	console.log(getCommonModalState())

	useClickOutside({
		ref: cardRef,
		callback: closeCard,
		conditionsList: [isFullCard, !getCommonModalState()],
	})

	useCloseOnEsc({
		callback: closeCard,
		conditionsList: [isFullCard],
	})


	return (
		<div
			className={`${className || ''} unfolding-card card cont ${isFullCard ? 'full' : ''}`}
			ref={cardRef}
		>
			{children}
		</div>
	)
}

export default UnfoldingCard