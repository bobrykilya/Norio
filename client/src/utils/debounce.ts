type ICallback = (...args: any[]) => void

export const throttle = (callback: ICallback, delayInMS: number) => {
	let timer = 0
	return function (...args: any[]) {
		if (Date.now() - timer > delayInMS) {
			// console.log('callback')
			callback(...args)
		}
		timer = Date.now()
	}
}

const lightThrottle = (callback: ICallback , time: number) => {
	let allowed = true
	return function (...args: any[]) {
		if (!allowed) {
			return
		}
		allowed = false

		setTimeout(() => {
			allowed = true
		}, time)
		// callback.apply(null, ...args)
		callback(...args)
	}
}

const debounce = (callback: ICallback, delayInMS: number) => {
	let timeoutId = null
	return function(...args: any[]) {
		clearTimeout(timeoutId)

		timeoutId = setTimeout(() => {
			callback.apply(this, ...args)
		}, delayInMS)
	}
}