import React, { PropsWithChildren } from "react"



type CardProps = {
	className?: string;
}
const Card = ({ children, className }: PropsWithChildren<CardProps>) => {

	return (
		<div className={`cont card ${className}`}>
			{children}
		</div>
	)
}

export default Card