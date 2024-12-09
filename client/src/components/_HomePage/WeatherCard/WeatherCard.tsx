import React, { useEffect, useState } from 'react'
import { showSnackMessage } from "../../../features/showSnackMessage/showSnackMessage"
import { IDeviceInfo } from "../../../types/Auth-types"
import CardLinkButton from "../CardLinkButton/CardLinkButton"
import SelectButton, { ISelectButtonOptionListElem } from "../../common/Inputs/SelectButton/SelectButton"
import { FaLocationDot } from "react-icons/fa6"
import timeout from "../../../utils/timeout"



const CITIES_LIST: ISelectButtonOptionListElem[] = [
	{
		id: 'molodechno',
		title: 'Молодечно',
	},
	{
		id: 'krasnoe',
		title: 'Красное',
	},
	{
		id: 'polock',
		title: 'Полоцк',
	},
	{
		id: 'glubokoe',
		title: 'Глубокое',
	},
	{
		id: 'radoshkovochi',
		title: 'Радошковичи',
	},
	{
		id: 'turly',
		title: 'Тюрли',
	},
]

const getDeviceInfoFromLS = async () => {
	await timeout(200)
	return JSON.parse(localStorage.getItem('deviceInfo'))?.city
}

type WeatherCardProps = {
	lsDeviceInfo: IDeviceInfo;
}
const WeatherCard = ({ lsDeviceInfo }: WeatherCardProps) => {
	const [isGeoAllowed, setIsGeoAllowed] = useState(false)
	const deviceType = lsDeviceInfo?.type
	const deviceCityId = lsDeviceInfo?.city
	// console.log(deviceCityId)

	const CITIES_AND_LOCATION_LIST = CITIES_LIST.concat({
		id: 'myLocation',
		title: 'Мои координаты',
		icon: <FaLocationDot className={'fa-icon'} />,
		isFixed: true,
		otherTitle: true,
	})

	const getCityTitle = (cityId: string, strictly?: boolean) => {
		if (cityId === 'myLocation') {
			return 'Лох'
		}
		if (!strictly) return null
		return CITIES_AND_LOCATION_LIST.find(el => el.id === cityId)?.title
	}

	const saveSelectedCity = async (cityId: string) => {
		localStorage.setItem('deviceInfo', JSON.stringify({ ...lsDeviceInfo, city: cityId }))
		return getCityTitle(cityId)
	}

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

		if (!deviceCityId && deviceType !== 'Desktop') {
			getCoords()
		}
	}, [lsDeviceInfo])

	return (
		<div
			className={'weather-card cont card'}
		>
			<div
				className={'weather_card-header cont'}
			>
				<SelectButton
					selected={{
						id: deviceCityId,
						title: getCityTitle(deviceCityId, true),
					}}
					OPTIONS_LIST={CITIES_AND_LOCATION_LIST}
					onClick={saveSelectedCity}
					needToSort={true}
				/>
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