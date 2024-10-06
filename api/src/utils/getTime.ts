export const getTime = () => {
    return Date.now()
}

type IGetEndTime = {
	startTime: number;
	duration: number;
	durationType?: 'minute'
}
//* Get the final time after duration (in seconds)
export const getEndTime = ({ startTime, duration, durationType }: IGetEndTime) => {

    switch (durationType) {
        case 'minute': return startTime + duration * 1000 * 60
        default: return startTime + duration * 1000
    }
}

export const getTimeInShortString = (time: number) => {
    const date = new Date(time)
    return date.toLocaleString().split(',')[1]
}
