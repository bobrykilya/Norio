import inMemoryJWT from '../../services/inMemoryJWT-service.js'
import { IBlockDevice } from '../../types/Device-types.js'


const blockDevice = ({ logTime, interCode, errMessage }: IBlockDevice) => {
    // console.log({ logTime, interCode, errMessage })

    inMemoryJWT.deleteToken()
    if (errMessage){
        // setTimeout(() => {
        //     // setBlockErrorMessage(errMessage)
        //     // sessionStorage.setItem('blockDevice', errMessage)
        //     // setBlockErrorMessage(errMessage)
        //     showSnackBarMessage({ type: 'b', message: errMessage })
        // }, 300)
        return
    }

}

export default blockDevice