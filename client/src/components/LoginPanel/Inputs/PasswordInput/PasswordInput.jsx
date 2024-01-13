import { useRef, useState } from 'react'
import { FaKey } from "react-icons/fa"
import { FaLock, FaUnlock } from "react-icons/fa6"
import InputsError from '../InputsError/InputsError'
import InputsCleaner from '../../Inputs/InputsCleaner/InputsCleaner'
import { useFocusInput } from "../../../Hooks/useFocusInput"



const PasswordInput = ({ name, register, error, reset }) => {
    
    // console.log(error)
    const [isLockVisible, setIsLockVisible] = useState(false)
    const [isLockOpened, setIsLockOpened] = useState(false)
    const [isCleanerOpened, setIsCleanerOpened] = useState(false)
    const [isErrorHidden, setIsErrorHidden] = useState(false)

    const inputRef = useRef(null)
    
    const handleChangePassword = (e) => {
        // console.log(e.target.value)
        e.target.value ? ChangeInput() : clearInput()
    }


    const ChangeInput = () => {
        setIsErrorHidden(false)
        setIsLockVisible(true)
        setIsCleanerOpened(true)
    }

    const onClickCleaner = () => {
        setIsErrorHidden(true)
        clearInput()
        useFocusInput(inputRef)
    }

    const clearInput = () => {
        reset(name)
        setIsLockVisible(false)
        setIsLockOpened(false)
        setIsCleanerOpened(false)
    }

    const handleSwitchLockPosition = (e) => {
        setIsLockOpened((prev) => !prev)
        useFocusInput(inputRef)
    }

    const { ref, ... rest_register } = register(name, {
            // required: 'Пароль обязателен к заполнению',
            required: true,
            minLength: {
            value: 5,
            message: 'Длина пароля должна быть больше 4 знаков'
            },
            // pattern: {
            //     value: /[a-zA-Zа-яА-Я0-9]/,
            //     message: 'Пароль может состоять лишь из букв и цифр'
            // }
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
                maxLength={14}
                placeholder='Пароль'
                autoComplete='current-password'
                onChange={handleChangePassword}
            />
            <FaKey className='input-icon'/>
            <InputsError error={error} isErrorHidden={isErrorHidden} />
            <InputsCleaner opened={isCleanerOpened} onClick={onClickCleaner} />
            <button 
                className={`lock-but cont ${isLockVisible ? 'opened' : ''}`}
                title='Показать\Спрятать пароль'
                type='button'
                tabIndex={-1} 
                onClick={(handleSwitchLockPosition)}
            >
                {isLockOpened ? <FaUnlock className='fa-icon' /> : 
                <FaLock className='fa-icon' />}
            </button>
        </div>
    )
}

export default PasswordInput