import { useState } from 'react'
import './SubmitBut.sass'



const SubmitBut = (props) => {

    const [load, setLoad] = useState(false)

    return (
        <button
            className='submit-but'
            type='submit'
            disabled={load}
            onClick={() => {
                setLoad(true)
                props.handleLog()
                .then(() => setLoad(false))
            }}
        >
            <i className="fa-solid fa-right-to-bracket"></i>
        </button>
    )
}

export default SubmitBut