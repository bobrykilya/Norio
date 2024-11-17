import React from 'react'
import { BsArrowUpRight } from "react-icons/bs"



type CardLinkButtonProps = {
	link: string;
}
const CardLinkButton = ({ link }: CardLinkButtonProps) => {

	const openFullWeather = () => {
		// document.location = '/home/weather'
	}

	return (
		<button
			className={'card_link-button'}
			onClick={openFullWeather}
		>
			<BsArrowUpRight strokeWidth={0.5} className={'fa-icon'} />
		</button>
	)
}

export default CardLinkButton