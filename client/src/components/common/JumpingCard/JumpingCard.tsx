import React, { useEffect, useState } from 'react'
import { useModalState } from "../../../stores/Global-store"
import useCloseOnEsc, { IUseCloseOnEsc } from "../../../hooks/useCloseOnEsc"
import CoverAppTitle from "../CoverAppTitle/CoverAppTitle"



export type JumpingCardOptions = 'top' | 'left' | 'right'

type JumpingCardProps = {
    children: any;
    closeHooksParams: IUseCloseOnEsc;
    className?: string;
    position?: JumpingCardOptions;
    other_children?: any;
    isPrerender?: boolean;
    forceCloseJumpingCard?: boolean;
}
const JumpingCard = ({ children, className, position, other_children, isPrerender, closeHooksParams, forceCloseJumpingCard }: JumpingCardProps) => {

    const [setBlurModalState, dropDownState, snackBarState] = useModalState(s => [s.setBlurModalState, s.dropDownState, s.snackBarState])
    const isCardOpened = closeHooksParams.conditionsList[0]
    const [isJumpingCardOpened, setIsJumpingCardOpened] = useState(isCardOpened)


    const handleCloseJumpingCard = () => {
        setIsJumpingCardOpened(false)
        setTimeout(closeHooksParams.callback, 300)
    }

    const handleClickOutside = () => {
        if ([...closeHooksParams.conditionsList, !dropDownState].includes(false)) {
            return
        }

        handleCloseJumpingCard()
    }

    useCloseOnEsc({
        conditionsList: [...closeHooksParams.conditionsList, !dropDownState, !snackBarState],
        callback: handleCloseJumpingCard
    })


    //* BlurModalState - For forms Esc blur while JumpingCard is opened
    useEffect(() => {
        if (isCardOpened) {
            setBlurModalState(true)
            setIsJumpingCardOpened(true)
        } else {
            setBlurModalState(false)
            setIsJumpingCardOpened(false)
        }
    }, [isCardOpened])

    //* Handling for force closing without prerender
    useEffect(() => {
        if (forceCloseJumpingCard) {
            handleCloseJumpingCard()
        }
    }, [forceCloseJumpingCard])


    return ( 
        <div 
            className={`${className || ''} jumping_card_cover-cont cover cont ${isJumpingCardOpened ? 'opened' : ''} ${position || ''}`}
        >
            <div
                className={'jumping_card-cont cont'}
            >
                {
                    isPrerender ?
                    children :
                    isCardOpened && children
                }
                {
                    isPrerender ?
                    other_children :
                    isCardOpened && other_children
                }
            </div>
            <div
                className={'jumping_card-cover'}
                onClick={handleClickOutside}
            >
                <CoverAppTitle dim={true} />
            </div>
        </div>
     )
}

export default JumpingCard