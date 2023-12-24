import { useRef, useState, useEffect, useLayoutEffect } from 'react'
import { FaKey } from "react-icons/fa"
import { FaLock, FaUnlock } from "react-icons/fa6";



const PasswordInput = (props) => {
    
    const [password, setPassword] = useState('')
    const [isLockVisible, setIsLockVisible] = useState(false)
    const [isLockOpened, setIsLockOpened] = useState(false)
    
    const inputRef = useRef(null);
    const lock_icon = isLockOpened ? <FaUnlock className='fa-icon'/> : <FaLock className='fa-icon'/>

    // props.onCheckInput = (e) => {
    //     if (e.value && e.value.length > 3) return true
    // }

    const handleChangePassword = (e) => {
        e.target.value ? setIsLockVisible(true) : 
            setIsLockVisible(false) & setIsLockOpened(false)
        setPassword(e.target.value)
    }

    const handleSwitchLockPosition = (e) => {
        setIsLockOpened(!isLockOpened)
        inputRef.current.focus()
    }

    //* Moving cursor to the end
    const handleInputFocus = () => {
        const length = inputRef.current.value.length
        inputRef.current.setSelectionRange(length, length)
        // inputRef.current.selectionStart = inputRef.current.value.length;
        // inputRef.current.selectionEnd = inputRef.current.value.length;

        // console.log(inputRef.current.value.length)
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
                ref={inputRef}
                onFocus={handleInputFocus}
            />
            <FaKey className='input-icon'/>
            <button 
                className={`lock-but ${isLockVisible ? 'active' : ''}`}
                type='button'
                tabIndex={-1} 
                onClick={(handleSwitchLockPosition)}
            >
                {lock_icon}
            </button>
        </div>
    )
}

export default PasswordInput