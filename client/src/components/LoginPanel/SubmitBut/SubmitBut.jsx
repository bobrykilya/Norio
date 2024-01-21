import { useState } from 'react'




const SubmitBut = ({icon, notSaveUser, onClick, disabled=false, isLoading}) => {

    const [load, setLoad] = useState(false)

    const handleClickButton = () => {
        // console.log('onClick')
        setLoad(true)
        onClick().then(() => setLoad(false))
    }
    
    return (
        <button
            className='submit-but cont'
            type={notSaveUser ? 'button' : 'submit'}
            // disabled={disabled}
            disabled={disabled ? true : (notSaveUser ? load : isLoading)}
            onClick={notSaveUser ? handleClickButton : null}
        >
            {icon}
        </button>
    )
}

export default SubmitBut