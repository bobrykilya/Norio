import { useRef, useState } from 'react'
import { FaKey } from "react-icons/fa"
import { FaLock, FaUnlock } from "react-icons/fa6"
import { TbLetterCaseUpper } from "react-icons/tb";
import InputsError from '../InputsError/InputsError'
import InputsCleaner from '../../Inputs/InputsCleaner/InputsCleaner'
import { useFocusInput } from "../../../Hooks/useFocusInput"



const PasswordInput = ({ name, register, error, reset, isSignIn=false, isRepeat=false  }) => {
    
    // console.log(error)
    const [isLockVisible, setIsLockVisible] = useState(false)
    const [isLockOpened, setIsLockOpened] = useState(false)
    const [isCleanerOpened, setIsCleanerOpened] = useState(false)
    const [isErrorHidden, setIsErrorHidden] = useState(false)
    const [isCapsLockEnabled, setIsCapsLockEnabled] = useState(false)

    const inputRef = useRef(null)
    
    const handleChangePassword = (e) => {
        // console.log(e.target.value)
        //* Ban of entering Cyrillic and special characters
        if (!isSignIn) e.target.value = e.target.value.replace(/[^a-zA-Z0-9.@_]/, '')
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
        setIsCapsLockEnabled(false)
    }
    
    const handleCheckCapsLockState = (e) => {
        e.getModifierState('CapsLock') ? setIsCapsLockEnabled(true) : setIsCapsLockEnabled(false)
    }

    const handleSwitchLockPosition = (e) => {
        setIsLockOpened((prev) => !prev)
        useFocusInput(inputRef)
    }

    const { ref, ... rest_register } = register(name, {
            required: true,
            minLength: {
                value: 5,
                message: 'Длина пароля должна быть от 4 до 14 знаков'
            },
            validate: {
                // noCyrillic: (val) => /([^а-яА-ЯёЁ])/.test(val) || 
                //     'Пароль не может содержать кириллицу',
                // noSpecialChar: (val) => /[^!,#$%^&*()]/.test(val) || 
                //     'Пароль не может содержать спецсимволы, кроме @_.',
                isNumber: (val) => /(?=.*[0-9])/.test(val) || 
                    'Пароль должен содержать цифру',
                isLower: (val) => /(?=.*[a-z])/.test(val) || 
                    'Пароль должен содержать строчную букву',
                isUpper: (val) => /(?=.*[A-Z])/.test(val) ||
                    'Пароль должен содержать заглавную букву',
            },
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
                // inputMode='numeric'
                maxLength={14}
                placeholder='Пароль'
                autoComplete='current-password'
                onChange={handleChangePassword}
                onKeyDown={handleCheckCapsLockState}
                onBlur={() => setIsCapsLockEnabled(false)}
            />
            <FaKey className='input-icon'/>
            <div 
                className={`caps_lock-cont ${isCapsLockEnabled ? 'opened' : ''}`}
                title='Включён Caps-Lock'
            >
                <TbLetterCaseUpper className='caps_lock-icon' />
            </div>
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