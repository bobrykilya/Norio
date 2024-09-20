import { IoCloseCircleOutline } from "react-icons/io5"
import ToolTip from '../../../ToolTip/ToolTip'
import React from "react";



type InputCleanerProps = {
    opened: boolean;
    onClick: () => void;
}
const InputCleaner = ({ opened, onClick }: InputCleanerProps) => {

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
 
export default InputCleaner