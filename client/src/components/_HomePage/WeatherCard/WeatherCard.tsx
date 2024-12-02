import React from 'react'



type WeatherCardProps = {}
const WeatherCard = ({}: WeatherCardProps) => {

	const getAddress = () => {
		navigator.geolocation.getCurrentPosition(function (position) {
			// console.log(position.coords.latitude, position.coords.longitude)
			console.log(position)
		})
	}

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
				{/*<CardLinkButton link={''} />*/}
				<button
					onClick={getAddress}
				>
					vsdvds
				</button>
			</div>
			<div
				className={'weather_part-cont cont'}
			>
				<div
					className={'weather_el-cont'}
				>
					<p
						className={'now_label'}
					>
						Сейчас
					</p>
					<div
						className={'weather_icon-cont'}
					>
						{/*<img src={} alt="" >*/}

					</div>

				</div>
				<div
					className={'now_temperature'}
				>

				</div>
				<p
					className={'next_1_label'}
				>
					Вечером
				</p>
				<p
					className={'next_2_label'}
				>
					Ночью
				</p>
				<p
					className={'next_3_label'}
				>
					Утром
				</p>
			</div>
		</div>
	)
}

export default WeatherCard