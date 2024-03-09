import pool from "../db.js"



class AuthDeviceRepository {
	static async createDevice({ fingerprint, regTime }) {
		const browser = fingerprint.components.useragent.browser.family + ' v.' + fingerprint.components.useragent.browser.version
		const os = fingerprint.components.useragent.os.family + ' v.' + fingerprint.components.useragent.os.major
		const block = false

		const response = await pool.query("INSERT INTO auth_devices (finger_print, browser, os, reg_time, block) VALUES ($1, $2, $3, $4, $5) RETURNING id",
			[
				fingerprint.hash,
				browser,
				os,
				regTime,
				block,
			])

		return response.rows[0]?.id
	}

	static async getDeviceId(fingerprintHash) {
		const response = await pool.query("SELECT * FROM auth_devices WHERE finger_print=$1", [fingerprintHash])

		return response.rows[0]?.id
	}

	static async setBlockStatusForDevice({ deviceId, status }) {
		await pool.query("UPDATE auth_devices SET block=$1 WHERE id=$2", [status, deviceId])
	}
}

export default AuthDeviceRepository