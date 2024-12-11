import React, { useEffect, useState } from 'react'
import { showSnackMessage } from "../../../features/showSnackMessage/showSnackMessage"
import CardLinkButton from "../CardLinkButton/CardLinkButton"
import SelectButton, { ISelectButtonOptionListElem } from "../../common/Inputs/SelectButton/SelectButton"
import { FaLocationDot } from "react-icons/fa6"
import { CITIES_LIST } from "../../../assets/common/Common-data"
import { useDeviceInfoState } from "../../../stores/Device-store"



type WeatherCardProps = {

}
const WeatherCard = ({  }: WeatherCardProps) => {

	const { deviceInfoState, setDeviceCityState } = useDeviceInfoState()
	const [isGeoAllowed, setIsGeoAllowed] = useState(false)
	const deviceType = deviceInfoState?.type
	const deviceCity = deviceInfoState?.location?.city


	// @ts-ignore
	const CITIES_AND_LOCATION_LIST: ISelectButtonOptionListElem[] = CITIES_LIST.concat({
		id: 'myLocation',
		title: 'Мои координаты',
		icon: <FaLocationDot className={'fa-icon'} />,
		isFixed: true,
	})

	const saveSelectedCity = async ({ id, title }: { id: string, title: string }) => {
		if (id === 'myLocation') {
			title = 'Разрешите доступ к геоданным'
		}

		setDeviceCityState({ id, title })
		localStorage.setItem('deviceInfo', JSON.stringify({ ...deviceInfoState, location: { city: { id, title } } }))
	}

	const getCoords = () => {
		return navigator.geolocation.getCurrentPosition(geoSuccess, geoError)
	}
	const geoSuccess = ({ coords }) => {
		setIsGeoAllowed(true)
		console.log(coords)
		return coords.latitude
	}
	const geoError = (err: any) => {
		// console.log(`Geo fail:`)
		// console.log(err)
		showSnackMessage({ message: err.message, type: 'w' })
		setIsGeoAllowed(false)
	}

	useEffect(() => {

		if (deviceType !== 'Desktop') {
			getCoords()
		}
	}, [deviceInfoState])

	return (
		<div
			className={'weather-card cont card'}
		>
			<div
				className={'weather_card-header cont'}
			>
				<SelectButton
					OPTIONS_LIST={CITIES_AND_LOCATION_LIST}
					selectedState={deviceCity}
					onClick={saveSelectedCity}
					needToSort={true}
					toolTip={{
						text: 'Выбрать город для прогноза погоды',
						position: 'bottom'
					}}
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