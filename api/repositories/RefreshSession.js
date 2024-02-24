import { response } from 'express'
import pool from "../db.js"

class RefreshSessionRepository {
  static async getRefreshSession(refreshToken) {
    const response = await pool.query("SELECT * FROM refresh_sessions WHERE refresh_token=$1", [refreshToken])

    if (!response.rows.length) {
      return null
    }

    return response.rows[0]
  }

  static async createRefreshSession({ id, refreshToken, fingerprint }) {
    await pool.query("INSERT INTO refresh_sessions (user_id, refresh_token, finger_print, time_log_in) VALUES ($1, $2, $3, $4)", [
      id,
      refreshToken,
      fingerprint.hash,
      Date.now().toString(),
    ])
  }

  static async deleteRefreshSession(refreshToken) {
    await pool.query("DELETE FROM refresh_sessions WHERE refresh_token=$1", [refreshToken])
  }

  static async getRefreshSessionsQuantity(userId) {
    const response = await pool.query("SELECT * FROM refresh_sessions WHERE user_id=$1", [userId])

    return response.rows.length
  }

  static async getOldestRefreshSessions(userId) {
    const response = await pool.query("SELECT * FROM refresh_sessions WHERE user_id=$1 ORDER BY time_log_in LIMIT 1", [userId])

    return response.rows[0].id
  }

  static async deleteRefreshSessionById(sessionId) {
    await pool.query("DELETE FROM refresh_sessions WHERE id=$1", [sessionId])
  }

  static async isRefreshSessionDouble(fingerprint) {
    const response = await pool.query("SELECT * FROM refresh_sessions WHERE finger_print=$1", [fingerprint])

    return response.rows[0]
  }
}

export default RefreshSessionRepository