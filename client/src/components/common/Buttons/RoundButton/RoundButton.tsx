import React from "react"
import ToolTip, { ToolTipProps } from "../../../others/ToolTip/ToolTip"
import { ICommonVar } from "../../../../../../common/types/Global-types"



type RoundButtonProps = {
	onClick: () => void;
	icon?: ICommonVar['icon'];
	className?: string;
	disabled?: boolean;
	toolTip?: ToolTipProps;
	children?: any;
}
const RoundButton = ({ icon, onClick, className, disabled, toolTip, children }: RoundButtonProps) => {


	return (
		<button
			className={`round-button cont before_but-hover ${className || ''}`}
			onClick={onClick}
			type='button'
			tabIndex={-1}
			disabled={disabled}
		>
			{icon}
			{children}
			{toolTip && <ToolTip {...toolTip} />}
		</button>
	)
}

export default RoundButton