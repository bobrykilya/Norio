import DeviceService from '../services/Device-service'
import ErrorsUtils from "../utils/Errors"
import { ICommonVar } from "../../../common/types/Global-types"



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
}

export default DeviceController
