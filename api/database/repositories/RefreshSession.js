import useQueryDB from '../../hooks/useQueryDB.js'



class RefreshSessionRepository {
	static async createRefreshSession({ userId, deviceId, logInTime, logOutTime=null, refreshToken }) {
		await useQueryDB("INSERT INTO refresh_sessions (user_id, device_id, auth_time, log_in_time, log_out_time, refresh_token) VALUES ($1, $2, $3, $4, $5, $6)", [
			userId,
			deviceId,
			new Date().toLocaleString(),
			logInTime,
			logOutTime,
			refreshToken,
		])
	}

	static async getRefreshSession(refreshToken) {
		const response = await useQueryDB("SELECT * FROM refresh_sessions WHERE refresh_token=$1", [refreshToken])

		return response?.rows[0]
	}

	static async deleteRefreshSessionByToken(refreshToken) {
		await useQueryDB("DELETE FROM refresh_sessions WHERE refresh_token=$1", [refreshToken])
	}

	//! static async deleteRefreshSessionById(sessionId) {
	//! 	await useQueryDB("DELETE FROM refresh_sessions WHERE id=$1", [sessionId])
	//! }

	static async deleteRefreshSessionByLogInTime(logInTime) {
		const response = await useQueryDB("DELETE FROM refresh_sessions WHERE log_in_time=$1 RETURNING id", [logInTime])

		return response?.rows[0]
	}
	
	// static async deleteAllRefreshSessionsByUserId(UserId) {
	// 	await useQueryDB("DELETE FROM refresh_sessions WHERE user_id=$1", [UserId])
	// }
	
	static async getRefreshSessionsQuantity(userId) {
		const response = await useQueryDB("SELECT * FROM refresh_sessions WHERE user_id=$1", [userId])

		return response?.rows.length
	}

	static async getOldestRefreshSession(userId) {
		const response = await useQueryDB("SELECT * FROM refresh_sessions WHERE user_id=$1 ORDER BY log_in_time LIMIT 1", [userId])

		return response.rows[0]?.log_in_time
	}

	static async isRefreshSessionDouble(deviceId) {
		const response = await useQueryDB("SELECT * FROM refresh_sessions WHERE device_id=$1", [deviceId])

		return response?.rows[0]
	}
}

export default RefreshSessionRepository