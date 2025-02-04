import React, { MutableRefObject, useRef, useState } from 'react'
import InputCleaner from '../Inputs/InputCleaner/InputCleaner'
import InputError from '../Inputs/InputError/InputError'
// import { PiUserThin } from "react-icons/pi"
import { PiUser } from "react-icons/pi"
import AvatarList from './AvatarList'
import { IDataListElement } from '../../../assets/AuthPage/AuthPage-data'
import { IReactHookForm } from "../../../types/Auth-types"
import { useAvatarListState } from "../../../stores/Settings-store"
import ToolTip from "../../others/ToolTip/ToolTip"



type AvatarButtonProps = IReactHookForm & {
    LIST: IDataListElement[];
    avatar: string | null;
    setAvatar: (avatar: string) => void;
    disabled: boolean;
    isAvatarButTabDisabled: boolean;
}
const AvatarButton = ({ LIST, avatar, setAvatar, error, setError, disabled=false,  isAvatarButTabDisabled=false }: AvatarButtonProps) => {
    
    const { avatarListState, setAvatarListState } = useAvatarListState()
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
        setAvatarListState(true)
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
        setAvatarListState(false)
        clearTimeout(setTimeoutRef.current)
        setIsArrowButsActive(false)
        avatarButtonRef.current.focus()
    }

    return (
        <div className='avatar-cont cont'>
            {!disabled &&
                <AvatarList
                    LIST={LIST}
                    avatar={avatar}
                    isAvatarListOpened={avatarListState}
                    closeAvatarList={closeAvatarList}
                    handleClickElem={handleClickElem}
                    isArrowButsActive={isArrowButsActive}
                    disabled={disabled}
                    createPathToAvatars={createPathToAvatars}
                />
            }
            <button
                className={`avatar-but ${error?.message ? 'error' : ''}`}
                type='button'
                tabIndex={isAvatarButTabDisabled ? -1 : 0}
                onClick={handleClickAvatarButton}
                ref={avatarButtonRef}
            >
                <div
                    className={`no_avatar-cont cont ${isNoAvatarOpened ? 'opened' : ''}`}
                >
                    <PiUser className='fa-icon' />
                </div>
                {
                    avatar &&
                    <img
                        src={createPathToAvatars(avatar)}
                        alt='Avatar error 2'
                    />
                }
                <ToolTip text='Выбрать аватар пользователя' />
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