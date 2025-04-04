import { DurationTypeOptions } from '../../../common/types/Global-types'



export const getTime = (ms=false) => {
	if (ms) {
		return Date.now()  //* In milliseconds
	}
    return Math.round(Date.now() / 1000) //* In seconds
}

type IGetEndTime = {
	startTimeInSec: number;
	duration: number;
	durationType?: DurationTypeOptions
}
//* Get the final time after duration (in seconds)
export const getEndTime = ({ startTimeInSec, duration, durationType }: IGetEndTime) => {
    switch (durationType) {
		case 'minute': return startTimeInSec + duration * 60
		case "hour": return startTimeInSec + duration * 60 * 60
        default: return startTimeInSec + duration
    }
}

export const getTimeInShortString = (time: number) => {
    const date = new Date(time * 1000)
    return date.toLocaleString().split(',')[1]
}

export const getDateInShortString = (time: number) => {
	const date = new Date(time * 1000)
	return date.toLocaleString().split(',')[0]
}

export const getTimeToNextDayInSec = () => {
	const tomorrow = new Date().setHours(24, 0, 0)
	return (tomorrow - getTime(true)) / 1000
}
