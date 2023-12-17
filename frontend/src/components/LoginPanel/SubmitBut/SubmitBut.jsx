import { useState } from 'react'



const SubmitBut = (props) => {

    const [load, setLoad] = useState(false)
    
    return (
        <button
            className='submit-but'
            type={props.notSaveUser ? 'button' : 'submit'}
            disabled={load}
            onClick={() => {
                setLoad(true)
                props.onClick()
                .then(() => setLoad(false))
            }}
        >
            <i className={props.icon}></i>
        </button>
    )
}

export default SubmitBut