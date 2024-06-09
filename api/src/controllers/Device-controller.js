import DeviceService from '../services/Device-service.js'



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
            const {  } = await DeviceService.blockDevice({ 
                logTime,
                unlockTime,
                userInfo,
                deviceId,
                deviceIP,
                fingerprint,
            })

            return res.status(200).json({  })
        } catch (err) {
            console.log(err)
            // return ErrorsUtils.catchError({ typeCode: 900, req, res, err, username, fingerprint, queryTimeString })
        }
    }
}

export default DeviceController