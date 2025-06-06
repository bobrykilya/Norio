import { ILogRepository } from '@type/DB-types'
import queryDB from '@utils/queryDB'



class LogAuthRepository {
	static async createLogAuth({ interCode, userId, deviceId, logTime }: ILogRepository) {

		// await queryDB("INSERT INTO _log_Auth (inter_code, user_id, device_id, log_time) VALUES ($1, $2, $3, $4)", [
		// 	interCode,
		// 	userId,
		// 	deviceId,
		// 	logTime,
		// ])
	}

	static async getLogAuth() {
		const response = await queryDB('SELECT * FROM _log_Auth')

		return response.rows
	}
}

export default LogAuthRepository
