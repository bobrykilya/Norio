import React from "react"
import { PiWarning, PiWarningFill } from "react-icons/pi"
import RoundButton from "../../../common/Buttons/RoundButton/RoundButton"
import { useLogBookCardState } from "../../../../stores/Settings-store"



type LogBookButtonProps = {
    isAuthPage?: boolean;
    delayTimeMS?: number;
}
const LogBookButton = ({ isAuthPage=false, delayTimeMS }: LogBookButtonProps) => {

    const setLogBookCardState = useLogBookCardState(s => s.setLogBookCardState)


    return (
        <RoundButton
            onClick={() => setLogBookCardState(true)}
            className={'log_book-but before_hover-but'}
            toolTip={{
                text: 'Открыть панель ошибок',
                position: isAuthPage ? 'bottom_left' : 'right',
                delayTimeMS
            }}
        >
            {
                isAuthPage ?
                <PiWarning className='fa-icon' /> :
                <PiWarningFill className='fa-icon' />
            }
        </RoundButton>
     )
}
 
export default LogBookButton