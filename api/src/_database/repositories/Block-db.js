import queryDB from '../../utils/queryDB.js'



class BlockRepository {
	static async createBlock({ interCode, deviceId, userInfo, blockTime, unlockTime, deviceIP, fingerprintHash }) {
		const isActive = true
		if (unlockTime) deviceIP = null

		const response = await queryDB("INSERT INTO blocks (inter_code, device_id, user_id, block_time, unlock_time, ip, finger_print, is_active) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING block_id",
			[
				interCode,
				deviceId,
				userInfo?.userId,
				blockTime.toString(),
				unlockTime.toString(),
				deviceIP,
				fingerprintHash,
				isActive,
			])

		return response.rows[0]?.block_id
	}

	static async getBlockedDeviceInfo({ deviceId, fingerprintHash, deviceIP }) {
		const response = await queryDB("SELECT unlock_time, inter_code FROM blocks WHERE is_active=true AND device_id=$1 OR finger_print=$2 OR ip=$3",
			[
				deviceId, 
				fingerprintHash, 
				deviceIP
			])

		return response.rows[0]
	}

	static async checkFingerprintForBlockStatus(fingerprintHash) {
		const response = await queryDB("SELECT unlock_time FROM blocks WHERE finger_print=$1 ORDER BY unlock_time", [fingerprintHash])

		return response.rows[0]
	}

	static async setUnlockTime({ deviceId, unlockTime }) {
		await queryDB("UPDATE blocks SET unlock_time=$1 WHERE block_id=$2", [unlockTime, deviceId])
	}

	static async saveBlockedIPForDevice({ blockedIPList, deviceId }) {

		await queryDB("UPDATE blocks SET blocked_ip=$1 WHERE block_id=$3", [blockedIPList, deviceId])
	}
}

export default BlockRepository
