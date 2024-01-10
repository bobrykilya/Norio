import { useState, useEffect } from 'react'



const InputsError = ({error}) => {

    const [errorMess, setErrorMess] = useState('')
    const [isErrorOpened, setIsErrorOpened] = useState(false)

    useEffect(() => {
        // console.log('Message saved')
        // console.log(error)
        if (!error) {
            setIsErrorOpened(false)
            setTimeout(() => {
                setErrorMess('')
            }, 300)
            return
        }
        if (error?.message !== '' && error?.message !== errorMess) {
            // console.log('Message saved')
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
            {/* <span>{error?.message}</span> */}
            <span>{errorMess}</span>
        </div>
     )
}
 
export default InputsError