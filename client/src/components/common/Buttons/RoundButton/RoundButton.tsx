import React, { ReactNode } from "react"



type RoundButtonProps = {
	children: ReactNode;
	onClick: () => void;
	className?: string;
}
const RoundButton = ({children, onClick, className}: RoundButtonProps) => {


	return (
		<button
			className={`round-button cont before_but-hover ${className || ''}`}
			onClick={onClick}
			type='button'
			tabIndex={-1}
		>
			{children}
		</button>
	)
}

export default RoundButton