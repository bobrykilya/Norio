type TypeOptions = 'hour' | 'minute' | 'second';

export const getLastTime = (timestamp: string, type: TypeOptions): number => {
    try {
        const nowTime = new Date()
        const timestampTime = new Date(timestamp)
        const timeDiff = (nowTime.valueOf() - timestampTime.valueOf()) / 1000 //* Time in seconds
        // console.log({ timestamp, nowTime, timestampTime, timeDiff })
        // console.log(timeDiff)
    
        switch (type) {
            case 'hour': return (timeDiff / 60 / 60)
            case 'minute': return (timeDiff / 60)
            case 'second': return timeDiff
        }
    } catch (err) {
        console.log('Ошибка даты при сохранении в ErrsList в LocalStorage')
        console.error(err)
        throw new Error('Ошибка даты при сохранении в ErrsList в LocalStorage')
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