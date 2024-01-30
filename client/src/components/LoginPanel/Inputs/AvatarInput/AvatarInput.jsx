import { useState } from 'react'
// import Avatar_list from '../../../assets/avatars/Белый медведь малыш.jpg'
import InputsCleaner from './../InputsCleaner/InputsCleaner'
import InputsError from './../InputsError/InputsError'


const AvatarInput = ({ error=null }) => {

    const [avatar, setAvatar] = useState('')
    const [isCleanerOpened, setIsCleanerOpened] = useState(false)
    const [isErrorOn, setIsErrorOn] = useState(true)

    const clearInput = () => {
        setIsCleanerOpened(false)
    }

    return (
        <div className='avatar-cont cont'>
            <button
                className='avatar-but cont'
                title='Выбрать аватар пользователя'
            >
                <img src='../../../assets/avatars/Белый медведь малыш.jpg' alt="" />
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