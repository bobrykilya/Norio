import React, { useEffect, useState } from 'react'
import { showSnackMessage } from "../../../features/showSnackMessage/showSnackMessage"
import { IDeviceInfo } from "../../../types/Auth-types"
import CardLinkButton from "../CardLinkButton/CardLinkButton"
import SelectButton from "../../common/Inputs/SelectButton/SelectButton"



const CITIES_LIST = ['Молодечно', 'Красное', 'Полоцк', 'Глубокое', 'Радошковичи', 'Тюрли']

type WeatherCardProps = {}
const WeatherCard = ({}: WeatherCardProps) => {
	const [isGeoAllowed, setIsGeoAllowed] = useState(false)
	const deviceInfo: IDeviceInfo = JSON.parse(localStorage.getItem('deviceInfo'))
	const deviceType = deviceInfo?.type
	const deviceCity = deviceInfo?.city

	const getCoords = () => {
		navigator.geolocation.getCurrentPosition(geo_success, geo_error)
	}
	const geo_success = ({ coords }) => {
		setIsGeoAllowed(true)
		// console.log(coords)
	}
	const geo_error = (err: any) => {
		console.log(`Geo fail:`)
		console.log(err)
		showSnackMessage({ message: err.message, type: 'w' })
		setIsGeoAllowed(false)
	}

	useEffect(() => {
		if (!deviceCity && deviceType !== 'Desktop') {
			getCoords()
		}
	}, [deviceType])

	return (
		<div
			className={'weather-card cont card'}
		>
			<div
				className={'weather_card-header cont'}
			>
				<SelectButton selected={'Молодечно'} SELECTS_LIST={CITIES_LIST} needToSort={false} />
				<CardLinkButton link={''} />
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