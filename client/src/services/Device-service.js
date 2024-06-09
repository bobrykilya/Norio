import { showSnackBarMessage } from '../features/showSnackBarMessage/showSnackBarMessage'
import { $apiAuth, $apiIpInfo } from '../http/http'



const getUserIPAddress = async () => {
    const res = await $apiIpInfo.get("").json()
    
    return res.ip
}


class DeviceService {
    static blockDeviceInDB = async (data) => {
        data.deviceIP = await getUserIPAddress()
        // console.log(data)

        try {
            await $apiAuth.post("block", { json: data }).json()

            // return res
        } catch (err) {
            showSnackBarMessage(err)
            throw new Error('BlockDevice service error')
        }
    }
}

export default DeviceService