
const getLastTime = (timestamp, type) => {

    const nowTime = new Date()
    const timestampTime = new Date(timestamp)
    const timeDiff = (nowTime - timestampTime) / 1000 //* Time in seconds
    // console.log({ timestamp, nowTime, timestampTime, timeDiff })
    // console.log(timeDiff)

    if (!timeDiff) {
        console.log('Ошибка даты при сохранении в ErrsList в LocalStorage')
        // throw new Error('Ошибка даты при сохранении в ErrsList в LocalStorage')
    }

    switch (type) {
        case 'hour': return (timeDiff / 60 / 60)
        case 'minute': return (timeDiff / 60)
        case 'second': return timeDiff
    }
}

export default getLastTime