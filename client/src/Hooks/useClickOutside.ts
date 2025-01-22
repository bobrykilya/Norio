import { RefObject, useEffect } from 'react'



export type IUseClickOutside = {
    ref: RefObject<HTMLElement>;
    butRef?: RefObject<HTMLElement>;
    callback: () => void;
    conditionsList: boolean[];
}
export const useClickOutside = ({ ref, butRef, callback, conditionsList }: IUseClickOutside) => {

    useEffect(() => {
        if (!conditionsList || conditionsList.includes(false)) return
        // console.log(condition)

        const handleClick = (e: MouseEvent) => {
            // console.log(buttonRef?.current.contains(e.target as Node))
            // console.log(e.target)
            if ((ref.current && !ref.current.contains(e.target as Node)) &&
                (butRef ? (butRef?.current && !butRef?.current.contains(e.target as Node)) : true)) {
                callback()
            }
        }

        document.addEventListener('click', handleClick)
        return () => {
            document.removeEventListener('click', handleClick)
        }
    }, [ref, conditionsList])

}