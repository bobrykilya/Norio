import React from "react"
import { PiWarning, PiWarningFill } from "react-icons/pi"
import { useLogBookListState } from "../../../stores/Global-store"
import RoundButton from "../../common/Buttons/RoundButton/RoundButton"



type LogBookButtonProps = {
    isAuthPage?: boolean;
    delayTimeMS?: number;
}
const LogBookButton = ({ isAuthPage=false, delayTimeMS }: LogBookButtonProps) => {

    const setLogBookListState = useLogBookListState(s => s.setLogBookListState)


    return (
        <RoundButton
            onClick={() => setLogBookListState(true)}
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