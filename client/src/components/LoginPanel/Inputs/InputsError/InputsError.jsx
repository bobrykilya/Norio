import { useState, useEffect } from 'react';



const InputsError = ({error}) => {

    const [errorMess, setErrorMess] = useState('');
    const [isErrorOpened, setIsErrorOpened] = useState(false);

    // console.log(error)
    useEffect(() => {
        if (error?.message !== '' && error?.message !== errorMess) {
            // console.log('Message saved')
            setIsErrorOpened(false)
            setTimeout(() => {
                setErrorMess(error?.message)
                setIsErrorOpened(true)
            }, 400)
        }
        if (!error) {
            setIsErrorOpened(false)
        }
        // console.log('Message saved')
    }, [error]);

    return ( 
        <div className={`input_error-cont cont ${isErrorOpened ? 'opened' : ''}`}>
            {/* <span>{error?.message}</span> */}
            <span>{errorMess}</span>
        </div>
     );
}
 
export default InputsError;