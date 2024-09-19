export const getTime = () => {
    return Date.now()
}

export const getTimeString = (time: number) => {
    return new Date(time).toLocaleString()
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
    startTime: number;
    duration: number;
    durationType: IDurationType;
}
export const getEndTime = ({ startTime, duration, durationType=null }: IUseGetEndTime) => {
    switch (durationType) {
        case 'minute': return startTime + duration * 1000 * 60
        default: return startTime + duration * 1000
    }
}