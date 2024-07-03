import { useRef } from 'react'



// const refSetTimeout = useRef(null)

const setUnlockTimer = (logOutTime: string) => {
    const timeOutTime = new Date(logOutTime).getTime() - new Date().getTime()
    if (!timeOutTime) return

    setTimeout(() => {
        unlockDevice()
    }, timeOutTime)
}

const unlockDevice = () => {
    localStorage.removeItem('blockDevice')
}

export { setUnlockTimer }