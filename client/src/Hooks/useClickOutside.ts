import { RefObject, useEffect } from 'react'



type IUseClickOutside = {
    ref: RefObject<HTMLElement>;
    butRef: RefObject<HTMLElement>;
    callback: () => void;
    condition?: boolean | 0;
}
export const useClickOutside = ({ ref, butRef, callback, condition=0 }: IUseClickOutside) => {

    useEffect(() => {
        if (condition !== 0 && !condition) return
        // console.log(condition)

        const handleClick = (e: MouseEvent) => {
            // console.log(buttonRef?.current.contains(e.target as Node))
            if ((ref.current && !ref.current.contains(e.target as Node)) && (butRef?.current && !butRef?.current.contains(e.target as Node))) {
                callback()
            }
        }

        document.addEventListener('click', handleClick)
        return () => {
            document.removeEventListener('click', handleClick)
        }
    }, [ref, condition])

}