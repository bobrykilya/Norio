import { RefObject } from "react"



export const useFocusInput = (ref: RefObject<HTMLInputElement>) => {
    ref.current.focus()

    //* Moving cursor to the input's end
    const length = ref.current.value.length
    setTimeout(() => {
        ref.current.setSelectionRange(length, length)
    }, 1)

}