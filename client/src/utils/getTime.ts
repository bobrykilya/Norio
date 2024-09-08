import { TIME_ZONE } from "../../constants"

export const getTime = () => {
    return Date.now()
}

export const getTimeString = (time: number) => {
    // const timeZone = new Date().getTimezoneOffset() //* Belarus timeZone = -180 (+3 GMT)
    // return new Date(time + (-timeZone * 60 * 1000)).toUTCString()
    return new Date(time + (TIME_ZONE * 60 * 60 * 1000)).toUTCString()
}

type TypeOptions = 'hour' | 'minute' | 'second';
export const getLastTime = (timestamp: number, type: TypeOptions): number => {
    try {
        const timeDiff = (getTime() - timestamp) / 1000 //* Time in seconds
        // console.log(timeDiff)
    
        switch (type) {
            case 'hour': return (timeDiff / 60 / 60)
            case 'minute': return (timeDiff / 60)
            case 'second': return timeDiff
        }
    } catch (err) {
        console.log('Ошибка даты при сохранении в ErrsList в LocalStorage (getLastTime)')
        console.error(err)
        throw new Error('Ошибка даты при сохранении в ErrsList в LocalStorage (getLastTime)')
    }
}


type IUseGetEndTime = {
    startTime: Date;
    duration: number;
}
//* Getting timestamp (LocalString) and time-string after duration time (in minutes)
export const getEndTime = ({ startTime, duration }: IUseGetEndTime): string => {

    const time = new Date(startTime)
    time.setMinutes(time.getMinutes() + duration)
    // console.log(time.toUTCString())
    // const time_2 = new Date(time.toUTCString())
    // console.log(time_2.toUTCString())

    return time.toUTCString()
}