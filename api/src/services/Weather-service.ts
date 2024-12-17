import { IDeviceLocation, ILocationWeather, ILocationWeatherElem } from "../../../common/types/Device-types.ts"
import { $apiWeather } from "../http/http.ts"
import { redisGet, redisWeatherSet } from "../utils/redisUtils.ts"
import { getTime } from "../utils/getTime.ts"
import { WEATHER_UPDATE_TIME } from "../../constants.ts"



const getWeatherObjectByKeys = (object: ILocationWeatherElem, keysList: string[]) => {
	let newObject: ILocationWeatherElem | {} = {}

	keysList.forEach(i => {
		if (object[i]) {
			newObject[i] = object[i]
		} else {
			if (object['weather'][0][i]) {
				newObject[i] = object['weather'][0][i]
			}
		}
	})

	return newObject as ILocationWeatherElem
}


class WeatherService {
	static async getLocationWeather(location: IDeviceLocation) {
		const REQUIRED_KEYS_LIST = ['dt', 'rain', 'snow', 'temp', 'feels_like', 'humidity', 'icon', 'description']

		let locationWeather: ILocationWeather

		locationWeather = await redisGet(location.city.id)
		if (!locationWeather) {
			const weatherData = await $apiWeather.get('onecall', {
				searchParams: {
					lat: location.coords.lat,
					lon: location.coords.lon,
				},
			}).json<ILocationWeather>()

			locationWeather = {
				forecastDeadTime: getTime() + (WEATHER_UPDATE_TIME * 60) + 10,
				current: getWeatherObjectByKeys(weatherData.current, REQUIRED_KEYS_LIST),
				hourly: weatherData.hourly.map((item) => getWeatherObjectByKeys(item, REQUIRED_KEYS_LIST)),
				daily: weatherData.daily.map((item) => getWeatherObjectByKeys(item, REQUIRED_KEYS_LIST)),
			}
			
			await redisWeatherSet(location.city.id, locationWeather)
		}


		return locationWeather
	}
}

export default WeatherService
