import AuthDeviceRepository from '../_database/repositories/AuthDevice-db'
import _logAttentionRepository from '../_database/repositories/_logAttention-db'
import getBrowserAndOs from '../utils/getBrowserAndOs'
import { Errors } from '../utils/Errors'
import getCodeDescription from '../utils/interCodes'
import BlockRepository from '../_database/repositories/Block-db'
import { getEndTime } from "../utils/getTime"
import { ICommonVar } from "../../../common/types/Global-types"



type IGetDeviceId = {
	interCode: ICommonVar['interCode'];
	fingerprint: ICommonVar['fingerprint'];
	userId: ICommonVar['userId'];
	queryTime: ICommonVar['queryTime'];
	deviceType: ICommonVar['deviceType'];
	lsDeviceId: ICommonVar['lsDeviceId'];
	deviceIP: ICommonVar['deviceIP'];
}

type IDeviceIdHandlingAndUpdating = {
	fingerprint: ICommonVar['fingerprint'];
	userId: ICommonVar['userId'];
	queryTime: ICommonVar['queryTime'];
	lsDeviceId: ICommonVar['lsDeviceId'];
	deviceIP?: ICommonVar['deviceIP'];
}

type ICreateNewDeviceWithHandling = {
	interCode: ICommonVar['interCode'];
	fingerprint: ICommonVar['fingerprint'];
	userId: ICommonVar['userId'];
	queryTime: ICommonVar['queryTime'];
	deviceType: ICommonVar['deviceType'];
	deviceIP: ICommonVar['deviceIP'];
}

type ICheckDeviceForBlock = {
	fingerprint: ICommonVar['fingerprint'];
	queryTime: ICommonVar['queryTime'];
	deviceId?: ICommonVar['deviceId'];
	deviceIP?: ICommonVar['deviceIP'];
}

type IBlockDevice = {
	interCode: ICommonVar['interCode'];
	userId: ICommonVar['userId'];
	deviceId: ICommonVar['deviceId'];
	logTime: ICommonVar['logTime'];
	fingerprint: ICommonVar['fingerprint'];
	deviceIP?: ICommonVar['deviceIP'];
}

class DeviceService {
    
    static async getDeviceId({ interCode, fingerprint, userId, queryTime, deviceType, lsDeviceId, deviceIP }: IGetDeviceId) {
        return await this.deviceIdHandlingAndUpdating({ lsDeviceId, fingerprint, userId, queryTime, deviceIP }) ||
            await this.createNewDeviceWithHandling({ interCode, fingerprint, userId, queryTime, deviceType, deviceIP })
    }

    static async deviceIdHandlingAndUpdating ({ lsDeviceId, fingerprint, userId, queryTime, deviceIP }: IDeviceIdHandlingAndUpdating) {

        // console.log(lsDeviceId)
        if (lsDeviceId) {

            const savedDeviceIdInDB = await AuthDeviceRepository.getDeviceId(fingerprint.hash)

            if (savedDeviceIdInDB) {
                if (savedDeviceIdInDB !== lsDeviceId){
                    //* Handling if db has this fingerprint, but device has others deviceId
                    await this.blockDevice({ interCode: 804, userId, deviceId: savedDeviceIdInDB, logTime: queryTime, fingerprint, deviceIP  })
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
                    //* Handling if db has deviceId with others browser or OS
                    await this.blockDevice({ interCode: 806, userId, deviceId: lsDeviceId, logTime: queryTime, fingerprint, deviceIP })
                }
            }

        } else return null
    }

    static async createNewDeviceWithHandling ({ interCode, fingerprint, userId, queryTime, deviceType, deviceIP }: ICreateNewDeviceWithHandling) {
        let deviceId: ICommonVar['deviceId']

        try {
            deviceId = await AuthDeviceRepository.createDevice({ fingerprint, regTime: queryTime, deviceType, deviceIP  })
            await _logAttentionRepository.createLogAttention({ interCode, userId, deviceId, logTime: queryTime })
        }catch {
            //* Handling if db have this fingerprint, but device doesn't have number in LocalStorage
            deviceId = await AuthDeviceRepository.getDeviceId(fingerprint.hash)
            await _logAttentionRepository.createLogAttention({ interCode: 803, userId, deviceId, logTime: queryTime })
        }
        return deviceId
    }

    static async checkDeviceForBlock({ fingerprint, queryTime, deviceId, deviceIP }: ICheckDeviceForBlock) {
        // console.log({ fingerprint, queryTime, deviceId, deviceIP })

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
        throw Errors.blockDevice({
            interCode: inter_code,
            description: getCodeDescription(inter_code).message,
            unlockTime: Number(unlock_time),
        })
    }

    static async blockDevice({ interCode, userId, deviceId, logTime, fingerprint, deviceIP }: IBlockDevice) {
        // console.log({ interCode, userId, deviceId, logTime, fingerprint, deviceIP })

        await _logAttentionRepository.createLogAttention({ interCode, userId, deviceId, logTime })

        const { lockDuration } = getCodeDescription(interCode)
        await BlockRepository.createBlock({
            interCode,
            deviceId: deviceId,
            userId,
            lockTime: logTime,
            unlockTime: lockDuration ? getEndTime({ startTimeInSec: logTime, duration: lockDuration, durationType: 'minute' }) : 0,
            deviceIP,
            fingerprintHash: fingerprint.hash
        })
            .then(async ({ unlock_time }) => {
                throw Errors.blockDevice({
                    interCode,
                    description: getCodeDescription(interCode).message,
                    unlockTime: Number(unlock_time),
                })
            })
    }
}


export default DeviceService
