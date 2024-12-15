import { IDeviceLocation } from "../../../common/types/Device-types.ts"
import { $apiWeather } from "../http/http.ts"


// const deleteKeyInObject = async (object, key) => {
// 	// console.log(typeof object)
// 	if (!(object instanceof Object)) return
// 	delete object?.key
//
// 	Object.keys(object).forEach((k) => {
// 		if (object?.k instanceof Object) {
// 			deleteKeyInObject(object?.k, key)
// 		}
// 		if (Array.isArray(object?.k)) {
// 			object?.k.forEach(item => deleteKeyInObject(item, key))
// 		}
// 	})
// 	// console.log()
// }

const deleteKeyInObject = (object, keysList: string[]) => {
	let newObject = {
		current: {},
		hourly: {},
		daily: {},
	}
	keysList.forEach(i => {
		if (!object['current'][i]) {
			Object.keys(object).forEach(k => {
				if (object[k] instanceof Object) {

				}
			})
		} else {
			newObject['current'][i] = object['current'][i]
		}
	})

	return newObject
}

class WeatherService {
	static async getLocationWeather(location: IDeviceLocation) {
		const key_list = ['dt', 'rain', 'snow', 'temp', 'feels_like', 'humidity', 'weather']
		// console.log(location)
		// let locationWeather: ILocationWeather = null
		// locationWeather = JSON.parse(await redisGet(location.city.id))


		const weatherData = await $apiWeather.get('onecall', {
			searchParams: {
				lat: location.coords.lat,
				lon: location.coords.lon,
			},
		}).json<any>()

		const locationWeather = deleteKeyInObject(weatherData, key_list)
		// const locationWeather = {}
		// locationWeather.current = weatherData.current


		// await redisDisconnect()

		return locationWeather
	}
}

export default WeatherService
