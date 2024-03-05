import pool from "../db.js"



class LogAuthRepository {
	static async createLogAuth({ typeCode, userId, deviceId, logTime }) {

		await pool.query("INSERT INTO _log_Auth (type_code, user_id, device_id, log_time) VALUES ($1, $2, $3, $4)", [
			typeCode, 
			userId, 
			deviceId, 
			logTime, 
		])
	}

	static async getLogAuth() {
		const response = await pool.query("SELECT * FROM _log_Auth")

		return response.rows
	}
}

export default LogAuthRepository