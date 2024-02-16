import { useState, useRef, useEffect } from 'react'
import InputsCleaner from './../InputsCleaner/InputsCleaner'
import InputsError from './../InputsError/InputsError'
import { PiUserThin } from "react-icons/pi"
// import { IoArrowDownCircle, IoArrowUpCircle } from "react-icons/io5"
// import { LuArrowUpToLine, LuArrowDownToLine } from "react-icons/lu"
import { IoMdArrowRoundDown, IoMdArrowRoundUp } from "react-icons/io"
import ToolTip from '../../../ToolTip/ToolTip'



const AvatarInput = ({ LIST, avatar, setAvatar, error, setError, disabled=false }) => {

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

    const handleClickOutside = (e) => {
        // console.log(e.target.className)
        if (e.target.className.includes('avatar_list_cover-cont')) {
            closeAvatarList()
        }
    }

    const closeAvatarList = () => {
        setIsAvatarListOpened(false)
        clearTimeout(refSetTimeout.current)
        setIsArrowButsActive(false)
        listRef.current.scrollTo({ top: 0})
    }

    useEffect(() => {
        const handleEscapePress = (e) => {
            if (!isAvatarListOpened) return
            if (e.key === 'Escape') {
                closeAvatarList()
            }
        }
        window.addEventListener('keydown', handleEscapePress)
        return () => {
            window.removeEventListener('keydown', handleEscapePress)
        }
    })

    return (
        <div className='avatar-cont cont'>
            <button
                className='avatar-but'
                type='button'
                onClick={handleClickAvatarInput}
            >
                <div className={`no_avatar-cont cont ${isNoAvatarOpened ? 'opened' : ''}`}>
                    <PiUserThin className='fa-icon' />
                </div>
                {avatar && <img src={createPathToAvatars(avatar)} alt="" />}
                <ToolTip text='Выбрать аватар пользователя' />
            </button>
            <InputsError error={error} />
            <InputsCleaner opened={isCleanerOpened} onClick={handleClickCleaner} />
            <div 
                className={`avatar_list_cover-cont cont ${isAvatarListOpened ? 'opened' : ''}`}
                onClick={handleClickOutside}
            >
                <div className='avatar_list-cont cont'>
                    <ul className='avatar-list cont' ref={listRef}>
                        {
                            !LIST[0] ?
                                <span className='empty_list-message cont'>Аватары закончились ( <br/>Обратитесь к разработчику</span> :
                                LIST.map((el) => {
                                    const key_but = `${el.id}-but`
                                    return <li key={el.id} className='cont'>
                                                <button 
                                                    id={key_but}
                                                    className={avatar === el.id ? 'active' : ''}
                                                    type='button'
                                                    tabIndex={-1} 
                                                    onClick={handleClickElem}
                                                    disabled={disabled}
                                                >
                                                    <img src={createPathToAvatars(el.id)} alt="Ошибка изображения" />
                                                </button>
                                                <label htmlFor={key_but}>{el.title}</label>
                                           </li>
                                })
                        }
                    </ul>
                </div>
                <div className={`arrow_buts-cont cont ${isAvatarListOpened ? 'opened' : ''}`}>
                    <button
                        className='avatar_list_up-but cont'
                        type='button'
                        tabIndex={-1}
                        onClick={() => listRef.current.scrollTo({ top: 0, behavior: 'smooth'})}
                        disabled={!isArrowButsActive}
                    >
                        <div className='arrow_but-cont cont'>
                            <IoMdArrowRoundUp className='fa-icon' />
                        </div>
                        <ToolTip text='Пролистать список вверх' />
                    </button>
                    <button
                        className='avatar_list_down-but cont opened'
                        type='button'
                        tabIndex={-1}
                        onClick={() => listRef.current.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth'})}
                        disabled={!isArrowButsActive}
                    >
                        <div className='arrow_but-cont cont'>
                            <IoMdArrowRoundDown className='fa-icon' />
                        </div>
                        <ToolTip text='Пролистать список вниз' />
                    </button>
                </div>
            </div>
        </div>
     )
}
 
export default AvatarInput