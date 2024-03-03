import { useState } from 'react'
import ToolTip from '../../ToolTip/ToolTip'
import ConfirmButBgImg from '../../../assets/confirm_but_bg.jpg'



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
            <img src={ConfirmButBgImg} className='confirm_but_bg-img' alt="" />
            {icon}
            <ToolTip text={title} />
        </button>
    )
}

export default SubmitBut