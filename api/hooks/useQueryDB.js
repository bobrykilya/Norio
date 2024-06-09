import pool from '../src/_database/db.js'
import { Conflict } from '../utils/Errors.js'



const useQueryDB = async (query, params) => {
    try {
        const res = await pool.query(query, params)
        return res
    }
    catch (err) {
        console.log(err)
        throw new Conflict(err.message)
    }
}

export default useQueryDB