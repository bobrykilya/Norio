import { useState } from 'react'
import Avatar from '../../../../assets/avatars/Белка.jpg'
import InputsCleaner from './../InputsCleaner/InputsCleaner'
import InputsError from './../InputsError/InputsError'


const AvatarInput = ({ error=null }) => {

    const [avatar, setAvatar] = useState('')
    const [isCleanerOpened, setIsCleanerOpened] = useState(true)
    const [isErrorOn, setIsErrorOn] = useState(true)

    const clearInput = () => {
        setIsCleanerOpened(false)
    }

    return (
        <div className='avatar-cont'>
            <button
                className='avatar-but'
                title='Выбрать аватар пользователя'
            >
                <img src={Avatar} alt="" />
            </button>
            <InputsError error={error} />
            <InputsCleaner opened={isCleanerOpened} onClick={clearInput} />
            <div
                className='avatar_list-cont cont'
            >
                <ul
                    className='avatar-list cont'
                >
                </ul>
            </div>
        </div>
     )
}
 
export default AvatarInput