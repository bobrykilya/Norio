export const getTime = () => {

    return Date.now()
}

//* Get the final time after duration (in seconds)
export const getEndTime = ({ startTime, duration }) => {
    return startTime + duration * 1000
}

export const getTimeInShortString = (time) => {
    return new Date(time).toLocaleTimeString()
}
