import { RefObject } from "react"



export const focusInput = async (ref: RefObject<HTMLInputElement> ) => {
    if (!ref.current) {
        return
    }
    ref.current.focus()

    //* Moving cursor to the input's end
    const length = ref.current.value.length
    await wait(1)
    ref?.current?.setSelectionRange(length, length)
}

function wait(ms: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms)
    })
}