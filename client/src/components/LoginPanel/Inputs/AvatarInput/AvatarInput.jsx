import { useState } from 'react'
import Avatar from '../../../../assets/avatars/Белка.jpg'
import InputsCleaner from './../InputsCleaner/InputsCleaner'
import InputsError from './../InputsError/InputsError'
import { useClickOutside } from "../../../../Hooks/useClickOutside"


const AvatarInput = ({ error=null }) => {

    const [avatar, setAvatar] = useState('')
    const [isCleanerOpened, setIsCleanerOpened] = useState(false)
    const [isAvatarListOpened, setIsAvatarListOpened] = useState(false)

    
    const handleClickAvatarInput = () => {
        setIsAvatarListOpened(true)
    }

    const handleClickCleaner = () => {
        setIsCleanerOpened(false)
    }

    const handleClickOutside = (e) => {
        // console.log(e.target.className)
        e.target.className.includes('avatar_list_cover-cont') ? setIsAvatarListOpened(false) : null
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
                <img src={Avatar} alt="" />
            </button>
            <InputsError error={error} />
            <InputsCleaner opened={isCleanerOpened} onClick={handleClickCleaner} />
            <div 
                className={`avatar_list_cover-cont cont ${isAvatarListOpened ? 'opened' : ''}`}
                onClick={handleClickOutside}
            >
                <div
                    className='avatar_list-cont cont'
                >
                    <ul
                        className='avatar-list cont'
                    >
                    </ul>
                </div>
            </div>
        </div>
     )
}
 
export default AvatarInput