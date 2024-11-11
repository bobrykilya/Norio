import React from 'react'
import JumpingList from '../../common/JumpingList/JumpingList'



type LogBookListProps = {
    closeLogList: () => void;
    isLogListOpened: boolean;
}
const LogBookList = ({ closeLogList, isLogListOpened }: LogBookListProps) => {

    const data = {}
    const columns = {}

    return (
        <div className='log_book_list-cont'>
            <JumpingList isListOpened={isLogListOpened} closeList={closeLogList} >
                {/* <TableCollapsibleRow data={data} columns={columns} /> */}
                <div></div>
            </JumpingList>
        </div>
    )
}
 
export default LogBookList