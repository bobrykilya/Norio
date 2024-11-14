export const WEEK_DAYS_LIST = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
export const MONTHS_LIST = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']



export const getTime = () => {
    return Date.now()
}

export const getTimeString = (time: number) => {
    return new Date(time).toLocaleString()
}

export const getTimeParams = (time?: number) => {
    const now = time ? new Date(time) : new Date()
    return { hours: now.getHours(), minutes: now.getMinutes(), seconds: now.getSeconds() }
}

export const getTimeParamString = (time: number) => {
    if (time >= 10)
        return time.toString()
    else
        return `0${time}`
}

export const getDateParams = (time?: number) => {
    const date = time ? new Date(time) : new Date()
    const now = date.toISOString().split('T')[0]
    const day = Number(now.split('-')[2])
    const month = Number(now.split('-')[1])
    const year = Number(now.split('-')[0])
    return { day, month, year, dayNum: date.getDay()-1, dateString: `${day}.${month}.${year}` }
}

type getWeekOfMonthProps = {
    month?: number;
    year?: number;
}
export const getWeekOfMonth = ({ month, year }: getWeekOfMonthProps) => {
    const month_ = month || new Date().getMonth()
    const year_ = year || new Date().getFullYear()
    const firstDayOfMonth = new Date(year_, month_-1, 0).getTime()
    const now = new Date().getTime()
    return Math.ceil((now - firstDayOfMonth) / (1000 * 60 * 60 * 24 * 7))
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

export const getDayOfWeek = (num: number) => {
    return WEEK_DAYS_LIST[num]
}
export const getMonth = (num: number) => {
    return MONTHS_LIST[num-1]
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