import { RefObject, useEffect } from 'react'



export const useClickOutside = (ref: RefObject<HTMLElement>, callback: () => void, buttonRef: RefObject<HTMLElement> | null = null) => {

    useEffect(() => {
        // console.log(ref)

        const handleClick = (e: MouseEvent) => {
            if ((ref.current && !ref.current.contains(e.target as Node)) && (buttonRef?.current && !buttonRef.current.contains(e.target as Node))) {
                callback()
            }
        }

        document.addEventListener('click', handleClick)
        return () => {
            document.removeEventListener('click', handleClick)
        }
    }, [ref])

}