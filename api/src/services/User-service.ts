import bcrypt from 'bcryptjs'

import AuthService from './Auth-service.ts'
import CommonRepository from '@/_database/repositories/Common-db.ts'
import RefreshSessionRepository from '@/_database/repositories/RefreshSession-db.ts'
import UserRepository from '@/_database/repositories/User-db.ts'
import { ICommonVar } from '@shared/types/Global-types.ts'
import { IAccountInfoEditReq, IUserInfoEditReq } from '@shared/types/User-types.ts'
import { Errors } from '@utils/Errors.ts'



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
		const { newPassword, prevPassword, ...restData } = data
		const newData: IAccountInfoEditReq = {
			...restData,
		}

		if (newPassword) {
			await AuthService.checkPasswordByUsername({
				username: user.username,
				password: prevPassword,
				error: Errors.passwordInvalid(),
			})
			const salt = bcrypt.genSaltSync(10)
			newData.password = bcrypt.hashSync(newPassword, salt)
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
				deviceId,
			})
			return await AuthService.createSession({
				userId,
				username: newData.username,
				deviceId,
				queryTime,
			})
		}
	}

	static async getUsedAvatarsList() {
		return await UserRepository.getUsedAvatarsList()
	}

}

export default UserService
