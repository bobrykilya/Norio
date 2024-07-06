import { BiError } from "react-icons/bi"
import LogBookList from './LogBookList'
import ToolTip from '../ToolTip/ToolTip'
import toast, { useToasterStore } from 'react-hot-toast'
import { showSnackBarMessage } from '../../features/showSnackBarMessage/showSnackBarMessage'
import { useBlockError, useLogList } from '../../stores/Global-store'



const LogBookButton = () => {

    const { isErrorsLogListOpened, setIsErrorsLogListOpened } = useLogList()
    const blockErrorMessage = useBlockError(s => s.blockErrorMessage)
    const { toasts } = useToasterStore()

    const checkSnackBarListBeforeOpen = () => {
        // console.log(toasts)
        if (toasts[0]) {
            toasts.forEach(t => {
                toast.dismiss(t.id)
            })
        }
        // console.log(blockSnackBarMessageList)
        setIsErrorsLogListOpened(true)
    }

    const checkSnackBarListBeforeClose = () => {
        // console.log(blockSnackBarMessage)
        if (blockErrorMessage) {
            // showSnackBarMessage({ type: 'b', message: blockErrorMessage })
        }
        setIsErrorsLogListOpened(false)
    }

    return ( 
        <>
            <LogBookList closeErrorsLogList={checkSnackBarListBeforeClose} isErrorsLogListOpened={isErrorsLogListOpened} />
            <button 
                className='log_book-button cont before_but-hover'
                onClick={() => checkSnackBarListBeforeOpen()}
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