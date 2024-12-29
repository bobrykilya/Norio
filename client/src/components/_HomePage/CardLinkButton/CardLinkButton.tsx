import React, { forwardRef } from 'react'
import { BsArrowUpRight } from "react-icons/bs"
import ToolTip, { ToolTipProps } from "../../others/ToolTip/ToolTip"



type CardLinkButtonProps = {
	link?: string;
	onClick?: () => void;
	toolTip?: ToolTipProps;
	disabled?: boolean;
}
const CardLinkButton = forwardRef(({ link, onClick, toolTip, disabled }: CardLinkButtonProps, ref?: React.LegacyRef<HTMLButtonElement>) => {

	const openLink = () => {
		document.location = `/home/${openLink}`
	}

	return (
		<button
			className={'card_link-button'}
			onClick={onClick ? onClick : openLink}
			ref={ref}
			disabled={disabled}
		>
			<BsArrowUpRight strokeWidth={0.5} className={'fa-icon'} />
			<ToolTip { ...toolTip } />
		</button>
	)
})

export default CardLinkButton