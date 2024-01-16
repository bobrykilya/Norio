import { useRef, useState, useEffect } from 'react'
import { FaKey } from "react-icons/fa"
import { VscEye } from "react-icons/vsc";
import { VscEyeClosed } from "react-icons/vsc";
// import { AiFillEye } from "react-icons/ai";
// import { AiFillEyeInvisible } from "react-icons/ai";
// import { FaLock, FaUnlock } from "react-icons/fa6"
import { TbLetterCaseUpper } from "react-icons/tb";
import InputsError from '../InputsError/InputsError'
import InputsCleaner from '../../Inputs/InputsCleaner/InputsCleaner'
import { useFocusInput } from "../../../Hooks/useFocusInput"
import { useClickOutside } from "../../../Hooks/useClickOutside"



const PasswordInput = ({ name, register, error=null, isSignIn=false, reset, isConfirmPass=false, watch=false, notSaveUser=false }) => {
    
    // console.log('watch')
    const [isLockVisible, setIsLockVisible] = useState(false)
    const [isLockOpened, setIsLockOpened] = useState(false)
    const [isCleanerOpened, setIsCleanerOpened] = useState(false)
    const [isErrorHidden, setIsErrorHidden] = useState(false)
    const [isCapsLockEnabled, setIsCapsLockEnabled] = useState(false)

    const inputRef = useRef(null)
    const lockButtonRef = useRef(null)
    
    const handleChangePassword = (e) => {
        
        //* Ban of entering Special characters
        e.target.value = e.target.value.replace(/[^а-яА-ЯёЁa-zA-Z0-9.@_]/, '')

        e.target.value ? changeInput() : clearInput()
    }

    const changeInput = () => {
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
        // setIsLockOpened(false)
        setIsCleanerOpened(false)
        setIsCapsLockEnabled(false)
    }
    
    const handleCheckCapsLockState = (e) => {
        e.getModifierState('CapsLock') ? 
            setIsCapsLockEnabled(true) : 
            setIsCapsLockEnabled(false)
    }

    const handleSwitchLockPosition = (e) => {
        setIsLockOpened((prev) => !prev)
        useFocusInput(inputRef)
    }

    //* CapsLock closing onBlur
    useClickOutside(inputRef, () => {
        setIsCapsLockEnabled(false)
    }, lockButtonRef)


    const { ref, ... rest_register } = isSignIn ? 
        register(name, { //**** SignIn
            required: true,
            onChange: (e) => {
                handleChangePassword(e)
        }
    
        }) : !isConfirmPass ? register(name, { //**** SignUp
            required: true,
            minLength: {
                value: 4,
                message: 'Длина пароля должна быть от 4 до 14 знаков'
            },
            validate: {
                noCyrillic: (val) => !/[^a-zA-Z0-9.@_]/.test(val) || 
                    'Пароль не может содержать кириллицу',
                isNumber: (val) => /(?=.*[0-9])/.test(val) || 
                    'Пароль должен содержать цифру',
                isLower: (val) => /(?=.*[a-z])/.test(val) || 
                    'Пароль должен содержать строчную букву',
                isUpper: (val) => /(?=.*[A-Z])/.test(val) ||
                    'Пароль должен содержать заглавную букву',
            },
            onChange: (e) => {
                handleChangePassword(e)
            }
        }) : register(name, {    //**** Confirm Password
            required: true,
            validate: {
                passwordsMatching: (val) => {
                    if (watch('sign_up_password') != watch('confirm_password')) {
                        return 'Пароли не совпадают'
                    }
                }
            },
            onChange: (e) => {
                handleChangePassword(e)
            },
        })

    return (
        <div className='password_input-cont input-cont cont'>
            <input
                {... rest_register}
                ref={(e) => {2
                    ref(e)
                    inputRef.current = e
                }}
                className='passw_input'
                type={isLockOpened ? 'text' : 'password'}
                maxLength={14}
                placeholder={!isConfirmPass ? 'Пароль' : 'Повтор пароля'}
                autoComplete={notSaveUser ? 'off' : 'current-password'}
                onKeyDown={handleCheckCapsLockState}
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
                ref={lockButtonRef}
            >
                {isLockOpened ? <VscEye className='fa-icon' /> :
                <VscEyeClosed className='fa-icon' />}
            </button> 
        </div>
    )
}

export default PasswordInput