import { useState } from 'react'



const SubmitBut = (props) => {

    const [load, setLoad] = useState(false)
    
    return (
        <button
            className='submit-but'
            //! type='submit'
            type='button'
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