import inMemoryJWT from '../../services/inMemoryJWT-service.js'
import { IBlockDevice } from '../../types/Device-types.js'
import { setUnlockTimer } from "./unlockDevice"


const blockDevice = ({ logTime, interCode, errMessage, unlockTime }: IBlockDevice) => {
    // console.log({ logTime, interCode, errMessage })

    inMemoryJWT.deleteToken()
    // sessionStorage.setItem('blockDevice', errMessage)
    // setBlockErrorMessage(errMessage)
    
    if (unlockTime !== 0) {
        setUnlockTimer(unlockTime)
    }
}

export default blockDevice