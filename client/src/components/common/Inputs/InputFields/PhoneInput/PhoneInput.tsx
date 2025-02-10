import React, { useEffect, useState } from 'react'
import { focusInput } from "../../../../../utils/focusInput"
import { ISignFormInput } from '../../../../../types/Auth-types'
import InputField from "../InputField/InputField"
import { FiPhoneCall } from "react-icons/fi"
import { copyText } from "../../../../../utils/copy"
import { CODES_LIST } from "../../../../../../constants"



type PhoneInputProps = ISignFormInput & {
    inputRef: React.MutableRefObject<HTMLInputElement>;
}
const PhoneInput = ({ name, register, errors={}, reset, disabled=false, inputRef, withCopyBut, cleanerState=false, isEmptyIcon }: PhoneInputProps) => {

    // console.log(error)
    const [isCleanerOpened, setIsCleanerOpened] = useState(cleanerState)
    const [number, setNumber] = useState<string | false>(null)


    const copyInputValue = () => {
        copyText('+375 ' + inputRef.current.value)
    }

    const handleChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, '')
        e.target.value ? changeInput() : clearInput()
    }

    const changeInput = () => {
        setIsCleanerOpened(true)
    }

    const handleBlurPhone = () => {
        setNumber(inputRef.current.value)
        inputRef.current.value = inputRef.current.value.replace(/(\d{2})(\d{3})(\d{2})(\d{2})/, '($1) $2-$3-$4')
    }
    const handleFocusPhone = () => {
        number ? inputRef.current.value = String(number) : null
    }

    const handleClickCleaner = async () => {
        setNumber(null)
        await focusInput(inputRef)
        clearInput()
    }

    const clearInput = () => {
        reset(name)
        setIsCleanerOpened(false)
    }

    const { ref, ... rest_register } = register(name, {
        required: true,
        minLength: {
            value: 9,
            message: `Номер должен содержать код и 7 цифр`
        },
        validate: {
            isCorrectCode: (val: string) => {
                const message = 'Неизвестный код оператора связи'
                if (val.length >= 10) {
                    return (CODES_LIST.includes(val.substring(1,2)) || message)
                } else if (val.length === 9) {
                    return (CODES_LIST.includes(val.substring(0,2)) || message)
                } else {
                    return true
                }
            },
        },
        onChange: handleChangePhone,
        onBlur: handleBlurPhone,
    })

    useEffect(() => {
        if (cleanerState) {
            setTimeout(handleBlurPhone, 200)
        }
    }, [])


    return (
        <InputField
            contClassName={'phone_input-cont'}
            inputIcon={<FiPhoneCall className='input_field-icon' />}
            register={{
                ref,
                rest_register,
                error: errors[name]
            }}
            inputRef={inputRef}
            inputParams={{
                type: 'tel',
                inputMode: 'number',
                maxLength: 9,
                label: 'Мобильный номер',
                placeholder: '(29) 555-35-35',
                disabled: disabled,
                autoComplete: 'off',
                onFocus: handleFocusPhone,
            }}
            cleanerParams={{
                isCleanerOpened: isCleanerOpened,
                handleClickCleaner: handleClickCleaner
            }}
            extraButParams={
                withCopyBut ? {
                    isCopy: true,
                    isExtraButVisible: isCleanerOpened,
                    onClick: copyInputValue
                } :
                null
            }
            emptyIconParams={
                isEmptyIcon && {
                    isOpened: !isCleanerOpened
                }
            }
        >
            <span className='phone_mask'>+375</span>
        </InputField>
     )
}
 
export default PhoneInput