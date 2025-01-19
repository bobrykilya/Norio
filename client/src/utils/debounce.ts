type IDebounceCallback = (...args: any[]) => void

const debounceWithStart = (callback: IDebounceCallback, delayInMS: number) => {
	let timer = 0
	return function debouncedFn(...args: any[]) {
		if (Date.now() - timer > delayInMS) {
			// console.log('callback')
			callback(...args)
		}
		timer = Date.now()
	}
}

const debounce = (callback: IDebounceCallback, delayInMS: number) => {
	let timeoutId = null
	return (...args: any[]) => {
		clearTimeout(timeoutId)
		timeoutId = setTimeout(() => {
			callback(...args)
		}, delayInMS)
	};
}


export {
	debounceWithStart,
}