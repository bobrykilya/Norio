import { RefObject } from 'react'

import timeout from './timeout'



export const focusInput = async (ref: RefObject<HTMLInputElement>) => {
	if (!ref.current) {
		return
	}
	ref.current.focus()

	//* Moving cursor to the input's end
	const length = ref.current.value.length
	await timeout(10)
	ref?.current?.setSelectionRange(length, length)
}