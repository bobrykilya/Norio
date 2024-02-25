import pool from "../db.js"

class UserRepository {
  static async createUser({ username, hashedPassword, access_lvl }) {
    const response = await pool.query("INSERT INTO users (name, password, access_lvl) VALUES ($1, $2, $3) RETURNING *", 
    [username, hashedPassword, access_lvl])

    return response.rows[0]
  }

  static async getUserData(username) {
    const response = await pool.query("SELECT * FROM users WHERE name=$1", [username])

    if (!response.rows.length) {
      return null
    }

    return response.rows[0]
  }
}

export default UserRepository