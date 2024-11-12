import React, { useState } from "react"
import { BiError } from "react-icons/bi"
import { PiWarningFill } from "react-icons/pi"
import LogBookList from './LogBookList'
import ToolTip from '../ToolTip/ToolTip'
import toast, { useToasterStore } from 'react-hot-toast'
import { useBlockError } from "../../../stores/Device-store"
import { showSnack } from "../../../features/showSnackMessage/showSnackMessage"



type LogBookButtonProps = {
    isClearIcon?: boolean;
}
const LogBookButton = ({ isClearIcon=false }: LogBookButtonProps) => {

    const [isLogListOpened, setIsLogListOpened] = useState(false)
    const blockErrorMessage = useBlockError(s => s.blockErrorMessage)
    const { toasts } = useToasterStore()

    const openLogList = () => {
        // console.log(toasts)
        if (toasts[0]) {
            toasts.forEach(t => {
                toast.dismiss(t.id)
            })
        }
        // console.log(blockSnackBarMessageList)
        setIsLogListOpened(true)

    }

    const closeLogList = () => {
        // console.log(blockErrorMessage)
        if (blockErrorMessage) {
            showSnack({ type: 'b', message: blockErrorMessage })
        }
        setIsLogListOpened(false)
    }

    return ( 
        <>
            <LogBookList closeLogList={closeLogList} isLogListOpened={isLogListOpened} />
            <button
                className='log_book-button cont before_but-hover'
                onClick={openLogList}
                type='button'
                tabIndex={-1}
            >
                {isClearIcon ?
                    < BiError className='fa-icon' />
                :
                    < PiWarningFill className='fa-icon' />
                }
                <ToolTip text='Открыть панель ошибок' position='bottom_left' />
            </button>
        </>
     )
}
 
export default LogBookButton