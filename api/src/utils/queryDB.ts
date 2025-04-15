import pool from '../_database/db'
import { Errors } from "./Errors.ts"



const queryDB = async (query: string, params?: any[]) => {
    try {
        return await pool.query(query, params)
    } catch (err) {
        // console.log(err)
        throw Errors.dbConflict(err.message, err.constraint)
    }
}

export default queryDB
