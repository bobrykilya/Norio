import inMemoryJWT from '../../services/inMemoryJWT-service.js'
import { IBlockDevice } from '../../types/Device-types.js'
import { setUnlockTimer } from "./unlockDevice"
import { useBlockError } from "../../stores/Device-store"



const blockDevice = ({ errMessage, unlockTime }: IBlockDevice) => {

    inMemoryJWT.deleteToken()
    useBlockError.setState({ blockErrorMessage: errMessage })
    setTimeout(() => {
        localStorage.setItem('blockDevice', unlockTime.toString()) //* Limitation for saveLogInLocalStorage
    }, 1000)

    if (unlockTime !== 0) {
        setUnlockTimer(unlockTime)
    }
}

export default blockDevice