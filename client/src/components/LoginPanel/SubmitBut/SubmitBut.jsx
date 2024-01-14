import { useState } from 'react'




const SubmitBut = ({icon, notSaveUser, onClick, disabled}) => {

    const [load, setLoad] = useState(false)

    const handleClickButton = () => {
        setLoad(true)
        onClick().then(() => setLoad(false))
    }
    
    return (
        <button
            className='submit-but cont'
            type={notSaveUser ? 'button' : 'submit'}
            // disabled={disabled}
            disabled={load}
            onClick={notSaveUser ? handleClickButton : null}
        >
            {icon}
        </button>
    )
}

export default SubmitBut