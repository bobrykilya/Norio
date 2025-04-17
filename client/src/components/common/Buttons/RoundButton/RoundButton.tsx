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
	tabIndex?: number;
	bigZIndex?: boolean;
}
const RoundButton = forwardRef<HTMLButtonElement, RoundButtonProps>(({ className, toolTip, size, isSubmitBut, children, tabIndex, bigZIndex, disabled, onClick }, ref) => {


	return (
		<button
			className={`${className || ''} round-but ${size || 'norm'} ${bigZIndex && 'bigZIndex'} cont`}
			type={!isSubmitBut ? 'button' : 'submit'}
			tabIndex={tabIndex ? tabIndex : !isSubmitBut ? -1 : 0}
			ref={ref}
			disabled={disabled}
			onClick={onClick}
		>
			{children}
			{toolTip && <ToolTip { ...toolTip } />}
		</button>
	)
})

export default RoundButton