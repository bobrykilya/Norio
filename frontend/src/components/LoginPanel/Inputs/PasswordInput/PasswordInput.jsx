import { useState } from 'react'



const PasswordInput = (props) => {

    const lock_but_el = document.querySelector(props.form + ' .lock-but')
    const input_el = document.querySelector(props.form + ' .passw_input')

    const [password, setPassword] = useState('')
    const [lockIcon, setLockIcon] = useState('fa-lock')

    // props.onCheckInput = (e) => {
    //     if (e.value && e.value.length > 3) return true
    // }

    const handleChangePassword = (e) => {
        // props.onChange(password)
        handleShowLockIcon(e)
    }

    const handleShowLockIcon = (e) => {
        e.target.value ? lock_but_el.classList.add('active') : lock_but_el.classList.remove('active')
        // console.log(lock_but_el)
        setPassword(e.target.value)
    }

    const handleSwitchLockIcon = (e) => {
        const NextLockPosition = (lockIcon === 'fa-lock') ? ['text', 'fa-unlock'] : ['password', 'fa-lock']

        e.target.querySelector('i').className = `fa-solid ${NextLockPosition[1]}`
        input_el.type = NextLockPosition[0]
        setLockIcon(NextLockPosition[1])
        input_el.focus()
    }

    return (
        <div className='password_input-cont input-cont cont'>
            <input
                name='password'
                className='passw_input'
                type="password"
                maxLength={13}
                placeholder='Пароль'
                value={password}
                autoComplete='current-password'
                onChange={handleChangePassword}
            />
            <i className="info-icon fa-solid fa-key"></i>
            <button 
                className='lock-but' 
                type='button'
                tabIndex={-1} 
                onClick={handleSwitchLockIcon}
            >
                <i id='lock-icon' className="fa-solid fa-lock"></i>
            </button>
        </div>
    )
}

export default PasswordInput