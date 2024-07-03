import DeviceService from '../../services/Device-service.js'
import { showSnackBarMessage } from '../showSnackBarMessage/showSnackBarMessage.jsx'
import inMemoryJWT from '../../services/inMemoryJWT-service.js'
import useGetEndTime from '../../hooks/useGetEndTime.js'
import useGetTimeShort from '../../hooks/useGetTimeShort.js';
import { IBlockDevice, IBlockDeviceService } from '../../types/Device-types.js';



interface IGetErrorMessage {
    lockTime: Date;
    infinityBlock: boolean;
    unlockTimeDB: string | null;
    interCode: number | null;
}


const getErrorMessage = ({ lockTime, infinityBlock, unlockTimeDB, interCode }: IGetErrorMessage) => {
    // console.log(infinityBlock)
    if (!infinityBlock) {

        let endTimeString: string
        let unlockTimeShort: string
        let unlockTime: string

        if (!unlockTimeDB) {
            endTimeString = useGetEndTime({ startTime: lockTime, duration: 5 })
            unlockTimeShort = useGetTimeShort( endTimeString)
            unlockTime = endTimeString
        } else {
            unlockTimeShort = useGetTimeShort(unlockTimeDB)
            unlockTime = unlockTimeDB
        }
        // console.log({ lockTime, infinityBlock, unlockTimeDB, unlockTimeShort, endTimeString })

        return { 
            err_mess: `Устройство было заблокировано до ${unlockTimeShort} вследствие большого количества однотипных ошибок за короткий срок`, 
            unlockTime,
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


const blockDevice = async ({ logTime, infinityBlock=false, unlockTimeDB=null, interCode=null }: IBlockDevice) => {
    
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
        logTime: lockTime.toUTCString(),
        unlockTime,
        userInfo: JSON.parse(localStorage.getItem('userInfo') || '{}'),
        deviceId: Number(localStorage.getItem('deviceId')),
        interCode: newInterCode,
    }

    // console.log(data)
    
    DeviceService.blockDeviceInDB(data)
}

export default blockDevice