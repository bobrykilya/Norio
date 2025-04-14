import { IUserInfoEditReq } from "../../../common/types/User-types.ts"
import { ICommonVar } from "../../../common/types/Global-types.ts"
import UserRepository from "../_database/repositories/User-db.ts"
import UserDb from "../_database/repositories/User-db.ts"
import { Conflict, Errors } from "../utils/Errors.ts"



class UserService {
	static async editUserInfo(data: IUserInfoEditReq, user: ICommonVar['payload']) {
		const newUserInfo: IUserInfoEditReq = {
			...await UserDb.getHandledUserInfo(user.userId) as IUserInfoEditReq,
			...data
		}

		try {
			await UserRepository.updateUserInfo({ userId: user.userId, newUserInfo })
		} catch (err) {
			if (err instanceof Conflict) {
				if (err.constraint === 'users_phone_key') {
					throw Errors.phoneConflict()
				}
			}
		}
	}
}

export default UserService
