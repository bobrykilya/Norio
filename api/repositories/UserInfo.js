import pool from "../db.js"

class UserInfoRepository {
  static async createUserInfo({ 
    user_id,
    phone, 
    store, 
    job, 
    last_name, 
    first_name, 
    middle_name, 
    avatar }) {
    await pool.query("INSERT INTO users_info (user_id, phone, store, job, last_name, first_name, middle_name, avatar) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)", 
    [user_id, phone, store, job, last_name, first_name, middle_name, avatar])
  }

//   static async createUserInfo(id) {
//     const response = await pool.query("SELECT * FROM users WHERE user_id=$1", [id])
//   }
}

export default UserInfoRepository