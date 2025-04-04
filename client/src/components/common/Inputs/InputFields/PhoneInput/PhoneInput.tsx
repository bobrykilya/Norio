import React, { useEffect, useState } from 'react'
import { focusInput } from "../../../../../utils/focusInput"
import { ISignFormInput } from '../../../../../types/Auth-types'
import { copyText } from "../../../../../utils/copy"
import { CODES_LIST } from "../../../../../../constants"
import { useIMask } from 'react-imask'
import InputField from "../InputField/InputField"
import { FiPhoneCall } from "react-icons/fi"
import timeout from "../../../../../utils/timeout"



type PhoneInputProps = ISignFormInput & {
    inputRef: React.MutableRefObject<HTMLInputElement>;
    getValues: any;
}
const PhoneInput = ({ name, register, errors={}, reset, disabled=false, inputRef, withCopyBut, cleanerState=false, isEmptyIcon, getValues, setValue }: PhoneInputProps) => {

    // console.log('phone has been updated')
    const [isCleanerOpened, setIsCleanerOpened] = useState(cleanerState)
    const inputIcon = <FiPhoneCall className='input_field-icon' />

    const maskOptions = {
        mask: [{
            mask: '(00)-000-00-00',
        }],
    }
    const {
        ref: maskedInputRef,
        setValue: setMaskedValue,
        value: maskedValue,
        unmaskedValue,
        setUnmaskedValue,
    } = useIMask(maskOptions, {
        ref: inputRef,
    })
    // console.log({ formValue: getValues(name), maskedValue })
    // console.log({ maskedValue,  inputRef: inputRef.current.value, error: errors[name] })

    const copyInputValue = () => {
        copyText('+375 ' + maskedValue)
    }

    const handleChangePhone = (unmaskedValue: string) => {
        // console.log(unmaskedValue)
        unmaskedValue ? changeInput(unmaskedValue) : clearInput()
    }

    const changeInput = (value: string) => {
        // setValue(name, maskedValue)
        setIsCleanerOpened(true)
    }

    const handleClickCleaner = async () => {
        await focusInput(inputRef)
        clearInput()
    }

    const clearInput = () => {
        reset(name)
        setMaskedValue('')
        setIsCleanerOpened(false)
    }

    const { ref, ...restRegister } = register(name, {
        required: true,
        minLength: {
            value: 14,
            message: `Номер должен содержать код и 7 цифр`
        },
        validate: {
            isCorrectCode: (val: string) => {
                const message = 'Неизвестный код оператора связи'
                if (val.length >= 9) {
                    return (CODES_LIST.includes(val.substring(1,3)) || message)
                } else {
                    return true
                }
            },
        },

    })

    useEffect(() => {
        handleChangePhone(unmaskedValue)
    }, [unmaskedValue])

    useEffect(() => {
        const setValueForInput = async () => {
            await timeout(100)
            setUnmaskedValue(getValues(name))
        }

        setValueForInput()
    }, [])


    return (
        <InputField
            contClassName={'phone_input-cont'}
            inputIcon={inputIcon}
            registerForm={{
                refForm: ref,
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
                disabled: disabled,
                autoComplete: 'off',
                value: maskedValue,
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