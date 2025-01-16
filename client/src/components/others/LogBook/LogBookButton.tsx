import React from "react"
import { PiWarning, PiWarningFill } from "react-icons/pi"
import ToolTip from '../ToolTip/ToolTip'
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
                onClick={() => setLogBookListState(true)}
                className={'log_book-button'}
            >
                {isAuthPage ?
                    < PiWarning className='fa-icon' />
                :
                    < PiWarningFill className='fa-icon' />
                }
                <ToolTip text='Открыть панель ошибок' position={`${isAuthPage ? 'bottom_left' : 'right'}`} delayTimeMS={delayTimeMS} />
            </RoundButton>
        </>
     )
}
 
export default LogBookButton