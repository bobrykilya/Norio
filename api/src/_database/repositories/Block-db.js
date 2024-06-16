import getBrowserAndOs from '../../../hooks/useGetBrowserAndOS.js'
import useQueryDB from '../../../hooks/useQueryDB.js'



class BlockRepository {
	static async createBlock({ deviceId, userInfo, blockTime, unlockTime, deviceIP, fingerprintHash }) {

		const response = await useQueryDB("INSERT INTO block (device_id, user_id, block_time, unlock_time, ip, finger_print) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id",
			[
				deviceId,
				userInfo?.userId,
				blockTime,
				unlockTime,
				deviceIP,
				fingerprintHash,
			])

		return response.rows[0]?.id
	}

	static async checkIPForBlockStatus(deviceIP) {
		const response = await useQueryDB("SELECT id FROM block WHERE ip=$1", [deviceIP])

		return response.rows[0]
	}

	static async checkIdForBlockStatus(deviceId) {
		const response = await useQueryDB("SELECT unlock_time FROM block WHERE device_id=$1 ORDER BY unlock_time", [deviceId])

		return response.rows[0]
	}

	static async checkFingerprintForBlockStatus(fingerprintHash) {
		const response = await useQueryDB("SELECT unlock_time FROM block WHERE finger_print=$1 ORDER BY unlock_time", [fingerprintHash])

		return response.rows[0]
	}

	static async setUnlockTime({ deviceId, unlockTime }) {
		await useQueryDB("UPDATE unlock_time SET unlock_time=$1 WHERE id=$2", [unlockTime, deviceId])
	}

	static async saveBlockedIPForDevice({ blockedIPList, deviceId }) {

		await useQueryDB("UPDATE block SET blocked_ip=$1 WHERE id=$3", [blockedIPList, deviceId])
	}
}

export default BlockRepository