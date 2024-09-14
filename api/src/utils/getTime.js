export const getTime = () => {
    return Date.now()
}

//* Get the final time after duration (in seconds)
export const getEndTime = ({ startTime, duration, durationType=null }) => {

    switch (durationType) {
        case 'minute': return startTime + duration * 1000 * 60
        default: return startTime + duration * 1000
    }
}

export const getTimeInShortString = (time) => {
    const date = new Date(time)
    return date.getHours() + ':' + date.getMinutes()
}
