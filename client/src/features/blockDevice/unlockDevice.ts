import { getTime } from '@utils/getTime'



const setUnlockTimer = (logOutTime: number) => {
	const timeOutTime = logOutTime - getTime() + 1 //* Until logout time in seconds
	if (!timeOutTime) return

	setTimeout(() => {
		unlockDevice()
	}, timeOutTime * 1000)
}

const unlockDevice = () => {
	location.reload()
}

export { setUnlockTimer }