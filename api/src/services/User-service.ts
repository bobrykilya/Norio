import { IAccountInfoEditReq, IUserInfoEditReq } from "../../../common/types/User-types.ts"
import { ICommonVar } from "../../../common/types/Global-types.ts"
import UserRepository from "../_database/repositories/User-db.ts"
import UserDb from "../_database/repositories/User-db.ts"
import { Errors } from "../utils/Errors.ts"
import bcrypt from "bcryptjs"



class UserService {
	static async editUserInfo(data: IUserInfoEditReq, user: ICommonVar['payload']) {
		//! Add log funcs
		const newUserInfo: IUserInfoEditReq = {
			...await UserDb.getHandledUserInfo(user.userId) as IUserInfoEditReq,
			...data
		}

		try {
			await UserRepository.updateUserInfo({ userId: user.userId, newUserInfo })
		} catch (err) {
			if (err.detail.constraint === 'users_phone_key') {
				throw Errors.phoneEngaged()
			}
			throw Errors.dbConflict(err)
		}
	}

	static async editAccountInfo(data: IAccountInfoEditReq, user: ICommonVar['payload']) {
		//! Add log funcs
		const { newPassword, ...restData } = data
		if (newPassword) {
			const salt = bcrypt.genSaltSync(10)
			restData.hashedPassword = bcrypt.hashSync(newPassword, salt)
		}

		const newAccountInfo: IAccountInfoEditReq = {
			...await UserDb.getHandledUserInfo(user.userId, true) as IAccountInfoEditReq,
			...restData,
		}

		console.log(newAccountInfo)

		try {
			await UserRepository.updateAccountInfo({ userId: user.userId, newAccountInfo })
		} catch (err) {
			if (err.detail.constraint === 'users_username_key') {
				throw Errors.usernameEngaged()
			} else if (err.detail.constraint === 'users_avatar_key') {
				throw Errors.avatarEngaged()
			}
			throw Errors.dbConflict(err)
		}
	}
	
}

export default UserService
