import DeviceService from '../../services/Device-service'
import { showSnackBarMessage } from '../showSnackBarMessage/showSnackBarMessage'



const getErrorMessage = ({ lockTime, infinityBlock }) => {
    if (!infinityBlock) {
        const blockDuration = 5 //* Device block duration in minutes
        
        lockTime.setMinutes(lockTime.getMinutes() + blockDuration)
        const lockTimeMinutes = lockTime.getMinutes()
        const unlockTime = `${lockTime.getHours()}:${lockTimeMinutes > 9 ? lockTimeMinutes : '0' + lockTimeMinutes}`

        return { err_mess: `Устройство было заблокировано до ${unlockTime} вследствие большого количества однотипных ошибок за короткий срок`, unlockTime: lockTime.toLocaleString() }
    } else {
        return { err_mess:`Устройство было заблокировано. Обратитесь к администратору`, unlockTime: 'Never' }
    }
}


const blockDevice = async ({ logTime, infinityBlock=false }) => {

    const lockTime = logTime ? new Date(logTime) : new Date()
    const { err_mess, unlockTime } = getErrorMessage({ lockTime, infinityBlock })
    
    showSnackBarMessage({ type: 'b', message: err_mess })
    // throw new Error(err_mess)

    localStorage.setItem('blockDevice', err_mess)
    // console.log(unlockTime)

    const data = { 
        logTime,
        unlockTime: unlockTime,
        userInfo: localStorage.getItem('userInfo'),
        deviceId: localStorage.getItem('deviceId'),
    }

    // console.log(data)
    DeviceService.blockDeviceInDB(data)
}

export default blockDevice