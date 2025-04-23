import {
	IDeviceLocationReq,
	ILocationAddress,
	ILocationCoords,
	ILocationWeather,
	ILocationWeatherElem,
} from "../../../common/types/Device-types.ts"
import { $apiLocation, $apiWeather } from "../http/http.ts"
import { redisGet, redisWeatherSet } from "../utils/redisUtils.ts"
import { getTime } from "../utils/getTime.ts"
import { WEATHER_UPDATE_TIME_IN_MIN } from "../../constants.ts"



const getWeatherObjectByKeys = <T> (object: T, keysList: string[]) => {
	let newObject: T | {} = {}

	keysList.forEach(i => {
		if (object[i]) {
			if ((i === 'snow' || i === 'rain') && object[i]['1h']) {
				newObject[i] = object[i]['1h']
			} else {
				newObject[i] = object[i]
			}
		} else {
			if (object['weather']) {
				if (object['weather'][0][i]) {
					newObject[i] = object['weather'][0][i]
				}
			}
		}
	})

	return newObject as T
}

const getCashKeyForWeather = (location: IDeviceLocationReq) => {
	return `weather-${location.lat},${location.lon}`
}

class WeatherService {

	static async getWeatherByCoords(location: IDeviceLocationReq) {
		// console.log(location)
		const { lat, lon, title, id } = location
		let locationWeather: ILocationWeather

		locationWeather = await redisGet(getCashKeyForWeather(location))
		if (!locationWeather) {
			const REQUIRED_KEYS_LIST = ['dt', 'rain', 'snow', 'wind_gust', 'temp', 'feels_like', 'humidity', 'icon', 'description']
			const weatherData = await $apiWeather.get('onecall', { searchParams: {	lat, lon } })
				.json<ILocationWeather>()
			// console.log(weatherData)

			const currentTime = getTime()
			locationWeather = {
				cityId: id,
				cityTitle: title || (await this.getLocationCityTitleByCoords({ lat, lon })).toLowerCase(),
				timeInSec: currentTime,
				deadTimeInSec: currentTime + (WEATHER_UPDATE_TIME_IN_MIN * 60) + 10,
				current: getWeatherObjectByKeys<ILocationWeatherElem>(weatherData.current, REQUIRED_KEYS_LIST),
				hourly: weatherData.hourly.map((item) => getWeatherObjectByKeys<ILocationWeatherElem>(item, REQUIRED_KEYS_LIST)),
				daily: weatherData.daily.map((item) => getWeatherObjectByKeys<ILocationWeatherElem>(item, REQUIRED_KEYS_LIST)),
			}

			await redisWeatherSet(getCashKeyForWeather(location), locationWeather)
		}
		// console.log(locationWeather)
		return locationWeather
	}

	static async getLocationCityTitleByCoords({ lat, lon }: ILocationCoords) {
		let locationAddress: ILocationAddress['address']
		const REQUIRED_KEYS_LIST = ['city', 'town', 'village']

		const locationData = await $apiLocation.get('reverse', {
			searchParams: {
				lat,
				lon,
			}
		}).json<ILocationAddress>()
		// console.log(locationData)
		locationAddress = getWeatherObjectByKeys<ILocationAddress['address']>(locationData.address, REQUIRED_KEYS_LIST)

		return locationAddress.village || locationAddress.town || locationAddress.city
	}
}

export default WeatherService
