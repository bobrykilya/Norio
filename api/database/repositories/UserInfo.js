import pool from "../db.js"

class UserInfoRepository {
	static async createUserInfo({
		user_id,
		phone,
		store,
		job,
		last_name,
		first_name,
		middle_name,
		avatar }) {
		isStore = false
		
		await pool.query("INSERT INTO users_info (user_id, phone, store, job, last_name, first_name, middle_name, avatar, is_store) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
			[user_id, phone, store, job, last_name, first_name, middle_name, avatar, is_store])
	}

	//   static async createUserInfo(id) {
	//     const response = await pool.query("SELECT * FROM users WHERE user_id=$1", [id])
	//   }

	static async getUsedAvatarsList() {
		const response = await pool.query("SELECT * FROM users_info")

		return response.rows.map(row => row.avatar)
	}

}

export default UserInfoRepository