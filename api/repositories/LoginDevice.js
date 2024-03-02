import pool from "../db.js"



class LoginDeviceRepository {
  static async createDevice(fingerprint, localIp) {
    const browser = fingerprint.components.useragent.browser.family + ' v.' + fingerprint.components.useragent.browser.version
    const windows_v = fingerprint.components.useragent.os.major
    
    const response = await pool.query("INSERT INTO login_devices (finger_print, browser, windows_v, local_ip) VALUES ($1, $2, $3, $4) RETURNING id", 
    [fingerprint.hash, browser, windows_v, localIp])

    return response.rows[0]?.id
  }

  static async getDeviceId(fingerprintHash, localIp) {

    const response = await pool.query("SELECT * FROM login_devices WHERE finger_print=$1 AND local_ip=$2", [fingerprintHash, localIp])

    return response.rows[0]?.id
  }
}

export default LoginDeviceRepository