type AvailableType = 'hour' | 'minute' | 'second'

const useGetLastTime = (timestamp: string, type: AvailableType): number => {
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

export default useGetLastTime