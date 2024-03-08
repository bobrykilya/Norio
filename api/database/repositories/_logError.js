import pool from "../db.js"



class LogErrorRepository {
	// static async createLogError({ req=null, res=null, err=null, userId=null, deviceId=null, reqTime=null }) {

	// 	await pool.query("INSERT INTO _log_Error (req, res, err, user_id, device_id, log_time) VALUES ($1, $2, $3, $4, $5, $6)", [
	// 		JSON.stringify(req), 
	// 		JSON.stringify(res), 
	// 		JSON.stringify(err), 
	// 		userId, 
	// 		deviceId, 
	// 		reqTime, 
	// 	])
	// }

	static async getLogError() {
		const response = await pool.query("SELECT * FROM _log_Error")

		return response.rows
	}
}

export default LogErrorRepository