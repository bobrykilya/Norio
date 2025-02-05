import { IoCloseCircleOutline } from "react-icons/io5"
import React from "react";
import RoundButton from "../../../Buttons/RoundButton/RoundButton"



type InputCleanerProps = {
    opened: boolean;
    onClick: () => void;
}
const InputCleaner = ({ opened, onClick }: InputCleanerProps) => {

    return ( 
        <RoundButton
            onClick={onClick}
            className={`inputs_cleaner-but before_hover-but ${opened ? 'opened' : ''}`}
            toolTip={{
                text: 'Очистить поле'
            }}
            size={'tiny'}
        >
            <IoCloseCircleOutline className='fa-icon' />
        </RoundButton>
     )
}
 
export default InputCleaner