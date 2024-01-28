import { useEffect } from 'react'



export const useClickOutside = (ref, callback, buttonRef=null) => {

    useEffect(() => {
        // console.log(ref)

        const handleClick = (e) => {
            if (ref.current && !ref.current.contains(e.target) && !buttonRef?.current.contains(e.target)){
                callback()
            }
        }

        document.addEventListener('click', handleClick)
        return () => {
            document.removeEventListener('click', handleClick)
        }
    }, [ref])

}