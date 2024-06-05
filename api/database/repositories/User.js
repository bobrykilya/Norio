import useQueryDB from '../../hooks/useQueryDB.js'

class UserRepository {
	static async createUser({ username, hashedPassword, role }) {
		const response = await useQueryDB("INSERT INTO users (name, password, role, is_activated) VALUES ($1, $2, $3, $4) RETURNING *", [
			username, 
			hashedPassword, 
			role, 
			false,
		])

		return response.rows[0].id
	}

	static async getUserData(username) {
		const response = await useQueryDB("SELECT * FROM users WHERE name=$1", [username])

		return response?.rows[0]
	}

	static async deleteUserById(userId) {
		await useQueryDB("DELETE FROM users WHERE id=$1", [userId])
	}

	static async setActivateStatusForUser({ userId, status }) {
		await useQueryDB("UPDATE users SET is_activated=$1 WHERE user_id=$2", [status, userId])
	}
}

export default UserRepository