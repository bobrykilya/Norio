
//* Get the final time after duration (in seconds)
export const getEndTime = ({ startTime, duration }) => {
    return new Date(startTime.getTime() + duration * 1000)
}