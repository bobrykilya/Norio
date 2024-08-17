import getBrowserAndOs from '../../../hooks/useGetBrowserAndOS.js'
import useQueryDB from '../../../hooks/useQueryDB.js'



class BlockRepository {
	static async createBlock({ interCode, deviceId, userInfo, blockTime, unlockTime, deviceIP, fingerprintHash }) {
		const isActive = true
		if (unlockTime) deviceIP = null

		const response = await useQueryDB("INSERT INTO blocks (inter_code, device_id, user_id, block_time, unlock_time, ip, finger_print, is_active) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id",
			[
				interCode,
				deviceId,
				userInfo?.userId,
				blockTime,
				unlockTime,
				deviceIP,
				fingerprintHash,
				isActive,
			])

		return response.rows[0]?.id
	}

	static async checkDeviceForBlockStatus({ deviceId, fingerprintHash, deviceIP }) {
		const response = await useQueryDB("SELECT unlock_time, inter_code FROM blocks WHERE is_active=true AND device_id=$1 OR finger_print=$2 OR ip=$3",
			[
				deviceId, 
				fingerprintHash, 
				deviceIP
			])

		return response.rows[0]
	}

	static async checkFingerprintForBlockStatus(fingerprintHash) {
		const response = await useQueryDB("SELECT unlock_time FROM blocks WHERE finger_print=$1 ORDER BY unlock_time", [fingerprintHash])

		return response.rows[0]
	}

	static async setUnlockTime({ deviceId, unlockTime }) {
		await useQueryDB("UPDATE blocks SET unlock_time=$1 WHERE id=$2", [unlockTime, deviceId])
	}

	static async saveBlockedIPForDevice({ blockedIPList, deviceId }) {

		await useQueryDB("UPDATE blocks SET blocked_ip=$1 WHERE id=$3", [blockedIPList, deviceId])
	}
}

export default BlockRepository