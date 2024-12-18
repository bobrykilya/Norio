import { $apiAuth, getApiInfo } from '../http/http'
import { IBlockDeviceService } from '../types/Device-types'
import { showSnackMessage } from "../features/showSnackMessage/showSnackMessage"



const getUserIPAddress = async () => {
    const res = await getApiInfo()

    if (!res) return undefined

    return res.ip
}

class DeviceService {
    static blockDeviceInDB = async (data: IBlockDeviceService) => {
        data.deviceIP = await getUserIPAddress()
        // console.log(data)

        try {
            await $apiAuth.post("block", { json: data }).json()

            // return res
        } catch (err) {
            showSnackMessage(err)
            if (err.response?.status !== 900) {
                showSnackMessage({type: 'w', message: 'Device-service error'})
                throw new Error(`Device-service error: ${err}`)
            }
        }
    }
}

export default DeviceService