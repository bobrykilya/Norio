import { Errors } from './Errors.ts'
import pool from '@/_database/db'



const queryDB = async (query: string, params?: any[]) => {
	try {
		return await pool.query(query, params)
	} catch (err) {
		console.log(err)
		throw Errors.dbConflict({
			message: err.message,
			detail: {
				constraint: err.constraint || `${err.table}_${err.column}_key`,
				extraMessage: err.detail,
			},
		})
	}
}

export default queryDB
