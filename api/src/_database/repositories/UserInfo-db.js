import useQueryDB from '../../../hooks/useQueryDB.js'

class UserInfoRepository {
	static async createUserInfo({
		userId,
		phone,
		store,
		job,
		lastName,
		firstName,
		middleName,
		avatar }) {
		const isStore = false
		
		await useQueryDB("INSERT INTO users_info (user_id, phone, store, job, last_name, first_name, middle_name, avatar, is_store) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
			[userId, phone, store, job, lastName, firstName, middleName, avatar, isStore])
	}

	static async getUserInfo(userId) {
		const response = await useQueryDB("SELECT * FROM users_info WHERE user_id=$1", [userId])

		return response.rows[0]
	}

	static async getUsedAvatarsList() {
		const response = await useQueryDB("SELECT * FROM users_info")

		return response.rows.map(row => row.avatar)
	}

	static async getUserName(userId) {
		const response = await useQueryDB("SELECT last_name, first_name FROM users_info WHERE user_id=$1", [userId])

		return response.rows[0]
	}
}

export default UserInfoRepository