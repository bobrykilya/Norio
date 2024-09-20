import React, { useEffect, useRef, useState } from 'react'



type InputErrorProps = {
    error: {
        message: string;
    };
    onClick: () => void;
}
const InputError = ({ error, onClick }: InputErrorProps) => {

    const [errorMess, setErrorMess] = useState('')
    const [isErrorOpened, setIsErrorOpened] = useState(false)
    const refSetTimeout = useRef<number | null>(null)

    useEffect(() => {
        // console.log(`error: ${error?.message}`)
        window.clearTimeout(refSetTimeout.current)

        //* Error opening
        if (error?.message && !errorMess) {
            // console.log('Open')

            setErrorMess(error?.message)
            setIsErrorOpened(true)
            return
        }

        //* Error swapping
        if (error?.message && errorMess && error?.message !== errorMess) {

            setIsErrorOpened(false)
            refSetTimeout.current = window.setTimeout(() => {
                // console.log('Swap')
                setErrorMess(error?.message)
                setIsErrorOpened(true)
            }, 300)
            return
        }

        //* Error closing
        if (!error || !error?.message) {

            setIsErrorOpened(false)
            refSetTimeout.current = window.setTimeout(() => {
                // console.log('Close')
                setErrorMess('')
            }, 300)
            return
        }
        
        //* Error move interception
        if (error?.message && error?.message === errorMess) {
            // console.log('Intercept')

            setIsErrorOpened(true)
            return
        }
    }, [error])

    return ( 
        <div className={`input_error-cont cont ${isErrorOpened ? 'opened' : ''}`} onClick={onClick}>
            <span>{errorMess}</span>
        </div>
     )
}
 
export default InputError