import React from "react";
import RoundButton from "../../../../Buttons/RoundButton/RoundButton"
import { ICONS } from "../../../../../../assets/common/Icons-data"



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
            {ICONS.closeCircled}
        </RoundButton>
     )
}
 
export default InputCleaner