import pool from "../db.js"



class LogErrorRepository {
	static async createLogError({ typeCode, req=null, res=null, err, userId=null, deviceId=null, queryTimeString }) {
		err.myOperationCode = typeCode
		delete err.length
		delete err.name
		delete err.severity
		delete err.schema
		delete err.file
		delete err.line


		const response = await pool.query("INSERT INTO _log_Error (req, res, err, user_id, device_id, log_time) VALUES ($1, $2, $3, $4, $5, $6)", [
			JSON.stringify(req), 
			JSON.stringify(res), 
			JSON.stringify(err), 
			userId, 
			deviceId, 
			queryTimeString, 
		])

		return response.rows[0]?.id
	}

	static async getLogError() {
		const response = await pool.query("SELECT * FROM _log_Error")

		return response.rows
	}
}

export default LogErrorRepository