import pool from "../db.js"



class RefreshSessionRepository {
	static async createRefreshSession({ refreshToken, userId, deviceId, logInTime, logOutTime=null }) {
		await pool.query("INSERT INTO refresh_sessions (refresh_token, user_id, device_id, auth_time, log_in_time, log_out_time) VALUES ($1, $2, $3, $4, $5, $6)", [
			refreshToken,
			userId,
			deviceId,
			new Date().toUTCString(),
			logInTime,
			logOutTime,
		])
	}

	static async getRefreshSession(refreshToken) {
		const response = await pool.query("SELECT * FROM refresh_sessions WHERE refresh_token=$1", [refreshToken])

		if (!response.rows.length) {
			return null
		}

		return response.rows[0]
	}

	static async deleteRefreshSessionByToken(refreshToken) {
		await pool.query("DELETE FROM refresh_sessions WHERE refresh_token=$1", [refreshToken])
	}

	//! static async deleteRefreshSessionById(sessionId) {
	//! 	await pool.query("DELETE FROM refresh_sessions WHERE id=$1", [sessionId])
	//! }

	static async deleteRefreshSessionByLogInTime(logInTime) {
		const response = await pool.query("DELETE FROM refresh_sessions WHERE log_in_time=$1 RETURNING id", [logInTime])

		return response.rows[0]
	}
	
	// static async deleteAllRefreshSessionsByUserId(UserId) {
	// 	await pool.query("DELETE FROM refresh_sessions WHERE user_id=$1", [UserId])
	// }
	
	static async getRefreshSessionsQuantity(userId) {
		const response = await pool.query("SELECT * FROM refresh_sessions WHERE user_id=$1", [userId])

		return response.rows.length
	}

	static async getOldestRefreshSession(userId) {
		const response = await pool.query("SELECT * FROM refresh_sessions WHERE user_id=$1 ORDER BY log_in_time LIMIT 1", [userId])

		return response.rows[0].log_in_time
	}

	static async isRefreshSessionDouble(deviceId) {
		const response = await pool.query("SELECT * FROM refresh_sessions WHERE device_id=$1", [deviceId])

		return response.rows[0]
	}
}

export default RefreshSessionRepository