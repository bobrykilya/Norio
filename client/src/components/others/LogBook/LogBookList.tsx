import React, { useEffect } from 'react'
import JumpingList from '../../common/JumpingList/JumpingList'
import { useLogBookListState } from "../../../stores/Global-store"
import { showSnack } from "../../../features/showSnackMessage/showSnackMessage"
import { useBlockErrorState } from "../../../stores/Device-store"
import toast, { useToasterStore } from 'react-hot-toast'



type LogBookListProps = {

}
const LogBookList = ({ }: LogBookListProps) => {

    const { logBookListState, setLogBookListState } = useLogBookListState()
    const blockErrorState = useBlockErrorState(s => s.blockErrorState)
    const { toasts } = useToasterStore()

    const closeLogList = () => {
        // console.log(blockErrorMessage)
        if (blockErrorState) {
            showSnack({ type: 'b', message: blockErrorState })
        }
        setLogBookListState(false)
    }
    const openLogList = () => {
        // console.log(toasts)
        if (toasts[0]) {
            toasts.forEach(t => {
                toast.dismiss(t.id)
            })
        }
    }
    useEffect(() => {
        if(logBookListState) {
            openLogList()
        }
    }, [logBookListState])

    const data = {}
    const columns = {}

    return (
        <div className='log_book_list-cont'>
            <JumpingList isListOpened={logBookListState} closeList={closeLogList} >
                {/* <TableCollapsibleRow data={data} columns={columns} /> */}
                <div></div>
            </JumpingList>
        </div>
    )
}
 
export default LogBookList