import React from "react"
import { PiWarning, PiWarningFill } from "react-icons/pi"
import ToolTip from '../ToolTip/ToolTip'
import toast, { useToasterStore } from 'react-hot-toast'
import RoundButton from "../../common/Buttons/RoundButton/RoundButton"
import { useLogBookListState } from "../../../stores/Global-store"



type LogBookButtonProps = {
    isAuthPage?: boolean;
    delayTimeMS?: number;
}
const LogBookButton = ({ isAuthPage=false, delayTimeMS }: LogBookButtonProps) => {

    const { setIsLogBookListOpened } = useLogBookListState()
    const { toasts } = useToasterStore()

    const openLogList = () => {
    // console.log(toasts)
        if (toasts[0]) {
            toasts.forEach(t => {
                toast.dismiss(t.id)
            })
        }
        // console.log(blockSnackBarMessageList)

        setIsLogBookListOpened(true)
    }


    return ( 
        <>
            <RoundButton
                onClick={openLogList}
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