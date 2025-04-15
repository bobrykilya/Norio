import React, { forwardRef } from 'react'
import ToolTip, { ToolTipProps } from "../../../others/ToolTip/ToolTip"



export type RoundButtonProps = {
	onClick?: (...arg: any[]) => void;
	className?: string;
	disabled?: boolean;
	toolTip?: ToolTipProps;
	size?: 'tiny' | 'norm' | 'small' | 'big'
	isSubmitBut?: boolean;
	children?: any;
}
const RoundButton = forwardRef<HTMLButtonElement, RoundButtonProps>(({ onClick, className, disabled, toolTip, size='norm', isSubmitBut, children }, ref) => {


	return (
		<button
			className={`${className || ''} round-but ${size} cont`}
			onClick={onClick}
			type={!isSubmitBut ? 'button' : 'submit'}
			tabIndex={!isSubmitBut ? -1 : 0}
			disabled={disabled}
			ref={ref}
		>
			{children}
			{toolTip && <ToolTip { ...toolTip } />}
		</button>
	)
})

export default RoundButton