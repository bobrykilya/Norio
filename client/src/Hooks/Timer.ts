
export class Timer {
    
    timer: number | null;
    call: () => void;
    setTimer: (timerId: number) => void;

    constructor(timer: number | null, setTimer: (timerId: number) => void,  call: () => void) {
        this.timer = timer;
        this.setTimer = setTimer;
        this.call = call;
    }

    start = (endTime: Date) => {
        const timeOutTime = new Date(endTime).getTime() - new Date().getTime()
        if (!timeOutTime || timeOutTime < 0) return
        
        const timerId = setTimeout(() => {
            this.call()
        }, timeOutTime)
        
        this.setTimer(timerId)
    }

    stop = () => {
        // console.log(this.timer)
        if (this.timer) {
            clearTimeout(this.timer)
        }
    }
}