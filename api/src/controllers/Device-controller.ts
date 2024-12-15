import DeviceService from '../services/Device-service'
import ErrorsUtils, { NotFound } from "../utils/Errors"
import { ICommonVar } from "../../../common/types/Global-types"
import { IDeviceLocation } from "../../../common/types/Device-types.ts"
import WeatherService from "../services/Weather-service.ts"



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
            return ErrorsUtils.catchError({ interCode: 900, req, res, err, fingerprint, queryTime: logTime })
        }
    }

	static async getWeather(req: { body: IDeviceLocation }, res: ICommonVar['res']) {
		try {
			const data = await WeatherService.getLocationWeather(req.body)

			return res.status(200).json(data)
		} catch (err) {
			// throw new NotFound("Ошибка получения погоды")
			throw new NotFound(err.message)
		}
	}
}

export default DeviceController
