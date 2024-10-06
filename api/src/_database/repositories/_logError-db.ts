import queryDB from '../../utils/queryDB'
import { ILogErrorRepository } from "../../types/DB-types"



class LogErrorRepository {
	static async createLogError({ interCode, req=null, res=null, err, userId=null, deviceId=null, logTime }: ILogErrorRepository) {
		// err.myOperationCode = interCode
		// delete err.length
		// delete err.name
		// delete err.severity
		// delete err.schema
		// delete err.file
		// delete err.line
		//
		//
		// const response = await queryDB("INSERT INTO _log_Error (req, res, err, user_id, device_id, log_time) VALUES ($1, $2, $3, $4, $5, $6)", [
		// 	JSON.stringify(req),
		// 	JSON.stringify(res),
		// 	JSON.stringify(err),
		// 	userId,
		// 	deviceId,
        //     logTime,
		// ])
		//
		// return response.rows[0]?.id
	}

	static async getLogError() {
		const response = await queryDB("SELECT * FROM _log_Error")

		return response.rows
	}
}

export default LogErrorRepository
