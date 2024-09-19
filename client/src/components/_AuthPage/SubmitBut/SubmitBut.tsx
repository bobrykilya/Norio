import React from 'react'
import ToolTip from '../../ToolTip/ToolTip'
import CircularProgress from '@mui/joy/CircularProgress'



interface SubmitButProps {
    icon: React.ReactElement;
    notSaveUser?: boolean;
    onClick?: () => void;
    disabled?: boolean;
    blur?: boolean;
    isLoading: boolean;
    title: string;
}
const SubmitBut = ({ icon, notSaveUser=false, onClick, disabled=false, blur=false, isLoading, title }: SubmitButProps) => {

    return (
        <button
            className={`submit-but cont ${blur && 'blur'}`}
            type={notSaveUser ? 'button' : 'submit'}
            tabIndex={-1}
            disabled={disabled ? true : isLoading}
            onClick={notSaveUser ? onClick : () => null}
        >
            {!isLoading ? icon : <CircularProgress color="neutral" size="sm" variant="plain" />}
            <ToolTip text={title} />
        </button>
    )
}

export default SubmitBut