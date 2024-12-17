export const WEEK_DAYS_LIST = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
export const MONTHS_LIST = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']



export const getTime = () => {
    return Math.round(Date.now() / 1000)//* In seconds
}


type paramsListOptions = 'now' | 'second'| 'minute' | 'hour' | 'day' | 'month' | 'year' | 'dayNum' | 'timeString' | 'timeStringFull' | 'dateString'
export const getTimeParams = (paramsList: paramsListOptions[], time?: number) => {
    const now = time ? new Date(time) : new Date()

    return {
        ...(paramsList.includes('now') && { now }),
        ...(paramsList.includes('second') && { second: now.getSeconds() }),
        ...(paramsList.includes('minute') && { minute: now.getMinutes() }),
        ...(paramsList.includes('hour') && { hour: now.getHours() }),
        ...(paramsList.includes('day') && { day: now.getDate() }),
        ...(paramsList.includes('month') && { month: now.getMonth() + 1 }),
        ...(paramsList.includes('year') && { year: now.getFullYear() }),
        ...(paramsList.includes('dayNum') && { dayNum: now.getDay() - 1 }),
        ...(paramsList.includes('timeString') && { timeString: now.toLocaleTimeString().slice(0, 5) }),
        ...(paramsList.includes('timeStringFull') && { timeStringFull: now.toLocaleTimeString() }),
        ...(paramsList.includes('dateString') && { dateString: now.toLocaleDateString() }),
    }
}

export const zeroHandler = (time: number) => {
    if (time >= 10)
        return time.toString()
    else
        return `0${time}`
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
export const getLastTime = (timestampInSec: number, type: TypeOptions): number => {
    try {
        const timeDiff = getTime() - timestampInSec //* Time in seconds
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

    return WEEK_DAYS_LIST[num] || WEEK_DAYS_LIST[6]
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