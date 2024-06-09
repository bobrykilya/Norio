import getBrowserAndOs from '../../../hooks/useGetBrowserAndOS.js'
import useQueryDB from '../../../hooks/useQueryDB.js'





class AuthDeviceRepository {
	static async createDevice({ fingerprint, regTime, deviceType }) {
		const { browser, bVersion, os } = getBrowserAndOs(fingerprint)

		const response = await useQueryDB("INSERT INTO auth_devices (type, browser, b_version, os, reg_time, finger_print) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id",
			[
				deviceType,
				browser,
				bVersion,
				os,
				regTime,
				fingerprint.hash,
			])

		return response.rows[0]?.id
	}

	static async getDeviceId(fingerprintHash) {
		const response = await useQueryDB("SELECT * FROM auth_devices WHERE finger_print=$1", [fingerprintHash])

		return response.rows[0]?.id
	}

	static async getDevice(deviceId) {
		const response = await useQueryDB("SELECT * FROM auth_devices WHERE id=$1", [deviceId])

		return response.rows[0]
	}

	static async setUnlockTime({ deviceId, unlockTime }) {
		await useQueryDB("UPDATE auth_devices SET unlock_time=$1 WHERE id=$2", [unlockTime, deviceId])
	}

	static async updateDevice({ fingerprint, deviceId }) {
		const { bVersion } = getBrowserAndOs(fingerprint)

		await useQueryDB("UPDATE auth_devices SET b_version=$1, finger_print=$2 WHERE id=$3", [bVersion, fingerprint.hash, deviceId])
	}
}

export default AuthDeviceRepository