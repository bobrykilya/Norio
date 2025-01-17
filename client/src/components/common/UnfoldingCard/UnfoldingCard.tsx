import React, { forwardRef, useRef } from 'react'
import { useClickOutside } from "../../../hooks/useClickOutside"
import useCloseOnEsc from "../../../hooks/useCloseOnEsc"



type UnfoldingCardProps = {
	isFullCard: boolean;
	toggleCard: () => void;
	className?: string;
	children: any;
}
const UnfoldingCard = forwardRef(({ isFullCard, toggleCard, className, children }: UnfoldingCardProps, toggleButtonRef: React.MutableRefObject<HTMLButtonElement>) => {

	const cardRef = useRef(null)

	useClickOutside({
		ref: cardRef,
		butRef: toggleButtonRef,
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
})

export default UnfoldingCard