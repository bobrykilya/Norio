import React, { useRef } from 'react'
import { useClickOutside } from "../../../hooks/useClickOutside"
import useCloseOnEsc from "../../../hooks/useCloseOnEsc"



type UnfoldingCardProps = {
	isFullCard: boolean;
	toggleCard: () => void;
	className?: string;
	children: any;
}
const UnfoldingCard = ({ isFullCard, toggleCard, className, children }: UnfoldingCardProps) => {

	const cardRef = useRef(null)

	useClickOutside({
		ref: cardRef,
		callback: toggleCard,
		condition: isFullCard
	})

	useCloseOnEsc({
		conditionsList: [isFullCard],
		callback: toggleCard
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