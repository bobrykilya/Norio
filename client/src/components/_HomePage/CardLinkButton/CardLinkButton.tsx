import React from 'react'
import { BsArrowUpRight } from "react-icons/bs"
import ToolTip, { ToolTipProps } from "../../others/ToolTip/ToolTip"



type CardLinkButtonProps = {
	link: string;
	toolTip?: ToolTipProps;
}
const CardLinkButton = ({ link, toolTip }: CardLinkButtonProps) => {

	const openFullWeather = () => {
		// document.location = '/home/weather'
	}

	return (
		<button
			className={'card_link-button'}
			onClick={openFullWeather}
		>
			<BsArrowUpRight strokeWidth={0.5} className={'fa-icon'} />
			<ToolTip { ...toolTip } />
		</button>
	)
}

export default CardLinkButton