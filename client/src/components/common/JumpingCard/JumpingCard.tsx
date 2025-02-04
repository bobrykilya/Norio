import React, { useEffect } from 'react'
import { useModalState } from "../../../stores/Global-store"
import useCloseOnEsc from "../../../hooks/useCloseOnEsc"



export type JumpingCardOptions = 'top' | 'left' | 'right'

type JumpingCardProps = {
    children: React.ReactElement;
    isCardOpened: boolean;
    closeCard: () => void;
    className?: string;
    position?: JumpingCardOptions;
    other_children?: React.ReactElement;
}
const JumpingCard = ({ children, isCardOpened, closeCard, className, position, other_children }: JumpingCardProps) => {

    const setBlurModalState = useModalState(s => s.setBlurModalState)

    const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
        const target = e.target as Element

        if (target?.className.includes('jumping_card_cover-cont')) {
            closeCard()
        }
    }

    useCloseOnEsc({
        conditionsList: [isCardOpened],
        callback: closeCard
    })


    //* For forms Esc blur while JumpingCard is opened
    useEffect(() => {
        if (isCardOpened) {
            setBlurModalState(true)
        } else {
            setBlurModalState(false)
        }
    }, [isCardOpened])


    return ( 
        <div 
            className={`${className || ''} jumping_card_cover-cont cont cover ${isCardOpened ? 'opened' : ''} ${position || ''}`}
            onClick={handleClickOutside}
        >
            <div
                className={'jumping_card-cont cont'}
            >
                {children}
            </div>
            {other_children}
        </div>
     )
}

export default JumpingCard