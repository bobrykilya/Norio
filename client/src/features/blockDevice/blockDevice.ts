import { IBlockDevice } from '../../types/Device-types'
import { useBlockErrorState } from "../../stores/Device-store"
import { setUnlockTimer } from "./unlockDevice"
import JWTInfoService from "../../services/JWTInfoService"
import { BLOCK_DEVICE } from "../../../constants"



const blockDevice = ({ errMessage, unlockTime }: IBlockDevice) => {

    JWTInfoService.deleteJWTInfo()
    useBlockErrorState.setState({ blockErrorState: errMessage })
    setTimeout(() => {
        localStorage.setItem(BLOCK_DEVICE, unlockTime.toString()) //* Limitation for saveLogInLocalStorage
    }, 1000)

    if (unlockTime !== 0) {
        setUnlockTimer(unlockTime)
    }
}

export default blockDevice