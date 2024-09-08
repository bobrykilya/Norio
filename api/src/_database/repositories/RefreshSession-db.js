import queryDB from '../../utils/queryDB.js'
import {getTime} from "../../utils/getTime.js"



class RefreshSessionRepository {
	static async createRefreshSession({ userId, deviceId, logInTime, logOutTime=null, refreshToken }) {
		await queryDB("INSERT INTO refresh_sessions (user_id, device_id, auth_time, log_in_time, log_out_time, refresh_token) VALUES ($1, $2, $3, $4, $5, $6)", [
			userId,
			deviceId,
            getTime().toString(), //* auth_time
			logInTime.toString(),
            logOutTime ? logOutTime.toString() : null,
			refreshToken,
		])
	}

	static async getRefreshSession(refreshToken) {
		const response = await queryDB("SELECT * FROM refresh_sessions WHERE refresh_token=$1", [refreshToken])

		return response?.rows[0]
	}

	static async deleteRefreshSessionByToken(refreshToken) {
		await queryDB("DELETE FROM refresh_sessions WHERE refresh_token=$1", [refreshToken])
	}

	static async deleteRefreshSessionById(sessionId) {
		await queryDB("DELETE FROM refresh_sessions WHERE sess_id=$1", [sessionId])
	}
	
	// static async deleteAllRefreshSessionsByUserId(UserId) {
	// 	await queryDB("DELETE FROM refresh_sessions WHERE user_id=$1", [UserId])
	// }
	
	static async getRefreshSessionsQuantity(userId) {
		const response = await queryDB("SELECT sess_id FROM refresh_sessions WHERE user_id=$1", [userId])

		return response?.rows.length
	}

	static async deleteOldestRefreshSessionByUserId(userId) {
		 await queryDB("DELETE FROM refresh_sessions WHERE user_id=$1 ORDER BY log_in_time LIMIT 1", [userId])
	}

	static async isRefreshSessionDouble(deviceId) {
		const response = await queryDB("SELECT * FROM refresh_sessions WHERE device_id=$1", [deviceId])

		return response?.rows[0]
	}

	static async getRefreshSessionsWithLogOutTime() {
		const response = await queryDB("SELECT sess_id, user_id, device_id, log_out_time FROM refresh_sessions WHERE log_out_time < $1", [getTime().toString()])

		return response?.rows
	}
}

export default RefreshSessionRepository
