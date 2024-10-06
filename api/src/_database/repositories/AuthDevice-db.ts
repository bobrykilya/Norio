import queryDB from '../../utils/queryDB'
import getBrowserAndOs from '../../utils/getBrowserAndOs'
import { IAuthDeviceRepository } from "../../types/DB-types"



class AuthDeviceRepository {
	static async createDevice({ fingerprint, regTime, deviceType, deviceIP }: IAuthDeviceRepository) {
		const { browser, bVersion, os } = getBrowserAndOs(fingerprint)

		const response = await queryDB("INSERT INTO auth_devices (browser, type, b_version, os, reg_time, finger_print, ip_reg) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING device_id",
			[
				browser,
				deviceType,
				bVersion,
				os,
				regTime,
				fingerprint.hash,
				deviceIP,
			])

		return response.rows[0]?.device_id
	}

	static async getDeviceId(fingerprintHash: IAuthDeviceRepository['fingerprint']['hash']) {
		const response = await queryDB("SELECT device_id FROM auth_devices WHERE finger_print=$1", [fingerprintHash])

		return response.rows[0]?.device_id
	}

	static async getDeviceById(deviceId: IAuthDeviceRepository['deviceId']) {
		const response = await queryDB("SELECT * FROM auth_devices WHERE device_id=$1", [deviceId])

		return response.rows[0]
	}

	static async updateDevice({ fingerprint, deviceId, bVersion, deviceIP }: Pick<IAuthDeviceRepository, 'fingerprint' | 'deviceId' | 'bVersion' | 'deviceIP'>) {
		const browserVersion = bVersion || getBrowserAndOs(fingerprint)

		await queryDB("UPDATE auth_devices SET b_version=$1, finger_print=$2, ip_reg=$3 WHERE device_id=$4", [browserVersion , fingerprint.hash, deviceIP, deviceId])
	}
}

export default AuthDeviceRepository
