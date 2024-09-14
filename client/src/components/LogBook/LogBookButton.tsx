import React, { useState } from "react"
import { BiError } from "react-icons/bi"
import LogBookList from './LogBookList'
import ToolTip from '../ToolTip/ToolTip'
import toast, { useToasterStore } from 'react-hot-toast'
import { showSnackBarMessage } from '../../features/showSnackBarMessage/showSnackBarMessage'
import { useBlockError } from "../../stores/Global-store"


const LogBookButton = () => {

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
            showSnackBarMessage({ type: 'b', message: blockErrorMessage })
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
                <BiError className='fa-icon' />            
                <ToolTip text='Открыть панель ошибок' position='bottom_left' />
            </button>
        </>
     )
}
 
export default LogBookButton