import React, { MutableRefObject, useRef, useState } from 'react'
import InputCleaner from '../Inputs/InputCleaner/InputCleaner'
import InputError from '../Inputs/InputError/InputError'
import { PiUserThin } from "react-icons/pi"
import ToolTip from '../../ToolTip/ToolTip'
import AvatarList from './AvatarList'
import { IDataListElement } from '../../../assets/AuthPage/AuthPage-data'
import { IReactHookForm } from "../../../types/Auth-types"



export type IHandleClickButtonWithId = React.MouseEvent<HTMLButtonElement, MouseEvent> & {
target: {
        id: string;
    }
}
type AvatarButtonProps = IReactHookForm & {
    LIST: IDataListElement[];
    avatar: string | null;
    setAvatar: (avatar: string) => void;
    disabled?: boolean;
    isFormBlur?: boolean;
}
const AvatarButton = ({ LIST, avatar, setAvatar, error, setError, disabled=false, isFormBlur=false }: AvatarButtonProps) => {

    const [isNoAvatarOpened, setIsNoAvatarOpened] = useState(true)
    const [isCleanerOpened, setIsCleanerOpened] = useState(false)
    const [isAvatarListOpened, setIsAvatarListOpened] = useState(false)
    const [isArrowButsActive, setIsArrowButsActive] = useState(false)
    const refSetTimeout = useRef<ReturnType<typeof setTimeout>>(null) as MutableRefObject<ReturnType<typeof setTimeout>>

    const createPathToAvatars = (name: string) => {
        return `/avatars/${name}.jpg`
    }

    const handleClickAvatarButton = () => {
        if (error) setError(null)
        setIsAvatarListOpened(true)
        refSetTimeout.current = setTimeout(() => {setIsArrowButsActive(true)}, 1100)
    }

    const handleClickCleaner = () => {
        setIsNoAvatarOpened(true)
        setTimeout(() => {setAvatar('')}, 300)
        setIsCleanerOpened(false)
        if (error) setError(null)
    }

    const handleClickElem = (e: IHandleClickButtonWithId) => {
        // console.log(e.target.id)
        setAvatar(e.target.id.split('-')[0])
        setIsCleanerOpened(true)
        closeAvatarList()
        if (isNoAvatarOpened) {
            setTimeout(() => {setIsNoAvatarOpened(false)}, 100)
        }
    }

    const closeAvatarList = () => {
        setIsAvatarListOpened(false)
        clearTimeout(refSetTimeout.current)
        setIsArrowButsActive(false)
    }

    return (
        <div className='avatar-cont cont'>
            {!isFormBlur && 
                <AvatarList LIST={LIST} avatar={avatar} isAvatarListOpened={isAvatarListOpened} closeAvatarList={closeAvatarList} handleClickElem={handleClickElem} isArrowButsActive={isArrowButsActive} disabled={disabled} createPathToAvatars={createPathToAvatars} />
            }
            <button
                className={`avatar-but ${error?.message ? 'error' : ''}`}
                type='button'
                onClick={handleClickAvatarButton}
            >
                <div className={`no_avatar-cont cont ${isNoAvatarOpened ? 'opened' : ''}`}>
                    <PiUserThin className='fa-icon' />
                </div>
                {avatar && <img src={createPathToAvatars(avatar)} alt='Avatar error 2' />}
                <ToolTip text='Выбрать аватар пользователя' />
            </button>
            <InputError error={error} onClick={handleClickAvatarButton} />
            <InputCleaner opened={isCleanerOpened} onClick={handleClickCleaner} />
        </div>
     )
}
 
export default AvatarButton