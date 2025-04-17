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

export const asyncThrottle = <T>(callback: ICallback, time: number) => {
	let allowed = true
	return async function (...args: any[]): Promise<T> {
		if (!allowed) {
			return
		}
		allowed = false

		setTimeout(() => {
			allowed = true
		}, time)
		await callback.apply(null, ...args)
	}
}

export const debounce = (callback: ICallback, delayInMS: number) => {
	let timeoutId = null
	return function(...args: any[]) {
		clearTimeout(timeoutId)

		timeoutId = setTimeout(() => {
			callback.apply(null, ...args)
		}, delayInMS)
	}
}