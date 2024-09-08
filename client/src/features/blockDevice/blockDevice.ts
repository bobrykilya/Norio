import DeviceService from '../../services/Device-service.js'
import {showSnackBarMessage} from '../showSnackBarMessage/showSnackBarMessage.jsx'
import inMemoryJWT from '../../services/inMemoryJWT-service.js'
import {getEndTime} from '../../utils/getTime.js'
import {IBlockDevice} from '../../types/Device-types.js'


const blockDurationInMinutes = 2


const getErrorMessage = ({ logTime, infinityBlock, unlockTimeDB, interCode }: IBlockDevice) => {
    // console.log(infinityBlock)
    if (!infinityBlock) {

        let endTimeString: string
        let unlockTimeShort: string
        let unlockTime: string

        if (!unlockTimeDB) {
            endTimeString = getEndTime({ startTime: logTime, duration: blockDurationInMinutes })
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


const blockDevice = ({ logTime, infinityBlock=false, unlockTimeDB=null, interCode=null }: IBlockDevice) => {

    const { err_mess, unlockTime, newInterCode } = getErrorMessage({ logTime, infinityBlock, unlockTimeDB, interCode })
    // const setBlockErrorMessage = useBlockError(s => s.setBlockErrorMessage)
    // console.log(err_mess)
    
    setTimeout(() => {
        showSnackBarMessage({ type: 'b', message: err_mess })
        // setBlockErrorMessage(err_mess)
        localStorage.setItem('blockDevice', err_mess)
    }, 300)

    inMemoryJWT.deleteToken()

    if (unlockTimeDB) return

    const data = { 
        logTime,
        unlockTime,
        userInfo: JSON.parse(localStorage.getItem('userInfo') || '{}'),
        deviceId: Number(localStorage.getItem('deviceId')),
        interCode: newInterCode,
    }

    // console.log(data)
    
    DeviceService.blockDeviceInDB(data)
}

export default blockDevice