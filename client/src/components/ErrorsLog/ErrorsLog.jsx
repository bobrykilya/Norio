import { useContext } from 'react'
import { GlobalContext } from '../../context/Global-context'
import { BiError } from "react-icons/bi"
import ErrorsLogList from './ErrorsLogList';
import ToolTip from '../ToolTip/ToolTip';



const ErrorsLog = () => {

    const { setIsErrorsLogListOpened } = useContext(GlobalContext)

    return ( 
        <>
            <button 
                className='errors_log-button cont before_but-hover'
                onClick={() => setIsErrorsLogListOpened(true)}
                type='button'
                tabIndex={-1}
            >
                <BiError className='fa-icon' />            
                <ToolTip text={'Открыть панель ошибок'} />
            </button>
            <ErrorsLogList />
        </>
     )
}
 
export default ErrorsLog