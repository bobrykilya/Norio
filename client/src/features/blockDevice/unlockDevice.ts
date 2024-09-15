import { getTime } from "../../utils/getTime"



const setUnlockTimer = (logOutTime: number) => {
    const timeOutTime = logOutTime - getTime() + 1000 //* Until logout time in milliseconds
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