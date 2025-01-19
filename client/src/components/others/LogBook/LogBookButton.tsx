import React from "react"
import { PiWarning, PiWarningFill } from "react-icons/pi"
import RoundButton from "../../common/Buttons/RoundButton/RoundButton"
import { useLogBookListState } from "../../../stores/Global-store"



type LogBookButtonProps = {
    isAuthPage?: boolean;
    delayTimeMS?: number;
}
const LogBookButton = ({ isAuthPage=false, delayTimeMS }: LogBookButtonProps) => {

    const setLogBookListState = useLogBookListState(s => s.setLogBookListState)


    return ( 
        <>
            <RoundButton
                icon={isAuthPage ?
                    < PiWarning className='fa-icon' /> :
                    < PiWarningFill className='fa-icon' />
                }
                onClick={() => setLogBookListState(true)}
                className={'log_book-button'}
                toolTip={{
                    text: 'Открыть панель ошибок',
                    position: isAuthPage ? 'bottom_left' : 'right',
                    delayTimeMS
                }}
            />
        </>
     )
}
 
export default LogBookButton