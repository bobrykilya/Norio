import { useRef, useState } from 'react'
import { FaKey } from "react-icons/fa"
import { FaLock, FaUnlock } from "react-icons/fa6"
import InputsError from '../InputsError/InputsError'



const PasswordInput = ({ name, register, error, isLockVisible, setIsLockVisible }) => {
    
    // console.log(error)
    const [isLockOpened, setIsLockOpened] = useState(false)

    
    
    const inputRef = useRef(null)
    
    const handleChangePassword = (e) => {
        e.target.value ? setIsLockVisible(true) : 
            setIsLockVisible(false) & setIsLockOpened(false)
    }

    const handleSwitchLockPosition = (e) => {
        setIsLockOpened((prev) => !prev)
        inputRef.current.focus()

        //* Moving cursor to the input's end
        const length = inputRef.current.value.length
        setTimeout(() => {
            inputRef.current.setSelectionRange(length, length)
        }, 1)
    }

    const { ref, ... rest_register } = register(name, {
            required: 'Пароль обязателен к заполнению',
            minLength: {
            value: 5,
            message: 'Длина пароля должна быть больше 4 знаков'
            }
        })

    return (
        <div className='password_input-cont input-cont cont'>
            <input
                {... rest_register}
                ref={(e) => {
                    ref(e)
                    inputRef.current = e
                }}
                className='passw_input'
                type={isLockOpened ? 'text' : 'password'}
                maxLength={13}
                placeholder='Пароль'
                autoComplete='current-password'
                onChange={handleChangePassword}
                // ref={inputRef}
            />
            <FaKey className='input-icon'/>
            <InputsError error={error}/>
            <button 
                className={`lock-but ${isLockVisible ? 'active' : ''}`}
                type='button'
                tabIndex={-1} 
                onClick={(handleSwitchLockPosition)}
            >
                {isLockOpened ? <FaUnlock className='fa-icon'/> : 
                <FaLock className='fa-icon'/>}
            </button>
        </div>
    )
}

export default PasswordInput