import pool from '../_database/db'
import { Conflict } from './Errors'



const queryDB = async (query: string, params?: any[]) => {
    try {
        return await pool.query(query, params)
    } catch (err) {
        console.log(err)
        throw new Conflict(err.message)
    }
}

export default queryDB
