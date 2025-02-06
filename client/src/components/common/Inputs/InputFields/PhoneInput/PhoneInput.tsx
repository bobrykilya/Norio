import React, { useState } from 'react'
import { focusInput } from "../../../../../utils/focusInput"
import { ISignFormInput } from '../../../../../types/Auth-types'
import InputField from "../InputField/InputField"
import { FiPhoneCall } from "react-icons/fi"



type PhoneInputProps = ISignFormInput & {
    inputRef: React.MutableRefObject<HTMLInputElement>;
}
const PhoneInput = ({ name, register, error=null, reset, disabled=false, inputRef }: PhoneInputProps) => {

    // console.log(error)
    const [isCleanerOpened, setIsCleanerOpened] = useState(false)
    const [number, setNumber] = useState<string | false>(null)

    const handleChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, '')
        e.target.value ? changeInput() : clearInput()
    }

    const changeInput = () => {
        setIsCleanerOpened(true)
    }

    const handleBlurPhone = (e: React.FocusEvent<HTMLInputElement>) => {
        setNumber(e.target.value)
        e.target.value = e.target.value.replace(/(\d{2})(\d{3})(\d{2})(\d{2})/, '($1) $2-$3-$4')
    }
    const handleFocusPhone = (e: React.FocusEvent<HTMLInputElement>) => {
        number ? e.target.value = String(number) : null
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
        // mask: '{(}00{)}000-00-00',
        minLength: {
            value: 9,
            message: `Номер должен содержать код и 7 цифр`
        },
        validate: {
            isCorrectCode: (val: string) => {
                // console.log(val.length)
                const code_list = ['29', '33', '44', '25']
                const message = 'Неизвестный код оператора связи'
                if (val.length >= 10) {
                    // console.log(val.substr(1,2))
                    return (code_list.includes(val.substring(1,2)) || message)
                }else if (val.length === 9){
                    // console.log(val.substr(0,2))
                    return (code_list.includes(val.substring(0,2)) || message)
                }else return true
            },
        },
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
            handleChangePhone(e)
        },
        onBlur: (e: React.FocusEvent<HTMLInputElement>) => {
            handleBlurPhone(e)
        }
    })

    return (
        <InputField
            contClassName={'phone_input-cont'}
            inputIcon={<FiPhoneCall className='input_field-icon' />}
            register={{
                ref,
                rest_register
            }}
            error={error}
            inputRef={inputRef}
            inputParams={{
                type: 'tel',
                inputMode: 'number',
                maxLength: 9,
                label: 'Номер телефона',
                placeholder: '(29) 555-35-35',
                disabled: disabled,
                autoComplete: 'off',
                onFocus: handleFocusPhone,
            }}
            cleanerParams={{
                isCleanerOpened: isCleanerOpened,
                handleClickCleaner: handleClickCleaner
            }}
        >
            <span className='phone_mask'>+375</span>
        </InputField>
     )
}
 
export default PhoneInput