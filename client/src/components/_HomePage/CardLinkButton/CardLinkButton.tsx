import React, { forwardRef } from 'react'
import { BsArrowUpRight } from "react-icons/bs"
import { IoClose } from "react-icons/io5"
import ToolTip, { ToolTipProps } from "../../others/ToolTip/ToolTip"



type CardLinkButtonProps = {
	link?: string;
	onClick?: () => void;
	toolTip?: ToolTipProps;
	disabled?: boolean;
	isCloseIcon?: boolean;
}
const CardLinkButton = forwardRef(({ link, onClick, toolTip, disabled, isCloseIcon }: CardLinkButtonProps, ref?: React.LegacyRef<HTMLButtonElement>) => {

	const openLink = () => {
		document.location = `/home/${openLink}`
	}

	return (
		<button
			className={`card_link-button cont ${isCloseIcon ? 'close_icon_opened' : ''}`}
			onClick={onClick ? onClick : openLink}
			ref={ref}
			disabled={disabled}
			tabIndex={-1}
		>
			<div
			    className={'fa_icons_tooltip-cont cont'}
			>
				<div
					className={'fa_icons_switch-cont cont'}
				>
					<div
						className={'fa_icon-cont cont'}
					>
						<IoClose className={'fa-icon close-icon'}/>
					</div>
					<div
						className={'fa_icon-cont cont'}
					>
						<BsArrowUpRight strokeWidth={0.5} className={'fa-icon link-icon'}/>
					</div>
				</div>
			</div>
			{toolTip && <ToolTip {...toolTip} />}
		</button>
	)
})

export default CardLinkButton