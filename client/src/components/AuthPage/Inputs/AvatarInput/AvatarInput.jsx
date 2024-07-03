import { useState, useRef, useEffect } from 'react'
import InputsCleaner from './../InputsCleaner/InputsCleaner'
import InputsError from './../InputsError/InputsError'
import { PiUserThin } from "react-icons/pi"
// import { IoArrowDownCircle, IoArrowUpCircle } from "react-icons/io5"
// import { LuArrowUpToLine, LuArrowDownToLine } from "react-icons/lu"
import ToolTip from '../../../ToolTip/ToolTip'
import AvatarInputList from './AvatarInputList'



const AvatarInput = ({ LIST, avatar, setAvatar, error, setError, disabled=false, isFormBlur=false }) => {

    const [isNoAvatarOpened, setIsNoAvatarOpened] = useState(true)
    const [isCleanerOpened, setIsCleanerOpened] = useState(false)
    const [isAvatarListOpened, setIsAvatarListOpened] = useState(false)
    const [isArrowButsActive, setIsArrowButsActive] = useState(false)
    const listRef = useRef(null)
    const refSetTimeout = useRef(null)

    const createPathToAvatars = (name) => {
        return `/avatars/${name}.jpg`
    }

    const handleClickAvatarInput = () => {
        if (error) setError(null)
        setIsAvatarListOpened(true)
        refSetTimeout.current = setTimeout(() => {setIsArrowButsActive(true)}, 1100)
    }

    const handleClickCleaner = () => {
        setIsNoAvatarOpened(true)
        setTimeout(() => {setAvatar(false)}, 300)
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
        // listRef.current.scrollTo({ top: 0})
    }

    return (
        <div className='avatar-cont cont'>
            <button
                className={`avatar-but ${error?.message ? 'error' : ''}`}
                type='button'
                onClick={handleClickAvatarInput}
            >
                <div className={`no_avatar-cont cont ${isNoAvatarOpened ? 'opened' : ''}`}>
                    <PiUserThin className='fa-icon' />
                </div>
                {avatar && <img src={createPathToAvatars(avatar)} alt='Avatar error 2' />}
                <ToolTip text='Выбрать аватар пользователя' />
            </button>
            <InputsError error={error} onClick={handleClickAvatarInput} />
            <InputsCleaner opened={isCleanerOpened} onClick={handleClickCleaner} />
            {!isFormBlur && 
                <AvatarInputList LIST={LIST} avatar={avatar} isAvatarListOpened={isAvatarListOpened} closeAvatarList={closeAvatarList} handleClickElem={handleClickElem} listRef={listRef} isArrowButsActive={isArrowButsActive} disabled={disabled} />
            }
        </div>
     )
}
 
export default AvatarInput