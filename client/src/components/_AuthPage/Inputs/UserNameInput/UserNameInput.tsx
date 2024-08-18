import React, { useState, useRef } from 'react'
import InputsError from '../InputsError/InputsError'
import InputsCleaner from '../InputsCleaner/InputsCleaner'
import { focusInput } from '../../../../utils/focusInput'
import { capitalize } from '../../../../utils/capitalize'
import { ISignFormStringInput } from '../../../../types/Auth-types'



type NameInputProps = ISignFormStringInput & {
    placeholder: string;
    icon: React.ReactElement;
    inputMaxLength: number;
    // inputRefLogin: ;
}
const NameInput = ({ name, placeholder, icon, type='sign_in', register, error=null, reset, notSaveUser=false, inputMaxLength=20, disabled=false, inputRefLogin=false }: NameInputProps) => {

    // console.log(error)
    const [isCleanerOpened, setIsCleanerOpened] = useState(false)
    const inputRef = inputRefLogin || useRef(null)
    
    const handleChangeName = (e) => {
        e.target.value = e.target.value.replace(/[^a-zA-Zа-яА-ЯёЁ]/, '')
        e.target.value = capitalize(e.target.value)
        e.target.value ? changeInput() : clearInput()
    }
    
    const changeInput = () => {
        setIsCleanerOpened(true)
    }

    const handleClickCleaner = () => {
        clearInput()
        focusInput(inputRef)
    }

    const clearInput = () => {
        reset(name)
        setIsCleanerOpened(false)
    }

    const getRegister = (type: AvailableNameInputType) => {
        switch(type) {
            case 'sign_in':  //**** SignIn
                return register(name, {
                    required: true,
                    onChange: (e) => {
                        handleChangeName(e)
                    }
                })
            case 'sign_up':  //**** SignUp
                return register(name, {
                    required: true,
                    minLength: {
                        value: 4,
                        message: `Длина логина должна быть от 4 до ${inputMaxLength} знаков`
                    },
                    onChange: (e) => {
                        handleChangeName(e)
                    },
                    validate: {
                        isOneLanguage: (val) => (!/[а-яА-ЯёЁ]/.test(val) || !/[a-zA-Z]/.test(val)) || 
                            'Логин должен быть лишь на одном языке',
                    },
                })
            case 'name':
                return register(name, {
                    required: true,
                    minLength: {
                        value: 2,
                        message: `Длина поля '${placeholder}' должна быть от 2 букв`
                    },
                    validate: {
                        isNotLatin: (val) => !/[a-zA-Z]/.test(val) || 
                            `Поле '${placeholder}' должно содержать лишь кириллицу`,
                    },
                    onChange: (e) => {
                        handleChangeName(e)
                    }
                })
        }
    }

    const { ref, ... rest_register } = getRegister(type)

    return (
        <div className={`user_name_input-cont input-cont cont ${error?.message ? 'error' : ''}`}>
            <span 
                className='input-label'
                onClick={() => focusInput(inputRef)}
            >
                {placeholder}
            </span>
            <input
                {... rest_register}
                ref={(e) => {
                    ref(e)
                    inputRef.current = e
                }}
                className='name_input'
                type='text'
                maxLength={inputMaxLength}
                placeholder={placeholder}
                autoComplete={(type === 'name' || notSaveUser) ? 'off' : 'username'}
                disabled={disabled}
                autoFocus
            />
            {icon}
            <InputsError error={error} onClick={() => focusInput(inputRef)} />
            <InputsCleaner opened={isCleanerOpened} onClick={handleClickCleaner} />
        </div>
    )
}

export default NameInput