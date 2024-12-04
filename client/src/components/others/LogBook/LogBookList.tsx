import React from 'react'
import JumpingList from '../../common/JumpingList/JumpingList'
import { useLogBookListState } from "../../../stores/Global-store"
import { showSnack } from "../../../features/showSnackMessage/showSnackMessage"
import { useBlockError } from "../../../stores/Device-store"



type LogBookListProps = {

}
const LogBookList = ({ }: LogBookListProps) => {

    const { isLogBookListOpened, setIsLogBookListOpened } = useLogBookListState()
    const blockErrorMessage = useBlockError(s => s.blockErrorMessage)

    const closeLogList = () => {
        // console.log(blockErrorMessage)
        if (blockErrorMessage) {
            showSnack({ type: 'b', message: blockErrorMessage })
        }
        setIsLogBookListOpened(false)
    }

    const data = {}
    const columns = {}

    return (
        <div className='log_book_list-cont'>
            <JumpingList isListOpened={isLogBookListOpened} closeList={closeLogList} >
                {/* <TableCollapsibleRow data={data} columns={columns} /> */}
                <div></div>
            </JumpingList>
        </div>
    )
}
 
export default LogBookList