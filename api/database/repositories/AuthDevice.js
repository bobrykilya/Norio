import pool from "../db.js"



class AuthDeviceRepository {
	static async createDevice(fingerprint) {
		const browser = fingerprint.components.useragent.browser.family + ' v.' + fingerprint.components.useragent.browser.version
		const os = fingerprint.components.useragent.os.family + ' v.' + fingerprint.components.useragent.os.major

		const response = await pool.query("INSERT INTO auth_devices (finger_print, browser, os, reg_time) VALUES ($1, $2, $3, $4) RETURNING id",
			[
				fingerprint.hash,
				browser,
				os,
				new Date(),
			])

		return response.rows[0]?.id
	}

	static async getDeviceData(fingerprintHash) {
		const response = await pool.query("SELECT * FROM auth_devices WHERE finger_print=$1", [fingerprintHash])

		return response.rows[0]?.id
	}
}

export default AuthDeviceRepository