import { useRef, useState, useEffect, useLayoutEffect } from 'react'
import { FaKey } from "react-icons/fa"
import { FaLock, FaUnlock } from "react-icons/fa6"



const PasswordInput = () => {
    
    const [password, setPassword] = useState('')
    const [isLockVisible, setIsLockVisible] = useState(false)
    const [isLockOpened, setIsLockOpened] = useState(false)
    
    const inputRef = useRef(null)

    // onCheckInput = (e) => {
    //     if (e.value && e.value.length > 3) return true
    // }

    const handleChangePassword = (e) => {
        e.target.value ? setIsLockVisible(true) : 
            setIsLockVisible(false) & setIsLockOpened(false)
        setPassword(e.target.value)
    }

    const handleSwitchLockPosition = (e) => {
        setIsLockOpened((prev) => !prev)
        inputRef.current.focus()

        //* Moving cursor to the input end
        const length = inputRef.current.value.length
        setTimeout(() => {
            inputRef.current.setSelectionRange(length, length)
        }, 1)
    }

    return (
        <div className='password_input-cont input-cont cont'>
            <input
                name='password'
                className='passw_input'
                type={isLockOpened ? 'text' : 'password'}
                maxLength={13}
                placeholder='Пароль'
                value={password}
                autoComplete='current-password'
                onChange={handleChangePassword}
                // onFocus={handleInputFocus}
                ref={inputRef}
            />
            <FaKey className='input-icon'/>
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