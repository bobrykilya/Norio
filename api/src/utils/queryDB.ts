import pool from '../_database/db'
import { Errors } from "./Errors.ts"



const queryDB = async (query: string, params?: any[]) => {
    try {
        return await pool.query(query, params)
    } catch (err) {
        throw Errors.dbConflict({
			message: err.message,
			detail: {
				constraint: err.constraint,
				extraMessage: err.detail
			}
		})
    }
}

export default queryDB
