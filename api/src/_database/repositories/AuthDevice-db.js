import getBrowserAndOs from '../../../hooks/useGetBrowserAndOS.js'
import useQueryDB from '../../../hooks/useQueryDB.js'





class AuthDeviceRepository {
	static async createDevice({ fingerprint, regTime, deviceType, deviceIP }) {
		const { browser, bVersion, os } = getBrowserAndOs(fingerprint)

		const response = await useQueryDB("INSERT INTO auth_devices (browser, type, b_version, os, reg_time, finger_print, ip_reg) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id",
			[
				browser,
				deviceType,
				bVersion,
				os,
				regTime,
				fingerprint.hash,
				deviceIP,
			])

		return response.rows[0]?.id
	}

	static async getDeviceId(fingerprintHash) {
		const response = await useQueryDB("SELECT * FROM auth_devices WHERE finger_print=$1", [fingerprintHash])

		return response.rows[0]?.id
	}

	static async getDeviceById(deviceId) {
		const response = await useQueryDB("SELECT * FROM auth_devices WHERE id=$1", [deviceId])

		return response.rows[0]
	}

	static async updateDevice({ fingerprint, deviceId, bVersion=false, deviceIP }) {
		const browserVersion = bVersion || getBrowserAndOs(fingerprint)

		await useQueryDB("UPDATE auth_devices SET b_version=$1, finger_print=$2, ip_reg=$3 WHERE id=$4", [browserVersion , fingerprint.hash, deviceIP, deviceId])
	}
}

export default AuthDeviceRepository