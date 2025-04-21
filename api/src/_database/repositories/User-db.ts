import queryDB from '../../utils/queryDB'
import { IUserRepository } from "../../types/DB-types"
import { ICommonVar } from "../../../../common/types/Global-types.ts"
import { IAccountInfoEditReq, IUserInfoEditReq } from "../../../../common/types/User-types.ts"



class UserRepository {
	static async createUser({ 
		username, 
		hashedPassword, 
		role,
		status,
		phone,
		store,
		company,
		job,
		lastName,
		firstName,
		middleName,
		gender,
		avatar,
		isStore,
	}: IUserRepository) {

		const response = await queryDB("INSERT INTO users (username, password, role, status, phone, store, company, job, last_name, first_name, middle_name, gender, avatar, is_store) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING user_id", [
			username, 
			hashedPassword, 
			role, 
			status,
			phone, 
			store,
			company,
			job, 
			lastName, 
			firstName, 
			middleName, 
			gender,
			avatar,
			isStore,
		])

		return response.rows[0].user_id
	}

	static async getUserMainDataByUsername(username: IUserRepository['username']) {
		const response = await queryDB("SELECT user_id, password FROM users WHERE username=$1", [username])

		return response?.rows[0]
	}

	static async getHandledUserInfo(userId: IUserRepository['userId'], withPassword?: boolean) {
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
			if (withPassword) {
				handledUserInfo.hashedPassword = password
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

		return response.rows.map(el => el.avatar) as ICommonVar['avatar'][]
	}

	static async setStatusForUser({ userId, status }: Pick<IUserRepository, 'userId' | 'status'>) {
		await queryDB("UPDATE users SET status=$1 WHERE user_id=$2", [status, userId])
	}

	static async deleteUserById(userId: IUserRepository['userId']) {
		await queryDB("DELETE FROM users WHERE user_id=$1", [userId])
	}

	static async updateUserInfo({ userId, newUserInfo: {
		lastName,
		firstName,
		middleName,
		gender,
		job,
		phone,
		store,
		company,
		birthday
	} }: { userId: IUserRepository['userId'], newUserInfo: IUserInfoEditReq }, ) {
		await queryDB("UPDATE users SET phone=$1, store=$2, company=$3, job=$4, last_name=$5, first_name=$6, middle_name=$7, gender=$8, birthday=$9 WHERE user_id=$10", [
			phone,
			store,
			company,
			job,
			lastName,
			firstName,
			middleName,
			gender,
			birthday,
			userId
		])
	}

	static async updateAccountInfo({ userId, newAccountInfo: {
		userName,
		hashedPassword,
		avatar,
		email
	} }: { userId: IUserRepository['userId'], newAccountInfo: IAccountInfoEditReq }, ) {
		await queryDB("UPDATE users SET username=$1, password=$2, avatar=$3, email=$4 WHERE user_id=$5", [
			userName,
			hashedPassword,
			avatar,
			email,
			userId
		])
	}
}

export default UserRepository
