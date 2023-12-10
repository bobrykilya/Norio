import { useState } from 'react'
import './PasswordInput.sass'


const PasswordInput = (props) => {

    const lock_but_el = document.querySelector(props.form + ' .lock-but')
    const input_el = document.querySelector(props.form + ' .passw_input')

    const [password, setPassword] = useState('')
    const [lockIcon, setlockIcon] = useState('fa-lock')

    const handleChangePassword = (e) => {
        // props.onChange(password)
        handleShowLock(e)
    }

    const handleShowLock = (e) => {
        e.target.value ? lock_but_el.classList.add('active') : lock_but_el.classList.remove('active')
        // console.log(lock_but_el)
        setPassword(e.target.value)
    }

    const handleSwitchLockIcon = (e) => {
        const NextlockPosition = (lockIcon === 'fa-lock') ? ['text', 'fa-unlock'] : ['password', 'fa-lock']

        e.target.querySelector('i').className = `fa-solid ${NextlockPosition[1]}`
        input_el.type = NextlockPosition[0]
        setlockIcon(NextlockPosition[1])
        input_el.focus()
    }

    return (
        <div id='password_input-cont' className='input-cont cont'>
            <input
                className='passw_input'
                type="password"
                maxLength={15}
                placeholder='Пароль'
                value={password}
                onChange={handleChangePassword}
            />
            <i className="info-icon fa-solid fa-key"></i>
            <button 
                className='lock-but' 
                type='button'
                tabIndex='-1' 
                onClick={handleSwitchLockIcon}
            >
                <i id='lock-icon' className="fa-solid fa-lock"></i>
            </button>
        </div>
    )
}

export default PasswordInput