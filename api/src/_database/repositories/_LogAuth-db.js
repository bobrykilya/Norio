import queryDB from '../../utils/queryDB.js'



class LogAuthRepository {
	static async createLogAuth({ interCode, userId, deviceId, logTime }) {

		// await queryDB("INSERT INTO _log_Auth (inter_code, user_id, device_id, log_time) VALUES ($1, $2, $3, $4)", [
		// 	interCode,
		// 	userId,
		// 	deviceId,
		// 	logTime.toString(),
		// ])
	}

	static async getLogAuth() {
		const response = await queryDB("SELECT * FROM _log_Auth")

		return response.rows
	}
}

export default LogAuthRepository
