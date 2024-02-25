import { useState } from 'react'
import ToolTip from '../../ToolTip/ToolTip'




const SubmitBut = ({icon, notSaveUser, onClick, disabled=false, isLoading, title}) => {

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
            tabIndex={-1}
            disabled={disabled ? true : (notSaveUser ? load : isLoading)}
            onClick={notSaveUser ? handleClickButton : null}
        >
            {icon}
            <ToolTip text={title} />
        </button>
    )
}

export default SubmitBut