import { IAccountInfoEditReq, IUserInfoEditReq } from "../../../common/types/User-types.ts"
import { ICommonVar } from "../../../common/types/Global-types.ts"
import { Errors } from "../utils/Errors.ts"
import CommonRepository from "../_database/repositories/Common-db.ts"
import bcrypt from "bcryptjs"
import RefreshSessionRepository from "../_database/repositories/RefreshSession-db.ts"
import AuthService from "./Auth-service.ts"



class UserService {
	static async editUserInfo(data: IUserInfoEditReq, user: ICommonVar['payload']) {
		//! Add log funcs

		try {
			await CommonRepository.updateFieldsById<IUserInfoEditReq>({
				data: data,
				id: user.userId,
				tableName: 'users',
				idFieldName: 'user_id',
			})
		} catch (err) {
			if (err.detail.constraint === 'users_phone_key') {
				throw Errors.phoneEngaged()
			}
			throw Errors.dbConflict(err)
		}
	}

	static async editAccountInfo(data: IAccountInfoEditReq, user: ICommonVar['payload'], queryTime: ICommonVar['queryTime']) {
		//! Add log funcs
		const { userId, deviceId } = user
		const { password, ...restData } = data
		const newData: IAccountInfoEditReq = {
			...restData
		}

		if (password) {
			const salt = bcrypt.genSaltSync(10)
			newData.password = bcrypt.hashSync(password, salt)
		}

		try {
			await CommonRepository.updateFieldsById<IAccountInfoEditReq>({
				data: newData,
				id: userId,
				tableName: 'users',
				idFieldName: 'user_id',
			})
		} catch (err) {
			if (err.detail.constraint === 'users_username_key') {
				throw Errors.usernameEngaged()
			} else if (err.detail.constraint === 'users_avatar_key') {
				throw Errors.avatarEngaged()
			}
			throw Errors.dbConflict(err)
		}

		//* If username has been changed - prev name's sessions removing (for this device) and creating a new one
		if (newData.username) {
			await RefreshSessionRepository.deleteRefreshSessionsByUserIdAndDeviceId({
				userId,
				deviceId
			})
			return await AuthService.createSession({
				userId,
				username: newData.username,
				deviceId,
				queryTime
			})
		}
	}
	
}

export default UserService
