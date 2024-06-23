import DeviceService from '../../services/Device-service'
import { showSnackBarMessage } from '../showSnackBarMessage/showSnackBarMessage'
import inMemoryJWT from '../../services/inMemoryJWT-service.js'
import useGetEndTime from '../../hooks/useGetEndTime.js'
import useGetTimeShort from '../../hooks/useGetTimeShort.js';



const getErrorMessage = ({ lockTime, infinityBlock, unlockTimeDB, interCode }) => {
    // console.log(infinityBlock)
    if (!infinityBlock) {

        let endTimeStamp
        let unlockTimeShort

        if (!unlockTimeDB) {
            endTimeStamp = useGetEndTime({ startTime: lockTime, duration: 5 })
        }
        unlockTimeShort = useGetTimeShort(unlockTimeDB || endTimeStamp)
        // console.log({ lockTime, infinityBlock, unlockTimeDB, unlockTimeShort, endTimeStamp })

        return { 
            err_mess: `Устройство было заблокировано до ${unlockTimeShort} вследствие большого количества однотипных ошибок за короткий срок`, 
            unlockTime: unlockTimeDB || endTimeStamp,
            newInterCode: interCode || 807,
        }
    } else {
        return { 
            err_mess:`Устройство было заблокировано. Обратитесь к администратору`, 
            unlockTime: null,
            newInterCode: interCode,
        }
    }
}


const blockDevice = async ({ logTime, infinityBlock=null, unlockTimeDB=null, interCode=null }) => {
    
    const lockTime = logTime ? new Date(logTime) : new Date()
    const { err_mess, unlockTime, newInterCode } = getErrorMessage({ lockTime, infinityBlock, unlockTimeDB, interCode })
    // console.log(err_mess)
    
    setTimeout(() => {
        showSnackBarMessage({ type: 'b', message: err_mess })
        localStorage.setItem('blockDevice', err_mess)
    }, 300)

    inMemoryJWT.deleteToken()

    if (unlockTimeDB) return 

    const data = { 
        logTime,
        unlockTime,
        userInfo: localStorage.getItem('userInfo'),
        deviceId: localStorage.getItem('deviceId'),
        interCode: newInterCode,
    }

    // console.log(data)
    
    DeviceService.blockDeviceInDB(data)
}

export default blockDevice