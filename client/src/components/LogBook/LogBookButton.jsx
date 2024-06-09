import { useContext, useState } from 'react'
import { GlobalContext } from '../../context/Global-context'
import { BiError } from "react-icons/bi"
import LogBook from './LogBook';
import ToolTip from '../ToolTip/ToolTip';
import toast from 'react-hot-toast'
import { showSnackBarMessage } from '../../features/showSnackBarMessage/showSnackBarMessage'



const LogBookButton = () => {

    const { setIsErrorsLogListOpened } = useContext(GlobalContext)
    const { toasts } = useContext(GlobalContext)
    const [blockSnackBarMessage, setBlockSnackBarMessage] = useState(false);

    const checkSnackBarListBeforeOpen = () => {
        // console.log(toasts)
        if (toasts[0]) {
            toasts.forEach(t => {
                if (t.snackBarType === 'b') setBlockSnackBarMessage(t.snackBarMessage)
                toast.dismiss(t.id)
            })
        }
        // console.log(blockSnackBarMessageList)
        setIsErrorsLogListOpened(true)
    }

    const checkSnackBarListBeforeClose = () => {
        // console.log(blockSnackBarMessage)
        if (blockSnackBarMessage || localStorage.getItem('blockDevice')) {
            showSnackBarMessage({ type: 'b', message: blockSnackBarMessage || localStorage.getItem('blockDevice') })
        }
        setIsErrorsLogListOpened(false)
    }

    return ( 
        <>
            <button 
                className='log_book-button cont before_but-hover'
                onClick={() => checkSnackBarListBeforeOpen()}
                type='button'
                tabIndex={-1}
            >
                <BiError className='fa-icon' />            
                <ToolTip text={'Открыть панель ошибок'} />
            </button>
            <LogBook closeErrorsLogList={checkSnackBarListBeforeClose}/>
        </>
     )
}
 
export default LogBookButton