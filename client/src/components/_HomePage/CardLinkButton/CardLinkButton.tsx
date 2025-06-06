import React from 'react'

import clsx from 'clsx'

import { ICONS } from '@assets/common/Icons-data'
import RoundButton, { RoundButtonProps } from '@common/Buttons/RoundButton/RoundButton'



type CardLinkButtonProps = Pick<RoundButtonProps, 'toolTip' | 'disabled'> & {
	onClick?: () => void;
	link?: string;
	isCloseIcon?: boolean;
	className?: string;
}
const CardLinkButton = ({ onClick, link, isCloseIcon, className, ...props }: CardLinkButtonProps) => {

	const openLink = () => {
		document.location = `/home/${openLink}`
	}

	return (
		<RoundButton
			className={clsx(
				'card_link-but',
				'clear-but',
				className,
				isCloseIcon && 'close_icon_opened',
			)}
			onClick={onClick ? onClick : openLink}
			size={'s'}
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
						{ICONS.close}
					</div>
					<div
						className={'fa_icon-cont cont'}
					>
						{ICONS.link}
					</div>
				</div>
			</div>
		</RoundButton>
	)
}

export default CardLinkButton