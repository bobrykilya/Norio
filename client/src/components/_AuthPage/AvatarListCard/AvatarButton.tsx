import React, { MutableRefObject, useRef, useState } from 'react'
import InputCleaner from '../../common/Inputs/InputFields/InputUtils/InputCleaner/InputCleaner'
import InputError from '../../common/Inputs/InputFields/InputUtils/InputError/InputError'
import { IDataListElement } from '../../../assets/AuthPage/AuthPage-data'
import { IReactHookForm } from "../../../types/Auth-types"
import { useAvatarListCardState } from "../../../stores/Utils-store"
import ToolTip from "../../others/ToolTip/ToolTip"
import { ICONS } from "../../../assets/common/Icons-data"
import AvatarListCard from "./AvatarListCard"



type AvatarButtonProps = Omit<IReactHookForm, 'errors'> & {
    LIST: IDataListElement[];
    currentAvatar: string | null;
    setAvatar: (avatar: string) => void;
    disabled?: boolean;
    isTabDisabled?: boolean;
    error?: {
        message: string
    }
}
const AvatarButton = ({ LIST, currentAvatar, setAvatar, error, setError, disabled=false,  isTabDisabled=false }: AvatarButtonProps) => {
    
    const { avatarListCardState, setAvatarListCardState } = useAvatarListCardState()
    const [isNoAvatarOpened, setIsNoAvatarOpened] = useState(true)
    const [isCleanerOpened, setIsCleanerOpened] = useState(false)
    const [isArrowButsActive, setIsArrowButsActive] = useState(false)
    const setTimeoutRef = useRef<ReturnType<typeof setTimeout>>(null) as MutableRefObject<ReturnType<typeof setTimeout>>
    const avatarButtonRef = useRef<HTMLButtonElement>(null)


    const createPathToAvatars = (name: string) => {
        return `/avatars/${name}.jpg`
    }

    const handleClickAvatarButton = () => {
        if (error) setError(null)
        setAvatarListCardState(true)
        setTimeoutRef.current = setTimeout(() => {
            setIsArrowButsActive(true)
        }, 1100)
    }

    const handleClickCleaner = () => {
        setIsNoAvatarOpened(true)
        setTimeout(() => {setAvatar('')}, 300)
        setIsCleanerOpened(false)
        if (error) setError(null)
    }

    const handleClickElem = (avatar: string) => {
        setAvatar(avatar)
        setIsCleanerOpened(true)
        closeAvatarList()
        if (isNoAvatarOpened) {
            setTimeout(() => {setIsNoAvatarOpened(false)}, 100)
        }
    }

    const closeAvatarList = () => {
        setAvatarListCardState(false)
        clearTimeout(setTimeoutRef.current)
        setIsArrowButsActive(false)
        avatarButtonRef.current.focus()
    }
    

    return (
        <div className='avatar_but-cont cont'>
            {!disabled &&
                <AvatarListCard
                    LIST={LIST}
                    currentAvatar={currentAvatar}
                    isAvatarListCardOpened={avatarListCardState}
                    closeAvatarListCard={closeAvatarList}
                    handleClickElem={handleClickElem}
                    isArrowButsActive={isArrowButsActive}
                    disabled={disabled}
                    createPathToAvatars={createPathToAvatars}
                />
            }
            <button
                className={`avatar-but ${error?.message ? 'error' : ''}`}
                type='button'
                tabIndex={isTabDisabled ? -1 : 0}
                onClick={handleClickAvatarButton}
                ref={avatarButtonRef}
            >
                <div
                    className={`no_avatar-cont cont ${isNoAvatarOpened ? 'opened' : ''}`}
                >
                    {ICONS.emptyAvatar}
                </div>
                {
                    currentAvatar &&
                    <img
                        src={createPathToAvatars(currentAvatar)}
                        alt='Avatar error 2'
                    />
                }
                <ToolTip message='Выбрать аватар пользователя' />
            </button>
            <InputError
                error={error}
                onClick={handleClickAvatarButton}
            />
            <InputCleaner
                opened={isCleanerOpened}
                onClick={handleClickCleaner}
            />
        </div>
     )
}
 
export default AvatarButton