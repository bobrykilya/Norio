import { useEffect } from 'react'



export const useClickOutside = (ref, buttonRef, condition, callback) => {

    // console.log(condition)

    const handleClick = (e) => {
        if (ref.current && !ref.current.contains(e.target) && !buttonRef.current.contains(e.target)){
            callback()
        }
    }
    useEffect(() => {
        if (condition) {
            document.addEventListener('click', handleClick)
            return () => {
                document.removeEventListener('click', handleClick)
            }
        } else return
    })

}