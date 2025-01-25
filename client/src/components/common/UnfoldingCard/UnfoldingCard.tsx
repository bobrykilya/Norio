import React, { useRef } from 'react'
import { useClickOutside } from "../../../hooks/useClickOutside"
import useCloseOnEsc from "../../../hooks/useCloseOnEsc"
import { useModalState } from "../../../stores/Global-store"



type UnfoldingCardProps = {
	isFullCard: boolean;
	closeCard: () => void;
	className?: string;
	children: any;
}
const UnfoldingCard = ({ isFullCard, closeCard, className, children }: UnfoldingCardProps) => {

	const cardRef = useRef(null)
	const { modalState, blurModalState } = useModalState()

	useClickOutside({
		ref: cardRef,
		callback: closeCard,
		conditionsList: [isFullCard]
	})

	useCloseOnEsc({
		callback: closeCard,
		conditionsList: [isFullCard, !modalState, !blurModalState]
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