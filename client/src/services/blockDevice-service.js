import { showSnackBarMessage } from '../utils/showSnackBarMessage'



const getErrorMessage = ({ lockTime, infinityBlock }) => {
    if (!infinityBlock) {
        const blockDuration = 5 //* Device block duration in minutes
        
        lockTime.setMinutes(lockTime.getMinutes() + blockDuration)
        const unlockTime = `${lockTime.getHours()}:${lockTime.getMinutes()}`

        return { err_mess: `Устройство было заблокировано до ${unlockTime} вследствие большого количества однотипных ошибок за короткий срок`, unlockTime }
    } else {
        return { err_mess:`Устройство было заблокировано. Обратитесь к администратору` }
    }
}

const blockDevice = ({ errTime, infinityBlock=false }) => {

    const lockTime = new Date(errTime) || new Date()
    const { err_mess, unlockTime } = getErrorMessage({ lockTime, infinityBlock })
    
    showSnackBarMessage({ type: 'b', message: err_mess })
    // throw new Error(err_mess)

    localStorage.setItem('blockDevice', err_mess)
    // console.log(unlockTime)
}

export default blockDevice