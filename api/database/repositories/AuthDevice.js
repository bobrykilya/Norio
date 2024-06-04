import pool from "../db.js"



const getBrowserAndOs = (fingerprint) => {
	const browser = fingerprint.components.useragent.browser.family + ' v.' + fingerprint.components.useragent.browser.version
	const os = fingerprint.components.useragent.os.family + ' v.' + fingerprint.components.useragent.os.major
	return { browser, os }
}

class AuthDeviceRepository {
	static async createDevice({ fingerprint, regTime, deviceType }) {
		const { browser, os } = getBrowserAndOs(fingerprint)

		const response = await pool.query("INSERT INTO auth_devices (type, browser, os, reg_time, finger_print, is_blocked) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id",
			[
				deviceType,
				browser,
				os,
				regTime,
				fingerprint.hash,
				false,
			])

		return response.rows[0]?.id
	}

	static async getDeviceId(fingerprintHash) {
		const response = await pool.query("SELECT * FROM auth_devices WHERE finger_print=$1", [fingerprintHash])

		return response.rows[0]?.id
	}

	static async getDeviceHash(deviceId) {
		const response = await pool.query("SELECT * FROM auth_devices WHERE id=$1", [deviceId])

		return response.rows[0]?.fingerprint
	}

	static async setBlockStatusForDevice({ deviceId, status }) {
		await pool.query("UPDATE auth_devices SET is_blocked=$1 WHERE id=$2", [status, deviceId])
	}

	static async updateDeviceHash({ fingerprint, deviceId }) {
		const { browser } = getBrowserAndOs(fingerprint)

		await pool.query("UPDATE auth_devices SET browser=$1, finger_print=$2 WHERE id=$3", [browser, fingerprint.hash, deviceId])
	}
}

export default AuthDeviceRepository