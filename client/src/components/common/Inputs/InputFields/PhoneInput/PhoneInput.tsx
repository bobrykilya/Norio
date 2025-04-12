import React, { useLayoutEffect, useRef, useState } from 'react'
import { focusInput } from "../../../../../utils/focusInput"
import { ISignFormInput } from '../../../../../types/Auth-types'
import { copyText } from "../../../../../utils/copy"
import { useIMask } from 'react-imask'
import InputField from "../InputField/InputField"
import { ICONS } from "../../../../../assets/common/Icons-data"
import { PHONE_CODES_LIST } from "../../../../../assets/AuthPage/AuthPage-data"



type PhoneInputProps = ISignFormInput & {
    inputPhoneRef?: React.MutableRefObject<HTMLInputElement>;
}
const PhoneInput = ({ name, register, errors={}, reset, disabled=false, inputPhoneRef, withCopyBut, cleanerState, isEmptyIcon }: PhoneInputProps) => {

    // console.log('PhoneInput has been updated')
    const [isCleanerOpened, setIsCleanerOpened] = useState(cleanerState || false)
    const inputRef = inputPhoneRef || useRef(null)
    const phoneMaskOptions = {
        mask: [{
            mask: '(00)-000-00-00',
        }],
    }

    const { ref: formRef, onChange: onFormChange, ...restRegister } = register(name, {
        required: true,
        minLength: {
            value: 14,
            message: `Номер должен содержать код и 7 цифр`
        },
        validate: {
            isCorrectCode: (val: string) => {
                // console.log('isCorrectCode validate: ', val)
                const message = 'Неизвестный код оператора связи'
                if (val.length >= 9) {
                    return (PHONE_CODES_LIST.includes(val.substring(1,3)) || message)
                } else {
                    return true
                }
            },
        },
    })

    const {
        ref: maskedInputRef,
        setUnmaskedValue,
    } = useIMask(phoneMaskOptions, {
        ref: inputRef,
        onAccept: (val, _, e) => {
            onFormChange(e)
            handleChangePhone(val)
        }
    })

    const handleChangePhone = (maskedValue: string) => {
        maskedValue && maskedValue !== '(' ? setIsCleanerOpened(true) : clearInput()
    }

    const copyInputValue = () => {
        copyText('+375 ' + inputRef.current?.value)
    }

    const handleClickCleaner = async () => {
        await focusInput(inputRef)
        clearInput()
    }

    const clearInput = () => {
        setUnmaskedValue('')
        reset(name)
        setIsCleanerOpened(false)
    }


    //* First value setting for IMask
    useLayoutEffect(() => {
        setUnmaskedValue(inputRef.current?.value)
    }, [!inputRef.current && inputRef.current?.value])


    return (
        <InputField
            contClassName={'phone_input-cont'}
            inputIcon={ICONS.phone}
            registerForm={{
                formRef,
                restRegister,
                error: errors[name],
            }}
            inputRef={maskedInputRef}
            inputParams={{
                type: 'tel',
                inputMode: 'numeric',
                maxLength: 14,
                label: 'Мобильный номер',
                placeholder: '(29) 555-35-35',
                autoComplete: 'off',
                disabled: disabled,
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