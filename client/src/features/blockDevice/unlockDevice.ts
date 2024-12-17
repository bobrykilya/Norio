import { getTime } from "../../utils/getTime"



const setUnlockTimer = (logOutTime: number) => {
    const timeOutTime = logOutTime - getTime() + 1 //* Until logout time in seconds
    // console.log(timeOutTime)
    if (!timeOutTime) return

    setTimeout(() => {
        unlockDevice()
    }, timeOutTime)
}

const unlockDevice = () => {
    localStorage.removeItem('blockDevice')
    location.reload()
}

export { setUnlockTimer }