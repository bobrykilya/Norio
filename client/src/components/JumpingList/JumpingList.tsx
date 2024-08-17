import React from 'react'
import { useEffect } from 'react'



type JumpingListProps = {
    children: React.ReactElement;
    isListOpened: boolean;
    closeList: () => void;
    other_children?: React.ReactElement;
}
const JumpingList = ({ children, isListOpened, closeList, other_children }: JumpingListProps) => {

    const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.target as Element

        try {
            if (target?.className.includes('jumping_list_cover-cont')) {
                closeList()
            }
        }catch {

        }
    }
    
    useEffect(() => {
        const handleEscapePress = (e: globalThis.KeyboardEvent) => {
            if (!isListOpened) return
            if (e.key === 'Escape') {
                closeList()
            }
        }
        window.addEventListener('keydown', handleEscapePress)
        return () => {
            window.removeEventListener('keydown', handleEscapePress)
        }
    })

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