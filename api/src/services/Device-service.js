import AuthDeviceRepository from '../_database/repositories/AuthDevice-db.js'
import _logAttentionRepository from '../_database/repositories/_logAttention-db.js'
import getBrowserAndOs from '../utils/getBrowserAndOs.js'
import { BlockDevice } from '../utils/errors.js'
import getCodeDescription from '../utils/interCodes.js'
import BlockRepository from '../_database/repositories/Block-db.js'
import { getEndTime } from "../utils/getTime.js"



class DeviceService {
    
    static async getDeviceId({ interCode, fingerprint, userId, queryTime, deviceType, lsDeviceId, deviceIP }) {
        return await this.deviceIdHandlingAndUpdating({ lsDeviceId, fingerprint, userId, queryTime, deviceIP }) ||
            await this.createNewDeviceWithHandling({ interCode, fingerprint, userId, queryTime, deviceType, deviceIP })
    }

    static async deviceIdHandlingAndUpdating ({ lsDeviceId, fingerprint, userId, queryTime, deviceIP }) {

        // console.log(lsDeviceId)
        if (lsDeviceId) {

            const savedDeviceIdInDB = await AuthDeviceRepository.getDeviceId(fingerprint.hash)

            if (savedDeviceIdInDB) {
                if (savedDeviceIdInDB !== lsDeviceId){
                    //* Handling if db has this fingerprint, but device has other deviceId
                    await this.blockDevice({ interCode: 804, userId, deviceId: savedDeviceIdInDB, logTime: queryTime, deviceIP, fingerprint  })
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
                    await this.blockDevice({ interCode: 806, userId, deviceId: lsDeviceId, logTime: queryTime, deviceIP, fingerprint  })
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

    static async checkDeviceForBlock({ deviceId, fingerprint, deviceIP, queryTime }) {
        // console.log({ deviceId, fingerprint, deviceIP })

        const blockedDeviceInfo = await BlockRepository.getBlockedDeviceInfo({ deviceId, fingerprintHash: fingerprint.hash, deviceIP })
        // console.log(blockedDeviceInfo)
        if (!blockedDeviceInfo) return

        const { block_id, unlock_time, inter_code } = blockedDeviceInfo

        //* Unblock handling
        if (Number(unlock_time) !== 0 && Number(unlock_time) < queryTime) {
            await BlockRepository.setIsActiveStatusByBlockId({ blockId: block_id, status: false })
            return
        }

        //* Block notify for Client
        throw new BlockDevice({
            interCode: inter_code,
            description: getCodeDescription(inter_code).message,
            unlockTime: Number(unlock_time),
        })
    }

    static async blockDevice({ interCode, userId, deviceId, logTime, deviceIP, fingerprint }) {
        // console.log({ interCode, userId, deviceId, logTime, deviceIP, fingerprint })

        // const isBlocked = await BlockRepository.getBlockedDeviceInfo({ deviceId, fingerprintHash: fingerprint.hash, deviceIP })

        // if (!isBlocked) {
        console.log({ interCode, userId, deviceId, logTime })
        await _logAttentionRepository.createLogAttention({ interCode, userId, deviceId, logTime })

        const { lockDuration } = getCodeDescription(interCode)
        await BlockRepository.createBlock({
            interCode,
            deviceId: deviceId,
            userId,
            lockTime: logTime,
            unlockTime: lockDuration ? getEndTime({ startTime: logTime, duration: lockDuration, durationType: 'minute' }) : 0,
            deviceIP,
            fingerprintHash: fingerprint.hash
        })
            .then(async ({ unlock_time }) => {
                throw new BlockDevice({
                    interCode,
                    description: getCodeDescription(interCode).message,
                    unlockTime: Number(unlock_time),
                })
            })
        // .catch(async () => {
        // 	//* Handling for block-db if device has unknown deviceId
        // 	await BlockRepository.createBlock({ interCode, deviceId: null, userId, blockTime: logTime, unlockTime, deviceIP, fingerprintHash: fingerprint.hash })
        // })
        // }
    }
}


export default DeviceService
