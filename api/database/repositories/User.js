import pool from "../db.js"

class UserRepository {
	static async createUser({ username, hashedPassword, role }) {
		const response = await pool.query("INSERT INTO users (name, password, role, is_activated) VALUES ($1, $2, $3, $4) RETURNING *", [
			username, 
			hashedPassword, 
			role, 
			false,
		])

		return response.rows[0].id
	}

	static async getUserData(username) {
		const response = await pool.query("SELECT * FROM users WHERE name=$1", [username])

		if (!response.rows.length) {
			return null
		}

		return response.rows[0]
	}

	static async deleteUserById(userId) {
		await pool.query("DELETE FROM users WHERE id=$1", [userId])
	}

	static async setActivateStatusForUser(userId) {
		const response = await pool.query("UPDATE users SET is_activated=true", [userId])

		return response.rows[0].id
	}
}

export default UserRepository