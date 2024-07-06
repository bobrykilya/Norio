import { showSnackBarMessage } from '../features/showSnackBarMessage/showSnackBarMessage'
import { $apiAuth, $apiIpInfo } from '../http/http'
import { IBlockDeviceService } from '../types/Device-types'



interface IApiIpInfoResponse {
    ip: string;
}

const getUserIPAddress = async () => {
    const res: IApiIpInfoResponse = await $apiIpInfo.get("").json()
    
    return res.ip
}


class DeviceService {
    static blockDeviceInDB = async (data: IBlockDeviceService) => {
        if (!data.unlockTime) data.deviceIP = await getUserIPAddress()
        // console.log(data)

        try {
            $apiAuth.post("block", { json: data }).json()

            // return res
        } catch (err) {
            showSnackBarMessage(err)
            throw new Error('BlockDevice service error')
        }
    }
}

export default DeviceService