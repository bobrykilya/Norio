import { ILogRepository } from '@type/DB-types'
import queryDB from '@utils/queryDB'



const getInsertData = ({ interCode, userId }) => {
	switch (interCode) {
		case 102:	//* Sign-in to userAccount from new device
			return { receiver_user_id: userId, receiver_user_role: 1 }
		case 201:	//* Sign-in to user
			return { receiver_user_id: null, receiver_user_role: null }
		case 202:	//* Sign-in to user (don't forget mode)
			return { receiver_user_id: null, receiver_user_role: null }
		case 205:	//* Sign-up user
			return { receiver_user_id: null, receiver_user_role: 1 }
		case 801:	//* Hacking attempt
			return { receiver_user_id: null, receiver_user_role: 1 }
		case 802:	//* Hacking attempt from new device & block him
			return { receiver_user_id: null, receiver_user_role: 1 }
		case 803:	//* DeviceId front losing
			return { receiver_user_id: null, receiver_user_role: 1 }
		case 804:	//* DeviceId hacking attempt & block
			return { receiver_user_id: null, receiver_user_role: 1 }
		case 805:	//* DeviceId db losing
			return { receiver_user_id: null, receiver_user_role: 1 }
	}

}

class LogAttentionRepository {
	static async createLogAttention({ interCode, userId, deviceId, logTime }: ILogRepository) {

		// const { receiver_user_id, receiver_user_role } = getInsertData({ interCode, userId })
		//
		// await queryDB("INSERT INTO _log_Attention (inter_code, user_id, device_id, log_time, receiver_user_id, receiver_user_role) VALUES ($1, $2, $3, $4, $5, $6)", [
		// 	interCode,
		// 	userId,
		// 	deviceId,
		// 	logTime,
		// 	receiver_user_id,
		// 	receiver_user_role
		// ])
	}


	static async getLogsAttention() {
		const response = await queryDB('SELECT * FROM _log_Attention')

		return response.rows
	}

}

export default LogAttentionRepository
