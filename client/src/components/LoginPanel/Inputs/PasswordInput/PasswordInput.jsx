import { useRef, useState } from 'react'
import { FaKey } from "react-icons/fa"
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import InputsError from '../InputsError/InputsError'
import InputsCleaner from '../../Inputs/InputsCleaner/InputsCleaner'
import { useFocusInput } from "../../../../Hooks/useFocusInput"
import { useClickOutside } from "../../../../Hooks/useClickOutside"



const PasswordInput = ({ name, type='sign_in', register, error=null, reset, watch=false, notSaveUser=false, disabled=false }) => {
    
    // console.log('watch')
    const [isLockVisible, setIsLockVisible] = useState(false)
    const [isLockOpened, setIsLockOpened] = useState(false)
    const [isCleanerOpened, setIsCleanerOpened] = useState(false)
    const [isCapsLockEnabled, setIsCapsLockEnabled] = useState(false)

    const inputRef = useRef(null)
    const lockButtonRef = useRef(null)
    
    const handleChangePassword = (e) => {
        
        //* Ban of entering "space"
        e.target.value = e.target.value.trim()

        e.target.value ? changeInput() : clearInput()
    }

    const changeInput = () => {
        setIsLockVisible(true)
        setIsCleanerOpened(true)
    }

    const onClickCleaner = () => {
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


    const getRegister = (type) => {
        switch(type) {
            case 'sign_in':  //**** SignIn
                return register(name, { 
                    required: true,
                    onChange: (e) => {
                        handleChangePassword(e)
                    }
                })
            case 'sign_up':  //**** SignUp
                return register(name, { 
                    required: true,
                    minLength: {
                        value: 4,
                        message: 'Длина пароля должна быть от 4 до 15 знаков'
                    },
                    validate: {
                        // noCyrillic: (val) => !/[^a-zA-Z0-9.@_]/.test(val) || 
                        //     'Пароль не может содержать кириллицу',
                        isOneLanguage: (val) => (!/[а-яА-ЯёЁ]/.test(val) || !/[a-zA-Z]/.test(val)) || 
                            'Пароль должен быть лишь на одном языке',
                        isNoSpecChars: (val) => !/[^а-яА-ЯёЁa-zA-Z0-9.@_ ]/.test(val) || 
                            'Пароль не может содержать спецсимволы, кроме .@_',
                        isNumber: (val) => /(?=.*[0-9])/.test(val) || 
                            'Пароль должен содержать цифру',
                        isLower: (val) => /(?=.*[a-zа-яё])/.test(val) || 
                            'Пароль должен содержать строчную букву',
                        isUpper: (val) => /(?=.*[A-ZА-ЯЁ])/.test(val) ||
                            'Пароль должен содержать заглавную букву',
                    },
                    onChange: (e) => {
                        handleChangePassword(e)
                    }
                })
            case 'confirm':  //**** Confirm Password
                return register(name, {    
                    required: true,
                    validate: {
                        passwordsMatch: () => {
                            if (watch('sign_up_password') != watch('confirm_password')) {
                                return 'Пароли не совпадают'
                            }
                        }
                    },
                    onChange: (e) => {
                        handleChangePassword(e)
                    },
                })
        }
    }
    
    const { ref, ... rest_register } = getRegister(type)

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
                maxLength={15}
                placeholder={type !== 'confirm' ? 'Пароль' : 'Повтор пароля'}
                autoComplete={notSaveUser ? 'off' : 'current-password'}
                onKeyDown={handleCheckCapsLockState}
                onBlur={() => {setIsCapsLockEnabled(false)}}
                disabled={disabled}
            />
            <FaKey className='input-icon'/>
            <div 
                className={`caps_lock-cont ${isCapsLockEnabled ? 'opened' : ''}`}
                title='Включён Caps-Lock'
            >
                <span>CAPS</span>
            </div>
            <InputsError error={error} />
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