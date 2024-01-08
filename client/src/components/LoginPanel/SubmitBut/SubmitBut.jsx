// import { useState } from 'react'




const SubmitBut = ({icon, notSaveUser, disabled}) => {

    // const [load, setLoad] = useState(false)
    
    return (
        <button
            className='submit-but cont'
            type={notSaveUser ? 'button' : 'submit'}
            // disabled={disabled}
            // disabled={load}
            // onClick={() => {
            //     setLoad(true)
            //     // onClick()
            //     .then(() => setLoad(false))
            // }}
        >
            {icon}
        </button>
    )
}

export default SubmitBut