import { useState } from 'react'
import InputsCleaner from './../InputsCleaner/InputsCleaner'
import InputsError from './../InputsError/InputsError'
import { PiUserThin } from "react-icons/pi"



const AvatarInput = ({ LIST, avatar, setAvatar, error, setError, disabled=false }) => {

    const [isNoAvatarOpened, setIsNoAvatarOpened] = useState(true)
    const [isCleanerOpened, setIsCleanerOpened] = useState(false)
    const [isAvatarListOpened, setIsAvatarListOpened] = useState(false)

    const createPathToAvatars = (name) => {
        return `../../../../../public/avatars/${name}.jpg`
    }

    const handleClickAvatarInput = () => {
        if (error) setError(null)
        setIsAvatarListOpened(true)
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
        setIsAvatarListOpened(false)
        if (isNoAvatarOpened) {
            setTimeout(() => {setIsNoAvatarOpened(false)}, 100)
        }
    }

    const handleClickOutside = (e) => {
        // console.log(e.target.className)
        if (e.target.className.includes('avatar_list_cover-cont')) setIsAvatarListOpened(false)
    }

    return (
        <div className='avatar-cont cont'>
            <button
                className='avatar-but'
                type='button'
                title='Выбрать аватар пользователя'
                tabIndex={10}
                onClick={handleClickAvatarInput}
            >
                <div className={`no_avatar-cont cont ${isNoAvatarOpened ? 'opened' : ''}`}>
                    <PiUserThin className='fa-icon' />
                </div>
                {avatar ? <img src={createPathToAvatars(avatar)} alt="" /> : null}
            </button>
            <InputsError error={error} />
            <InputsCleaner opened={isCleanerOpened} onClick={handleClickCleaner} />
            <div 
                className={`avatar_list_cover-cont cont ${isAvatarListOpened ? 'opened' : ''}`}
                onClick={handleClickOutside}
            >
                <div className='avatar_list-cont cont'>
                    <ul className='avatar-list cont'>
                        {
                            !LIST[0] ?
                                <span className='error-message cont'>Иконки закончились ( <br/>Обратитесь к разработчику</span> :
                                LIST.map((el) => {
                                    const key_but = `${el.id}-but`
                                    return <li key={el.id} className='cont'>
                                                <button 
                                                    id={key_but} 
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
            </div>
        </div>
     )
}
 
export default AvatarInput