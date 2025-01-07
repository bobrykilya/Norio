import React, { ReactNode } from "react"



type RoundButtonProps = {
	children: ReactNode;
	onClick: () => void;
	className?: string;
	disabled?: boolean;
}
const RoundButton = ({ children, onClick, className, disabled }: RoundButtonProps) => {


	return (
		<button
			className={`round-button cont before_but-hover ${className || ''}`}
			onClick={onClick}
			type='button'
			tabIndex={-1}
			disabled={disabled}
		>
			{children}
		</button>
	)
}

export default RoundButton