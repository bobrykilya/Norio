import pool from "../db.js"



class AuthDeviceRepository {
	static async createDevice({ fingerprint, regTime, deviceType }) {
		const browser = fingerprint.components.useragent.browser.family + ' v.' + fingerprint.components.useragent.browser.version
		const os = fingerprint.components.useragent.os.family + ' v.' + fingerprint.components.useragent.os.major

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

	static async setBlockStatusForDevice({ deviceId, status }) {
		await pool.query("UPDATE auth_devices SET is_blocked=$1 WHERE id=$2", [status, deviceId])
	}
}

export default AuthDeviceRepository