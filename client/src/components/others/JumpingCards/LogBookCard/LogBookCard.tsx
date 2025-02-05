import React, { useEffect } from 'react'
import JumpingCard from '../../../common/JumpingCard/JumpingCard'
import { showSnack } from "../../../../features/showSnackMessage/showSnackMessage"
import { useBlockErrorState } from "../../../../stores/Device-store"
import toast, { useToasterStore } from 'react-hot-toast'
import { useLogBookCardState } from "../../../../stores/Utils-store"



type LogBookCardProps = {

}
const LogBookCard = ({ }: LogBookCardProps) => {

    const { logBookCardState, setLogBookCardState } = useLogBookCardState()
    const blockErrorState = useBlockErrorState(s => s.blockErrorState)
    const { toasts } = useToasterStore()

    const closeLogCard = () => {
        // console.log(blockErrorMessage)
        if (blockErrorState) {
            showSnack({ type: 'b', message: blockErrorState })
        }
        setLogBookCardState(false)
    }
    const openLogCard = () => {
        // console.log(toasts)
        if (toasts[0]) {
            toasts.forEach(t => {
                toast.dismiss(t.id)
            })
        }
    }
    useEffect(() => {
        if(logBookCardState) {
            openLogCard()
        }
    }, [logBookCardState])

    const data = {}
    const columns = {}

    return (
        <JumpingCard
            className={'log_book_card-cover'}
            closeHooksParams={{
                conditionsList: [logBookCardState],
                callback: closeLogCard
            }}
        >
            {/* <TableCollapsibleRow data={data} columns={columns} /> */}
            <div></div>
        </JumpingCard>
    )
}
 
export default LogBookCard