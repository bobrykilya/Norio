import { useState } from 'react'




const SubmitBut = (props) => {

    const [load, setLoad] = useState(false)
    
    return (
        <button
            className='submit-but cont'
            type={props.notSaveUser ? 'button' : 'submit'}
            disabled={load}
            onClick={() => {
                setLoad(true)
                props.onClick()
                .then(() => setLoad(false))
            }}
        >
            {props.icon}
        </button>
    )
}

export default SubmitBut