import React, { useRef, useState } from 'react'
import { focusInput } from '../../../../../utils/focusInput'
import { capitalize } from '../../../../../utils/capitalize'
import { ISignFormInput, SignFormInputTypesOptions } from '../../../../../types/Auth-types'
import { ICommonVar } from "../../../../../../../common/types/Global-types"
import InputField from "../InputField/InputField"



type NameInputProps = ISignFormInput & {
    placeholder: string;
    icon: ICommonVar['icon'];
    inputMaxLength?: number;
    inputRefLogin?: React.MutableRefObject<HTMLInputElement> | null;
}
const NameInput = ({ name, placeholder, icon, inputType='sign_in', register, errors={}, reset, notSaveUser=false, inputMaxLength=20, disabled=false, inputRefLogin=null, withCopyBut, cleanerState=false, isEmptyIcon }: NameInputProps) => {

    const [isCleanerOpened, setIsCleanerOpened] = useState(cleanerState)
    const inputRef = inputRefLogin || useRef(null)

    
    const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.value = e.target.value.replace(/[^a-zA-Zа-яА-ЯёЁ]/, '')
        e.target.value = capitalize(e.target.value)
        e.target.value ? changeInput() : clearInput()
    }
    
    const changeInput = () => {
        setIsCleanerOpened(true)
    }

    const handleClickCleaner = async () => {
        clearInput()
        await focusInput(inputRef)
    }

    const clearInput = () => {
        reset(name)
        setIsCleanerOpened(false)
    }

    const getRegister = (type: SignFormInputTypesOptions) => {
        switch(type) {
            case 'sign_in':  //**** SignIn
                return register(name, {
                    required: true,
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
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
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                        handleChangeName(e)
                    },
                    validate: {
                        isOneLanguage: (val: string) => (!/[а-яА-ЯёЁ]/.test(val) || !/[a-zA-Z]/.test(val)) ||
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
                        isNotLatin: (val: string) => !/[a-zA-Z]/.test(val) ||
                            `Поле '${placeholder}' должно содержать лишь кириллицу`,
                    },
                    onChange: (e:  React.ChangeEvent<HTMLInputElement>) => {
                        handleChangeName(e)
                    }
                })
        }
    }

    const { ref, ... rest_register } = getRegister(inputType)

    return (
        <InputField
            contClassName={'user_name_input-cont'}
            inputIcon={icon}
            register={{
                ref,
                rest_register,
                error: errors[name]
            }}
            inputRef={inputRef}
            inputParams={{
                type: 'text',
                maxLength: inputMaxLength,
                placeholder: placeholder,
                autoComplete: (inputType === 'name' || notSaveUser) ? 'off' : 'username',
                disabled: disabled,
                autoFocus: inputType !== 'name',
            }}
            cleanerParams={{
                isCleanerOpened: isCleanerOpened,
                handleClickCleaner: handleClickCleaner
            }}
            extraButParams={
                withCopyBut ? {
                    isCopy: true,
                    isExtraButVisible: isCleanerOpened
                } :
                null
            }
            emptyIconParams={
                isEmptyIcon && {
                    isOpened: !isCleanerOpened
                }
            }
        />
    )
}

export default NameInput