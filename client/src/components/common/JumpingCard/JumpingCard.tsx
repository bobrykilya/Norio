import React, { useEffect, useState } from 'react'
import { useModalState } from "../../../stores/Global-store"
import useCloseOnEsc, { IUseCloseOnEsc } from "../../../hooks/useCloseOnEsc"



export type JumpingCardOptions = 'top' | 'left' | 'right'

type JumpingCardProps = {
    children: any;
    closeHooksParams: IUseCloseOnEsc;
    className?: string;
    position?: JumpingCardOptions;
    other_children?: any;
    isPrerender?: boolean;
}
const JumpingCard = ({ children, className, position, other_children, isPrerender, closeHooksParams }: JumpingCardProps) => {

    const setBlurModalState = useModalState(s => s.setBlurModalState)
    const isCardOpened = closeHooksParams.conditionsList[0]
    const [isJumpingCardOpened, setIsJumpingCardOpened] = useState(isCardOpened)
    const modalState = useModalState(s => s.modalState)


    const handleCloseJumpingCard = () => {
        setIsJumpingCardOpened(false)
        setTimeout(closeHooksParams.callback, 300)
    }

    const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
        if ([...closeHooksParams.conditionsList, !modalState].includes(false)) {
            return
        }

        const target = e.target as Element

        if (target?.className.includes('jumping_card_cover-cont')) {
            handleCloseJumpingCard()
        }
    }

    useCloseOnEsc({
        conditionsList: [...closeHooksParams.conditionsList, !modalState],
        callback: handleCloseJumpingCard
    })


    //* For forms Esc blur while JumpingCard is opened
    useEffect(() => {
        if (isCardOpened) {
            setBlurModalState(true)
            setIsJumpingCardOpened(true)
        } else {
            setBlurModalState(false)
        }
    }, [isCardOpened])


    return ( 
        <div 
            className={`${className || ''} jumping_card_cover-cont cont cover ${isJumpingCardOpened ? 'opened' : ''} ${position || ''}`}
            onClick={handleClickOutside}
        >
            <div
                className={'jumping_card-cont cont'}
            >
                {
                    isPrerender ?
                    children :
                    isCardOpened && children
                }
            </div>
            {
                isPrerender ?
                other_children :
                isCardOpened && other_children
            }
        </div>
     )
}

export default JumpingCard