import pool from "../db.js"



class RefreshSessionRepository {
	static async createRefreshSession({ refreshToken, userId, deviceId }) {
		await pool.query("INSERT INTO refresh_sessions (refresh_token, user_id, device_id, auth_time) VALUES ($1, $2, $3, $4)", [
			refreshToken,
			userId,
			deviceId,
			new Date(),
		])
	}

	static async getRefreshSession(refreshToken) {
		const response = await pool.query("SELECT * FROM refresh_sessions WHERE refresh_token=$1", [refreshToken])

		if (!response.rows.length) {
			return null
		}

		return response.rows[0]
	}

	static async deleteRefreshSession(refreshToken) {
		await pool.query("DELETE FROM refresh_sessions WHERE refresh_token=$1", [refreshToken])
	}

	static async getRefreshSessionsQuantity(userId) {
		const response = await pool.query("SELECT * FROM refresh_sessions WHERE user_id=$1", [userId])

		return response.rows.length
	}

	static async getOldestRefreshSessions(userId) {
		const response = await pool.query("SELECT * FROM refresh_sessions WHERE user_id=$1 ORDER BY auth_time LIMIT 1", [userId])

		return response.rows[0].id
	}

	static async deleteRefreshSessionById(sessionId) {
		await pool.query("DELETE FROM refresh_sessions WHERE id=$1", [sessionId])
	}

	static async isRefreshSessionDouble(deviceId) {
		const response = await pool.query("SELECT * FROM refresh_sessions WHERE device_id=$1", [deviceId])

		return response.rows[0]
	}

	static async deleteAllRefreshSessionsByUserId(UserId) {
		await pool.query("DELETE FROM refresh_sessions WHERE user_id=$1", [UserId])
	}
}

export default RefreshSessionRepository