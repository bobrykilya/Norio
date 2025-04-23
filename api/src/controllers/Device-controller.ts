import DeviceService from '../services/Device-service'
import { ICommonVar } from "../../../common/types/Global-types"
import WeatherService from "../services/Weather-service.ts"
import { catchError } from "../utils/Errors.ts"
import { IDeviceLocationReq } from "../../../common/types/Device-types.ts"



class DeviceController {
    static async blockDevice(req: ICommonVar['req'], res: ICommonVar['res']) {
        const { 
            logTime,
            userId,
            deviceId,
            deviceIP,
            interCode,
        } = req.body
        const { fingerprint } = req

        try {
            await DeviceService.blockDevice({ 
                interCode,
                userId,
                deviceId,
                logTime,
                fingerprint,
                deviceIP,
            })

            return res.status(200)
        } catch (err) {
            return catchError({ req, res, err, queryTime: logTime })
        }
    }

	static async getWeather(req: ICommonVar['req'], res: ICommonVar['res']) {
		try {
			const data = await WeatherService.getWeatherByCoords(req.query as unknown as IDeviceLocationReq)

			return res.status(200).json(data)
		} catch (err) {
			return catchError({ req, res, err })
		}
	}
}

export default DeviceController
