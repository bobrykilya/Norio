import React from 'react'
import JumpingCard from "../../../common/JumpingCard/JumpingCard"
import { useTopCardState } from "../../../../stores/Settings-store"



type TopCardProps = {

}
const TopCard = ({  }: TopCardProps) => {

	const { setTopCardState, topCardState } = useTopCardState()

	const closeTopCard = () => {
		setTopCardState(false)
	}

	return (
		<JumpingCard
			isCardOpened={topCardState}
			closeCard={closeTopCard}
			className={'top_card-cover'}
			position={'top'}
		>
			<div
			    className={'top-card cont'}
			>
			    
			</div>
		</JumpingCard>
	)
}

export default TopCard