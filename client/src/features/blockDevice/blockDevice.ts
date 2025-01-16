import inMemoryJWT from '../../services/inMemoryJWT-service'
import { IBlockDevice } from '../../types/Device-types'
import { useBlockErrorState } from "../../stores/Device-store"
import { setUnlockTimer } from "./unlockDevice"



const blockDevice = ({ errMessage, unlockTime }: IBlockDevice) => {
    
    inMemoryJWT.deleteToken()
    useBlockErrorState.setState({ blockErrorState: errMessage })
    setTimeout(() => {
        localStorage.setItem('blockDevice', unlockTime.toString()) //* Limitation for saveLogInLocalStorage
    }, 1000)

    if (unlockTime !== 0) {
        setUnlockTimer(unlockTime)
    }
}

export default blockDevice