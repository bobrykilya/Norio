import React, { useEffect } from 'react'
import { useAnyCoverModalState } from "../../../stores/Global-store"
import useCloseOnEsc from "../../../hooks/useCloseOnEsc"



type JumpingListProps = {
    children: React.ReactElement;
    isListOpened: boolean;
    closeList: () => void;
    other_children?: React.ReactElement;
}
const JumpingList = ({ children, isListOpened, closeList, other_children }: JumpingListProps) => {

    const setIsAnyJumpingListOpened = useAnyCoverModalState(s => s.setIsAnyJumpingListOpened)

    const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.target as Element

        if (target?.className.includes('jumping_list_cover-cont')) {
            closeList()
        }
    }

    useCloseOnEsc({
        conditionsList: [isListOpened],
        callback: closeList
    })

    //* For forms Esc blur while JumpingList is opened
    useEffect(() => {
        if (isListOpened) {
            setIsAnyJumpingListOpened(true)
        } else {
            setIsAnyJumpingListOpened(false)
        }
    }, [isListOpened])


    return ( 
        <div 
            className={`jumping_list_cover-cont cont cover ${isListOpened ? 'opened' : ''}`}
            onClick={handleClickOutside}
        >
            <div className='jumping_list-cont cont'>
                {children}
            </div>
            {other_children}
        </div>
     )
}

export default JumpingList