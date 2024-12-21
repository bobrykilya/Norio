import { IDeviceLocation, ILocationWeather } from "../../../common/types/Device-types"
import { $apiUnprotected } from "../http/http"



class WeatherService {
	static async getLocationWeather(location: IDeviceLocation) {
		try {
			return await $apiUnprotected.post("weather", { json: location })?.json<ILocationWeather>()
		} catch (err) {
			console.log(err)
			throw new Error('getLocationWeather error')
		}
	}
}

export default WeatherService