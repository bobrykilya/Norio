import { IBlockRepository } from '@type/DB-types'
import queryDB from '@utils/queryDB'



class BlockRepository {
	static async createBlock({
								 interCode,
								 deviceId,
								 userId,
								 lockTime,
								 unlockTime,
								 deviceIP,
								 fingerprintHash,
							 }: IBlockRepository) {

		const response = await queryDB('INSERT INTO blocks (inter_code, device_id, user_id, lock_time, unlock_time, ip, finger_print, is_active) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING unlock_time ',
			[
				interCode,
				deviceId || null,
				userId,
				lockTime,
				unlockTime,
				unlockTime ? null : deviceIP, //* deviceIP
				fingerprintHash,
				true, //* isActive
			])

		return response.rows[0]
	}

	static async getBlockedDeviceInfo({
										  deviceId = 0,
										  fingerprintHash,
										  deviceIP = '',
									  }: Pick<IBlockRepository, 'deviceId' | 'fingerprintHash' | 'deviceIP'>) {

		const response = await queryDB('SELECT block_id, unlock_time, inter_code FROM blocks WHERE is_active=true AND (device_id=$1 OR finger_print=$2 OR ip=$3)',
			[
				deviceId,
				fingerprintHash,
				deviceIP,
			])

		return response.rows[0]
	}

	static async setIsActiveStatusByBlockId({ blockId, status }: Pick<IBlockRepository, 'blockId' | 'status'>) {
		await queryDB('UPDATE blocks SET is_active=$1 WHERE block_id=$2', [status, blockId])
	}

	static async setUnlockTime({ deviceId, unlockTime }: Pick<IBlockRepository, 'deviceId' | 'unlockTime'>) {
		await queryDB('UPDATE blocks SET unlock_time=$1 WHERE device_id=$2', [unlockTime, deviceId])
	}
}

export default BlockRepository
