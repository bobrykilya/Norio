import DeviceService from '../services/Device-service.js'
import ErrorsUtils from "../../utils/Errors.js"



class DeviceController {
    static async blockDevice(req, res) {
        const { 
            logTime,
            unlockTime,
            userInfo,
            deviceId,
            deviceIP,
        } = req.body
        const { fingerprint } = req

        try {
            await DeviceService.blockDevice({ 
                logTime,
                unlockTime,
                userInfo,
                deviceId,
                deviceIP,
                fingerprint,
            })

            return res.status(200)
        } catch (err) {
            // console.log(err)
            return ErrorsUtils.catchError({ typeCode: 900, req, res, err, username, fingerprint, queryTimeString })
        }
    }
}

export default DeviceController