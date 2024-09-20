import { useCallback, useEffect, useMemo, useRef } from 'react'



export default function useTimeout(callback: any, delay: number) {
	const timeoutRef = useRef()
	const callbackRef = useRef(callback)

	useEffect(() => {
		callbackRef.current = callback
	}, [callback])

	useEffect(() => {
		return () => window.clearTimeout(timeoutRef.current)
	}, [])

	const memoizedCallback = useCallback(
		(args: any) => {
			if (timeoutRef.current) {
				window.clearTimeout(timeoutRef.current)
			}
			// @ts-ignore
			timeoutRef.current = window.setTimeout(() => {
				timeoutRef.current = null
				callbackRef.current?.(args)
			}, delay)
		},
		[delay, timeoutRef, callbackRef]
	)

	return useMemo(() => [memoizedCallback], [memoizedCallback])
}

// const [timeout] = useTimeout(() => {
//     setShow(false);
// }, 1500)