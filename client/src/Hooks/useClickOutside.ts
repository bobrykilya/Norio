import { RefObject, useEffect } from 'react'



export type IUseClickOutside = {
    ref: RefObject<HTMLElement>;
    butRef?: RefObject<HTMLElement>;
    callback: () => void;
    conditionsList: boolean[];
}
export const useClickOutside = ({ ref, butRef, callback, conditionsList }: IUseClickOutside) => {

    const clickOutside = (e: MouseEvent) => {
        // console.log(butRef.current)
        // console.log(e.target)
        if ((ref.current && !ref.current.contains(e.target as Node)) &&
            (butRef ? (butRef.current && !butRef.current.contains(e.target as Node)) : true)) {
            callback()
        }
    }

    useEffect(() => {
        if (conditionsList.includes(false)) return

        document.addEventListener('click', clickOutside)
        return () => {
            document.removeEventListener('click', clickOutside)
        }
    }, [ref, conditionsList])

}