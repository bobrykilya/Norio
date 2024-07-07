import React from 'react'
import ToolTip from '../../ToolTip/ToolTip'
import CircularProgress from '@mui/joy/CircularProgress'
// import ConfirmButBgImg from '../../../assets/confirm_but_bg.jpg'



interface SubmitButProps {
    icon: React.ReactElement;
    notSaveUser?: boolean;
    onClick?: () => void;
    disabled?: boolean;
    isLoading: boolean;
    title: string;
}
const SubmitBut = ({icon, notSaveUser=false, onClick, disabled=false, isLoading, title}: SubmitButProps) => {

    return (
        <button
            className='submit-but cont'
            type={notSaveUser ? 'button' : 'submit'}
            tabIndex={-1}
            disabled={disabled ? true : isLoading}
            onClick={onClick}
        >
            {!isLoading ? icon : <CircularProgress color="neutral" size="sm" variant="plain" />}
            <ToolTip text={title} />
            {/* <div className='confirm_but_bg-cont cont'>
                <img src={ConfirmButBgImg} className='confirm_but_bg-img' alt="" />
            </div> */}
        </button>
    )
}

export default SubmitBut