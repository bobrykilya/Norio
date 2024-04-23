import { useContext } from 'react'
import { GlobalContext } from '../../context/Global-context'
import JumpingList from '../JumpingList/JumpingList'



const ErrorsLogList = () => {
    const { isErrorsLogListOpened, setIsErrorsLogListOpened } = useContext(GlobalContext)
    // console.log(isErrorsLogListOpened)

    const closeErrorsLogList = () => {
        setIsErrorsLogListOpened(false)
    }


    return (
        <div className='errors_log_list-cont'>
            <JumpingList isListOpened={isErrorsLogListOpened} closeList={closeErrorsLogList} >
                <section className='errors_log_filters-cont cont'>

                </section>
                <section className='errors_log_table-cont cont'>
                    
                </section>
            </JumpingList>
        </div>
    )
}
 
export default ErrorsLogList