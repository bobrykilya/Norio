import JumpingList from '../JumpingList/JumpingList'
import TableCollapsibleRow from '../Tables/TableCollapsibleRow/TableCollapsibleRow'



const LogBook = ({ closeErrorsLogList, isErrorsLogListOpened }) => {

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