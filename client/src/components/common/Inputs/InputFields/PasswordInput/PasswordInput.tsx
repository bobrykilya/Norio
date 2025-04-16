import React, { useRef, useState } from 'react'
import { focusInput } from "../../../../../utils/focusInput"
import { ISignFormInput, SignFormInputTypesOptions } from '../../../../../types/Auth-types'
import InputField from "../InputField/InputField"
import ToolTip from "../../../../others/ToolTip/ToolTip"
import { ICONS } from "../../../../../assets/common/Icons-data"



const PasswordInput = ({ name, inputType='sign_in', register, errors={}, reset, watch=false, notSaveUser=false, disabled=false }: Omit<ISignFormInput, 'placeholder'>) => {

    const [isLockOpened, setIsLockOpened] = useState(false)
    const [isCapsLockEnabled, setIsCapsLockEnabled] = useState(false)

    const inputRef = useRef(null)
    const isCleanerOpened = Boolean(watch && watch(name))
    
    const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        
        //* Ban of entering "space"
        e.target.value = e.target.value.trim()

        !e.target.value && clearInput()
    }

    const handleClickCleaner = async () => {
        clearInput()
        await focusInput(inputRef)
    }

    const clearInput = () => {
        reset(name)
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
    
    const { ref, ... restRegister } = getRegister(inputType)

    return (
        <InputField
            contClassName={'password_input-cont'}
            inputIcon={ICONS.password}
            registerForm={{
                formRef: ref,
                restRegister,
                error: errors[name]
            }}
            inputRef={inputRef}
            inputParams={{
                type: isLockOpened ? 'text' : 'password',
                maxLength: 15,
                placeholder: inputType !== 'confirm' ? 'Пароль' : 'Повтор пароля',
                autoComplete: notSaveUser ? 'off' : 'current-password',
                onKeyDown: handleCheckCapsLockState,
                onBlur: () => {setIsCapsLockEnabled(false)},
                disabled,
            }}
            cleanerParams={{
                isCleanerOpened,
                handleClickCleaner: handleClickCleaner
            }}
            extraButParams={{
                icon: !isLockOpened ? ICONS.eyeOpened : ICONS.eyeClosed,
                isExtraButVisible: isCleanerOpened,
                onClick: handleSwitchLockPosition,
                toolTip: {
                    message: !isLockOpened ? 'Показать пароль' : 'Скрыть пароль'
                }
            }}
        >
            <div
                className={`caps_lock-cont ${isCapsLockEnabled ? 'opened' : ''}`}
            >
                <span>CAPS</span>
                <ToolTip message='Включён Caps-Lock' />
            </div>
        </InputField>
    )
}

export default PasswordInput