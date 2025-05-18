import { setUnlockTimer } from './unlockDevice'
import { BLOCK_DEVICE } from '@/../constants'
import TokenService from '@services/Token-service'
import { useBlockErrorState } from '@stores/Device-store'
import { IBlockDevice } from '@type/Device-types'



const blockDevice = ({ errMessage, unlockTime }: IBlockDevice) => {

	TokenService.deleteJWTInfo()
	useBlockErrorState.setState({ blockErrorMessage: errMessage })
	setTimeout(() => {
		localStorage.setItem(BLOCK_DEVICE, unlockTime.toString()) //* Limitation for saveLogInLocalStorage
	}, 1000)

	if (unlockTime !== 0) {
		setUnlockTimer(unlockTime)
	}
}

export default blockDevice