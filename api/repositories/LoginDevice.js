import pool from "../db.js"



class LoginDeviceRepository {
  static async createDevice(fingerprint, localIp) {
    delete fingerprint.components.useragent['device'] 
    
    const response = await pool.query("INSERT INTO login_devices (finger_print, user_agent, local_ip) VALUES ($1, $2, $3) RETURNING id", 
    [fingerprint.hash, JSON.stringify(fingerprint.components.useragent), localIp])

    return response.rows[0]?.id
  }

  static async getDeviceId(fingerprintHash, localIp) {

    const response = await pool.query("SELECT * FROM login_devices WHERE finger_print=$1 AND local_ip=$2", [fingerprintHash, localIp])

    return response.rows[0]?.id
  }
}

export default LoginDeviceRepository