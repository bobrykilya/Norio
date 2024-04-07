import { useState } from 'react'
import ToolTip from '../../ToolTip/ToolTip'
import ConfirmButBgImg from '../../../assets/confirm_but_bg.jpg'



const SubmitBut = ({icon, notSaveUser, onClick, disabled=false, isLoading, title}) => {

    const [load, setLoad] = useState(false)

    const handleClickButton = () => {
        setLoad(true)
        onClick().then(() => setLoad(false))
    }
    
    return (
        <button
            className='submit-but cont'
            type={notSaveUser ? 'button' : 'submit'}
            tabIndex={-1}
            disabled={disabled ? true : (notSaveUser ? load : isLoading)}
            onClick={notSaveUser ? handleClickButton : null}
        >
            {icon}
            <ToolTip text={title} />
            <div className='confirm_but_bg-cont cont'>
                <img src={ConfirmButBgImg} className='confirm_but_bg-img' alt="" />
            </div>
        </button>
    )
}

export default SubmitBut