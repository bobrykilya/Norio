import { IDeviceLocation } from "../../../common/types/Device-types"
import { showSnackMessage } from "../features/showSnackMessage/showSnackMessage"
import { $apiUnprotected } from "../http/http"



class WeatherService {
	static async getLocationWeather(location: IDeviceLocation) {
		try {
			// return useQuery('weather', async () => {
				return await $apiUnprotected.post("weather", { json: location })?.json<any>()
			// })
		} catch (err) {
			showSnackMessage(err)
			throw new Error('getLocationWeather error')
		}
	}
}

export default WeatherService