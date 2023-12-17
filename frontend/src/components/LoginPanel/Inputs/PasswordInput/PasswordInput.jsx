import { useState } from 'react'



const PasswordInput = (props) => {

    //! const input_el = document.querySelector(props.form + ' .passw_input')

    const [password, setPassword] = useState('')
    const [isLockVisible, setIsLockVisible] = useState(false)
    const [isLockOpened, setIsLockOpened] = useState(false)

    // props.onCheckInput = (e) => {
    //     if (e.value && e.value.length > 3) return true
    // }

    const handleChangePassword = (e) => {
        // props.onChange(password)
        handleShowLockIcon(e)
    }

    const handleShowLockIcon = (e) => {
        e.target.value ? setIsLockVisible(true) : setIsLockVisible(false)
        // console.log(lock_but_el)
        setPassword(e.target.value)
    }

    const handleSwitchLockPosition = (e) => {
        // //! input_el.focus()
        setIsLockOpened(!isLockOpened)
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
            />
            <i className="info-icon fa-solid fa-key"></i>
            <button 
                className={`lock-but ${isLockVisible ? 'active' : ''}`}
                type='button'
                tabIndex={-1} 
                onClick={(handleSwitchLockPosition)}
            >
                <i id='lock-icon' className={`fa-solid ${isLockOpened ? 'fa-unlock' : 'fa-lock'}`}></i>
            </button>
        </div>
    )
}

export default PasswordInput