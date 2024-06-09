import { useContext } from 'react'
import { GlobalContext } from '../../context/Global-context'
import JumpingList from '../JumpingList/JumpingList'
import TableCollapsibleRow from '../Tables/TableCollapsibleRow/TableCollapsibleRow'



const LogBook = ({ closeErrorsLogList }) => {
    const { isErrorsLogListOpened, setIsErrorsLogListOpened } = useContext(GlobalContext)
    // console.log(isErrorsLogListOpened)

    const data = {}
    const columns = {}

    return (
        <div className='log_book-cont'>
            <JumpingList isListOpened={isErrorsLogListOpened} closeList={closeErrorsLogList} >
                <TableCollapsibleRow data={data} columns={columns} />
            </JumpingList>
        </div>
    )
}
 
export default LogBook