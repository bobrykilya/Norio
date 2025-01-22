import React from 'react'
import { BsArrowUpRight } from "react-icons/bs"
import { IoClose } from "react-icons/io5"
import RoundButton, { RoundButtonProps } from "../../common/Buttons/RoundButton/RoundButton"



type CardLinkButtonProps = Pick<RoundButtonProps, 'toolTip' | 'disabled'> & {
	onClick?: () => void;
	link?: string;
	isCloseIcon?: boolean;
}
const CardLinkButton = ({ onClick, link, isCloseIcon, ...props }: CardLinkButtonProps) => {

	const openLink = () => {
		document.location = `/home/${openLink}`
	}

	return (
		<RoundButton
			className={`card_link-but clear-but ${isCloseIcon ? 'close_icon_opened' : ''}`}
			onClick={onClick ? onClick : openLink}
			size={'small'}
			{...props}
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
		</RoundButton>
	)
}

export default CardLinkButton