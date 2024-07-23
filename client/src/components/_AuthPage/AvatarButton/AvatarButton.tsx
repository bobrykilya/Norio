import React, { useState, useRef, MutableRefObject } from 'react'
import InputsCleaner from '../Inputs/InputsCleaner/InputsCleaner'
import InputsError from '../Inputs/InputsError/InputsError'
import { PiUserThin } from "react-icons/pi"
// import { IoArrowDownCircle, IoArrowUpCircle } from "react-icons/io5"
// import { LuArrowUpToLine, LuArrowDownToLine } from "react-icons/lu"
import ToolTip from '../../ToolTip/ToolTip'
import AvatarList from './AvatarList'
import { IDataListElement } from '../../../assets/AuthPage/AuthPage-data'



interface AvatarButtonProps {
    LIST: IDataListElement[];
    avatar: string | null;
    setAvatar: React.Dispatch<React.SetStateAction<string>>;
    error: { message: string };
    setError: React.Dispatch<React.SetStateAction<{ message: string } | null>>;
    disabled: boolean;
    isFormBlur: boolean;
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

    const handleClickElem = (e) => {
        // console.log(e.target.id.split('-')[0])
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
            <InputsError error={error} onClick={handleClickAvatarButton} />
            <InputsCleaner opened={isCleanerOpened} onClick={handleClickCleaner} />
        </div>
     )
}
 
export default AvatarButton