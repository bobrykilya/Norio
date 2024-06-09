import AuthDeviceRepository from '../_database/repositories/AuthDevice-db.js'



class DeviceService {
    static async blockDevice({ logTime, unlockTime, userInfo, deviceId, deviceIP, fingerprint }) {
        console.log(unlockTime)

        // await AuthDeviceRepository.setUnlockTime({ deviceId, unlockTime })
        // await AuthDeviceRepository.updateDevice({ fingerprint, deviceId })
    }
}


export default DeviceService