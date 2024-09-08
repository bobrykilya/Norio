import pool from '../_database/db.js'
import { Conflict } from './Errors.js'



const queryDB = async (query, params) => {
    try {
        return await pool.query(query, params)
    } catch (err) {
        console.log(err)
        throw new Conflict(err.message)
    }
}

export default queryDB
