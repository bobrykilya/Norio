import queryDB from '../../utils/queryDB'
import { getTime } from "../../utils/getTime"
import { IRefreshSessionRepository } from "../../types/DB-types"
import { COOKIE_SETTINGS } from "../../../constants.ts"
import { ICommonVar } from "../../../../common/types/Global-types.ts"



class RefreshSessionRepository {
	static async createRefreshSession({ userId, deviceId, logInTime, logOutTime=null, refreshToken }: IRefreshSessionRepository) {
		await queryDB("INSERT INTO refresh_sessions (user_id, device_id, refresh_time, log_in_time, log_out_time, refresh_token) VALUES ($1, $2, $3, $4, $5, $6)", [
			userId,
			deviceId,
            getTime(), //* refresh_time
			logInTime,
            logOutTime,
			refreshToken,
		])
	}

	static async getRefreshSession(refreshToken: IRefreshSessionRepository['refreshToken']) {
		const response = await queryDB("SELECT * FROM refresh_sessions WHERE refresh_token=$1", [refreshToken])

		return response?.rows[0]
	}

	static async deleteRefreshSessionByToken(refreshToken: IRefreshSessionRepository['refreshToken']) {
		await queryDB("DELETE FROM refresh_sessions WHERE refresh_token=$1", [refreshToken])
	}

	static async deleteRefreshSessionById(sessionId: IRefreshSessionRepository['sessionId']) {
		await queryDB("DELETE FROM refresh_sessions WHERE sess_id=$1", [sessionId])
	}

	static async deleteRefreshSessionsByUserIdAndDeviceId({ userId, deviceId }: { userId: ICommonVar['id']; deviceId: ICommonVar['id'] }) {
		await queryDB("DELETE FROM refresh_sessions WHERE user_id=$1 AND device_id=$2", [userId, deviceId])
	}
	
	// static async deleteAllRefreshSessionsByUserId(userId: IRefreshSessionRepository['userId']) {
	// 	await queryDB("DELETE FROM refresh_sessions WHERE user_id=$1", [userId])
	// }
	
	static async getRefreshSessionsQuantity(userId: IRefreshSessionRepository['userId']) {
		const response = await queryDB("SELECT sess_id FROM refresh_sessions WHERE user_id=$1", [userId])

		return response?.rows.length
	}

	static async deleteOldestRefreshSessionByUserId(userId: IRefreshSessionRepository['userId']) {
		 await queryDB("DELETE FROM refresh_sessions WHERE user_id=$1 AND log_in_time=(SELECT MIN(log_in_time) FROM refresh_sessions WHERE user_id=$1)", [userId])
	}

	static async isRefreshSessionDouble(deviceId: IRefreshSessionRepository['deviceId']) {
		const response = await queryDB("SELECT * FROM refresh_sessions WHERE device_id=$1", [deviceId])

		return response?.rows[0]
	}

	static async getRefreshSessionsWithLogOutTime() {
		const response = await queryDB("SELECT sess_id, user_id, device_id, log_out_time FROM refresh_sessions WHERE log_out_time != 0 AND log_out_time < $1", [getTime()])

		return response?.rows
	}

	static async getRefreshSessionsWithExpireRefreshTime() {
		const response = await queryDB("SELECT sess_id FROM refresh_sessions WHERE refresh_time < $1", [getTime() - COOKIE_SETTINGS.REFRESH_TOKEN.maxAge / 1000])

		return response?.rows
	}
}

export default RefreshSessionRepository
