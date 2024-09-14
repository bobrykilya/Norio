import DeviceService from '../services/Device-service.js'
import ErrorsUtils from "../utils/errors.js"



class DeviceController {
    static async blockDevice(req, res) {
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
                logTime,
                userId,
                deviceId,
                deviceIP,
                fingerprint,
                interCode,
            })

            return res.status(200)
        } catch (err) {
            return ErrorsUtils.catchError({ interCode: 900, req, res, err, fingerprint, queryTimeString: logTime })
        }
    }
}

export default DeviceController
