import pool from "../db.js"



const getInsertData = ({ typeCode, userId }) => {
	switch (typeCode) {
		case 101:	//* Sign-in to userAccount from new device
			return { receiver_user_id: null, receiver_user_role: 1 }
		case 201:	//* Sign-in to user
			return { receiver_user_id: userId, receiver_user_role: null }
		case 202:	//* Sign-in to user (don't forget mode)
			return { receiver_user_id: userId, receiver_user_role: null }
		case 205:	//* Sign-up user
			return { receiver_user_id: null, receiver_user_role: 1 }
		case 801:	//* Hacking attempt
			return { receiver_user_id: null, receiver_user_role: 1 }
	}

}

class LogAttentionRepository {
	static async createLogAttention({ typeCode, userId, deviceId }) {
		const { receiver_user_id, receiver_user_role } = getInsertData({ typeCode, userId })

		await pool.query("INSERT INTO _log_Attention (type_code, user_id, device_id, log_time, receiver_user_id, receiver_user_role) VALUES ($1, $2, $3, $4, $5, $6)", [
			typeCode, 
			userId, 
			deviceId, 
			new Date(), 
			receiver_user_id, 
			receiver_user_role
		])
	}

	//   static async createUserInfo(id) {
	//     const response = await pool.query("SELECT * FROM _log_Attention WHERE user_id=$1", [id])
	//   }

	static async getLogsAttention() {
		const response = await pool.query("SELECT * FROM _log_Attention")

		return response.rows
	}

}

export default LogAttentionRepository