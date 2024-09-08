import AuthDeviceRepository from '../_database/repositories/AuthDevice-db.js'
import _logAttentionRepository from '../_database/repositories/_logAttention-db.js'
import getBrowserAndOs from '../utils/getBrowserAndOs.js'
import {BlockDevice} from '../utils/errors.js'
import getCodeDescription from '../utils/Inter_codes.js'
import BlockRepository from '../_database/repositories/Block-db.js'



class DeviceService {
    
    static async getDeviceId({ interCode, fingerprint, userId, queryTime, deviceType, lsDeviceId, deviceIP }) {
        return await this.deviceIdHandlingAndUpdating({ lsDeviceId, fingerprint, userId, queryTime, deviceIP }) ||
            await this.createNewDeviceWithHandling({ interCode, fingerprint, userId, queryTime, deviceType, deviceIP })
    }

	static async checkDeviceForBlock({ deviceId, fingerprint, deviceIP=false }) {

		const blockedDeviceInfo = await BlockRepository.getBlockedDeviceInfo({ deviceId, fingerprintHash: fingerprint.hash, deviceIP })
		// console.log(blockedDeviceInfo)

		if (blockedDeviceInfo?.inter_code) {
			if (blockedDeviceInfo?.unlock_time)
				throw new BlockDevice({
					unlockTime: Number(blockedDeviceInfo.unlock_time),
					description: getCodeDescription(blockedDeviceInfo.inter_code).message,
					interCode: blockedDeviceInfo.inter_code,
				})
			else
				throw new BlockDevice({ infinityBlock: true })
		}
	}

    static async blockDevice({ logTime, unlockTime, userInfo, deviceId, deviceIP, fingerprint, interCode }) {
        // console.log({ logTime, unlockTime, userInfo, deviceId, deviceIP, fingerprint, interCode })

		const isBlocked = await BlockRepository.getBlockedDeviceInfo({ deviceId, fingerprintHash: fingerprint.hash, deviceIP })
		
		if (!isBlocked) {
			await BlockRepository.createBlock({ interCode, deviceId, userInfo, blockTime: logTime, unlockTime, deviceIP, fingerprintHash: fingerprint.hash })
				.catch(async () => {
					//* Handling for block-db if device has unknown deviceId
					await BlockRepository.createBlock({ interCode, deviceId: null, userInfo, blockTime: logTime, unlockTime, deviceIP, fingerprintHash: fingerprint.hash })
				})
		}
    }

    static async deviceIdHandlingAndUpdating ({ lsDeviceId, fingerprint, userId, queryTime, deviceIP }) {

        // console.log(lsDeviceId)
        if (lsDeviceId) {

            const savedDeviceIdInDB = await AuthDeviceRepository.getDeviceId(fingerprint.hash)

            if (savedDeviceIdInDB) {
                if (savedDeviceIdInDB !== lsDeviceId){
                    //* Handling if db has this fingerprint, but device has other deviceId
                    await _logAttentionRepository.createLogAttention({ interCode: 804, userId, deviceId: savedDeviceIdInDB, logTime: queryTime })
                    throw new BlockDevice(getCodeDescription(804))
                    //! Block device
                } else return lsDeviceId
            } else {
                const deviceInDB = await AuthDeviceRepository.getDeviceById(lsDeviceId)

                //* Handling if device has number, but this device hasn't been registered/has been removed
                if (!deviceInDB) {
                    try {
                        await _logAttentionRepository.createLogAttention({ interCode: 805, userId, deviceId: lsDeviceId, logTime: queryTime })
                    } catch {

                    }
                    return null
                }

                const { browser, bVersion, os } = getBrowserAndOs(fingerprint)

                if (deviceInDB.browser === browser && deviceInDB.os === os
                    && deviceInDB.b_version !== bVersion
                ) {
                    //* Handling if device has number, but fingerprint in db is different (Browser has been updated)
                    console.log('Device ' + lsDeviceId + ' has been updated')
                    await AuthDeviceRepository.updateDevice({ fingerprint, deviceId: lsDeviceId, bVersion, deviceIP })
                    return lsDeviceId
                } else {
                    //* Handling if db has deviceId with other browser or OS
                    await _logAttentionRepository.createLogAttention({ interCode: 804, userId, deviceId: lsDeviceId, logTime: queryTime })
                    throw new BlockDevice(getCodeDescription(804))
                    //! Block device
                }
            }

        } else return null
    }

    static async createNewDeviceWithHandling ({ interCode, fingerprint, userId, queryTime, deviceType, deviceIP }) {
        let deviceId

        try {
            deviceId = await AuthDeviceRepository.createDevice({ fingerprint, regTime: queryTime, deviceType: deviceType || 'Unknown', deviceIP  })

            await _logAttentionRepository.createLogAttention({ interCode, userId, deviceId, logTime: queryTime })
        }catch {
            //* Handling if db have this fingerprint, but device doesn't have number in LocalStorage
            deviceId = await AuthDeviceRepository.getDeviceId(fingerprint.hash)
            await _logAttentionRepository.createLogAttention({ interCode: 803, userId, deviceId, logTime: queryTime })
        }
        return deviceId
    }
}


export default DeviceService
