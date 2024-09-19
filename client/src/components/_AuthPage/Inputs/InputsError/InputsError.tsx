import React, { useEffect, useRef, useState } from 'react'



type InputsErrorProps = {
    error: {
        message: string;
    };
    onClick: () => void;
}
const InputsError = ({ error, onClick }: InputsErrorProps) => {

    const [errorMess, setErrorMess] = useState('')
    const [isErrorOpened, setIsErrorOpened] = useState(false)
    const refSetTimeout = useRef(null)

    useEffect(() => {
        // console.log(`error: ${error?.message}`)

        //* Error opening
        if (error?.message && !errorMess) {
            // console.log('Open')

            setErrorMess(error?.message)
            setIsErrorOpened(true)
            return
        }

        //* Error swapping
        if (error?.message && errorMess && error?.message !== errorMess) {
            // console.log('Swap')

            setIsErrorOpened(false)
            refSetTimeout.current = setTimeout(() => {
                setErrorMess(error?.message)
                setIsErrorOpened(true)
            }, 300)
            return
        }

        //* Error closing
        if (!error || !error?.message) {
            // console.log('Close')
            
            setIsErrorOpened(false)
            refSetTimeout.current = setTimeout(() => {
                setErrorMess('')
            }, 300)
            return
        }
        
        //* Error move interception
        if (error?.message && error?.message === errorMess) {
            // console.log('Intercept')

            clearTimeout(refSetTimeout.current)
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
 
export default InputsError