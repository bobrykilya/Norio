import { useState, useEffect } from 'react'



const InputsError = ({ error }) => {

    const [errorMess, setErrorMess] = useState('')
    const [isErrorOpened, setIsErrorOpened] = useState(false)

    useEffect(() => {
        // console.log(`error: ${error}`)
        // console.log('Message saved')
        if (!error?.message || !error) {
            setIsErrorOpened(false)
            setTimeout(() => {
                setErrorMess('')
            }, 300)
            return
        }
        if (error?.message !== '' && error?.message !== errorMess) {
            setIsErrorOpened(false)
            setTimeout(() => {
                setErrorMess(error?.message)
                setIsErrorOpened(true)
            }, 300)
            return
        }
    }, [error])

    return ( 
        <div className={`input_error-cont cont ${isErrorOpened ? 'opened' : ''}`}>
            <span>{errorMess}</span>
        </div>
     )
}
 
export default InputsError