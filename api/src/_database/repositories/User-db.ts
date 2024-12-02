import queryDB from '../../utils/queryDB'
import { IUserRepository } from "../../types/DB-types"



class UserRepository {
	static async createUser({ 
		username, 
		hashedPassword, 
		role,
		status,
		phone,
		store,
		job,
		lastName,
		firstName,
		middleName,
		avatar,
		isStore,
	}: IUserRepository) {

		const response = await queryDB("INSERT INTO users (username, password, role, status, phone, store, job, last_name, first_name, middle_name, avatar, is_store) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING user_id", [
			username, 
			hashedPassword, 
			role, 
			status,
			phone, 
			store, 
			job, 
			lastName, 
			firstName, 
			middleName, 
			avatar, 
			isStore
		])

		return response.rows[0].user_id
	}

	static async getUserData(username: IUserRepository['username']) {
		const response = await queryDB("SELECT user_id, password FROM users WHERE username=$1", [username])

		return response?.rows[0]
	}

	static async getHandledUserInfo(userId: IUserRepository['userId']) {
		const response = await queryDB("SELECT * FROM users WHERE user_id=$1", [userId])

		if (response?.rows[0]) {
			const { user_id, password, last_name, first_name, middle_name, is_store, ...rest } = response?.rows[0]
			const handledUserInfo: IUserRepository = {
				...rest,
				userId: user_id,
				lastName: last_name,
				firstName: first_name,
				middleName: middle_name,
				isStore: is_store,
			}

			return handledUserInfo
		} else {
			return null
		}
	}
	
	static async getUserName(userId: IUserRepository['userId']) {
		const response = await queryDB("SELECT username, last_name, first_name FROM users WHERE user_id=$1", [userId])

		return response.rows[0]
	}
	
	static async getUsedAvatarsList() {
		const response = await queryDB("SELECT avatar FROM users")

		return response.rows
	}

	static async setStatusForUser({ userId, status }: Pick<IUserRepository, 'userId' | 'status'>) {
		await queryDB("UPDATE users SET status=$1 WHERE user_id=$2", [status, userId])
	}

	static async deleteUserById(userId: IUserRepository['userId']) {
		await queryDB("DELETE FROM users WHERE user_id=$1", [userId])
	}
}

export default UserRepository
