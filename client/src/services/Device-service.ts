import { $apiAuth, getApiInfo } from '../http/http'
import { IBlockDeviceService } from '../types/Device-types'
import { showSnackBarMessage } from "../features/showSnackBarMessage/showSnackBarMessage"



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
            showSnackBarMessage(err)
            if (err.response.status !== 900) {
                showSnackBarMessage({type: 'w', message: 'Device-service error'})
                throw new Error(`Device-service error: ${err}`)
            }
        }
    }
}

export default DeviceService