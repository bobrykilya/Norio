import React, { useRef, useState } from 'react'
import { FaKey } from "react-icons/fa"
import { VscEye, VscEyeClosed } from "react-icons/vsc"
import InputError from '../InputError/InputError'
import InputCleaner from '../InputCleaner/InputCleaner'
import { focusInput } from "../../../../utils/focusInput"
import { useClickOutside } from "../../../../hooks/useClickOutside"
import ToolTip from '../../../others/ToolTip/ToolTip'
import { ISignFormInput, SignFormInputTypesOptions } from '../../../../types/Auth-types'



const PasswordInput = ({ name, inputType='sign_in', register, error=null, reset, watch=false, notSaveUser=false, disabled=false }: ISignFormInput) => {
    
    const [isLockVisible, setIsLockVisible] = useState(false)
    const [isLockOpened, setIsLockOpened] = useState(false)
    const [isCleanerOpened, setIsCleanerOpened] = useState(false)
    const [isCapsLockEnabled, setIsCapsLockEnabled] = useState(false)

    const inputRef = useRef(null)
    const lockButtonRef = useRef(null)
    
    const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        
        //* Ban of entering "space"
        e.target.value = e.target.value.trim()

        e.target.value ? changeInput() : clearInput()
    }

    const changeInput = () => {
        setIsLockVisible(true)
        setIsCleanerOpened(true)
    }

    const handleClickCleaner = async () => {
        clearInput()
        await focusInput(inputRef)
    }

    const clearInput = () => {
        reset(name)
        setIsLockVisible(false)
        setIsCleanerOpened(false)
        setIsCapsLockEnabled(false)
    }
    
    const handleCheckCapsLockState = (e: React.KeyboardEvent) => {
        e.getModifierState('CapsLock') ? 
            setIsCapsLockEnabled(true) : 
            setIsCapsLockEnabled(false)
    }

    const handleSwitchLockPosition = async () => {
        setIsLockOpened((prev) => !prev)
        await focusInput(inputRef)
    }

    //* CapsLock closing onBlur
    useClickOutside({
        ref: inputRef,
        butRef: lockButtonRef,
        callback: () => setIsCapsLockEnabled(false),
        conditionsList: [isCapsLockEnabled]
    })


    const getRegister = (type: SignFormInputTypesOptions) => {
        switch(type) {
            case 'sign_in':  //**** SignIn
                return register(name, { 
                    required: true,
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
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
                        isOneLanguage: (val: string) => (!/[а-яА-ЯёЁ]/.test(val) || !/[a-zA-Z]/.test(val)) ||
                            'Пароль должен быть лишь на одном языке',
                        isNoSpecChars: (val: string) => !/[^а-яА-ЯёЁa-zA-Z0-9.@_ ]/.test(val) ||
                            'Пароль не может содержать спецсимволы, кроме .@_',
                        isNumber: (val: string) => /(?=.*[0-9])/.test(val) ||
                            'Пароль должен содержать цифру',
                        isLower: (val: string) => /(?=.*[a-zа-яё])/.test(val) ||
                            'Пароль должен содержать строчную букву',
                        isUpper: (val: string) => /(?=.*[A-ZА-ЯЁ])/.test(val) ||
                            'Пароль должен содержать заглавную букву',
                    },
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                        handleChangePassword(e)
                    }
                })
            case 'confirm':  //**** Confirm Password
                return register(name, {    
                    required: true,
                    validate: {
                        passwordsMatch: () => {
                            if (watch('password') != watch('confirmPassword')) {
                                return 'Пароли не совпадают'
                            }
                        }
                    },
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                        handleChangePassword(e)
                    },
                })
        }
    }
    
    const { ref, ... rest_register } = getRegister(inputType)

    return (
        <div className={`password_input-cont input-cont cont ${error?.message ? 'error' : ''}`}>
            <span 
                className='input-label'
                onClick={() => focusInput(inputRef)}
            >
                {inputType !== 'confirm' ? 'Пароль' : 'Повтор пароля'}
            </span>
            <input
                {... rest_register}
                ref={(e) => {
                    ref(e)
                    inputRef.current = e
                }}
                className='passw_input'
                type={isLockOpened ? 'text' : 'password'}
                maxLength={15}
                placeholder={inputType !== 'confirm' ? 'Пароль' : 'Повтор пароля'}
                autoComplete={notSaveUser ? 'off' : 'current-password'}
                onKeyDown={handleCheckCapsLockState}
                onBlur={() => {setIsCapsLockEnabled(false)}}
                disabled={disabled}
            />
            <FaKey className='input-icon'/>
            <div 
                className={`caps_lock-cont ${isCapsLockEnabled ? 'opened' : ''}`}
            >
                <span>CAPS</span>
                <ToolTip text='Включён Caps-Lock' />
            </div>
            <InputError error={error} onClick={() => focusInput(inputRef)} />
            <InputCleaner opened={isCleanerOpened} onClick={handleClickCleaner} />
            <button
                className={`lock-but cont before_but-hover ${isLockVisible ? 'opened' : ''}`}
                type='button'
                tabIndex={-1}
                onClick={(handleSwitchLockPosition)}
                ref={lockButtonRef}
            >
                {!isLockOpened ? <VscEye className='fa-icon' /> :
                <VscEyeClosed className='fa-icon' />}
                <ToolTip text={!isLockOpened ? 'Показать пароль' : 'Скрыть пароль'} />
            </button>
        </div>
    )
}

export default PasswordInput