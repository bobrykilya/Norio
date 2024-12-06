import { RefObject, useEffect } from 'react'



export const useClickOutside = (ref: RefObject<HTMLElement>, callback: () => void, buttonRef: RefObject<HTMLElement>, condition: boolean | 0 = 0) => {

    useEffect(() => {
        // console.log(ref)
        if (condition !== 0 && !condition) return

        const handleClick = (e: MouseEvent) => {
            // console.log(buttonRef?.current.contains(e.target as Node))
            if ((ref.current && !ref.current.contains(e.target as Node)) && (buttonRef?.current && !buttonRef?.current.contains(e.target as Node))) {
                callback()
            }
        }

        document.addEventListener('click', handleClick)
        return () => {
            document.removeEventListener('click', handleClick)
        }
    }, [ref, condition])

}