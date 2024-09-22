import React from 'react'
import ToolTip from '../../ToolTip/ToolTip'
import CircularProgress from '@mui/joy/CircularProgress'



interface SubmitButProps {
    icon: React.ReactElement;
    isLoading: boolean;
    title: string;
    notSaveUser?: boolean;
    onClick?: () => void;
    disabled?: boolean;
    blur?: boolean;
    tabIndex?: number;
}
const SubmitBut = ({ icon, isLoading, notSaveUser=false, onClick, disabled=false, blur=false, title, tabIndex=-1 }: SubmitButProps) => {

    return (
        <button
            className={`submit-but cont ${blur && 'blur'}`}
            type={notSaveUser ? 'button' : 'submit'}
            tabIndex={tabIndex}
            disabled={disabled ? true : isLoading}
            onClick={notSaveUser ? onClick : () => null}
        >
            {!isLoading ? icon : <CircularProgress color="neutral" size="sm" variant="plain" />}
            <ToolTip text={title} />
        </button>
    )
}

export default SubmitBut