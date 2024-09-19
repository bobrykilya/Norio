import { IoCloseCircleOutline } from "react-icons/io5"
import ToolTip from '../../../ToolTip/ToolTip'
import React from "react";



type InputsCleanerProps = {
    opened: boolean;
    onClick: () => void;
}
const InputsCleaner = ({ opened, onClick }: InputsCleanerProps) => {

    return ( 
        <button 
            className={`inputs_cleaner-but before_but-hover cont ${opened ? 'opened' : ''}`}
            tabIndex={-1}
            type='button'
            onClick={onClick}
        >
            <IoCloseCircleOutline className='fa-icon' />
            <ToolTip text='Очистить поле' />
        </button>
     )
}
 
export default InputsCleaner