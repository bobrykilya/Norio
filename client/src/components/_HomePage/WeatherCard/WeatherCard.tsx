import React from 'react'
import CardLinkButton from "../CardLinkButton/CardLinkButton"



type WeatherCardProps = {}
const WeatherCard = ({}: WeatherCardProps) => {


	return (
		<div
			className={'weather-card cont card'}
		>
			<div
				className={'weather_card-header cont'}
			>
				<h3
					className={'city_name'}
				>
					Молодечно
				</h3>
				<CardLinkButton link={''} />
			</div>
			<div
				className={'weather_part-cont cont'}
			>

			</div>
		</div>
	)
}

export default WeatherCard