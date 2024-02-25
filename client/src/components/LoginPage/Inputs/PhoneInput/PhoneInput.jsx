import { useState, useRef, useEffect } from 'react'
import InputsError from '../InputsError/InputsError'
import InputsCleaner from '../../Inputs/InputsCleaner/InputsCleaner'
import { FiPhoneCall } from "react-icons/fi";
import { useFocusInput } from "../../../../hooks/useFocusInput"



const PhoneInput = ({ name, register, error=null, reset, disabled=false }) => {

    // console.log(error)
    const [isCleanerOpened, setIsCleanerOpened] = useState(false)
    const [number, setNumber] = useState(false)
    const inputRef = useRef(null)

    const handleChangePhone = (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, '')
        e.target.value ? changeInput() : clearInput()
    }

    const changeInput = () => {
        setIsCleanerOpened(true)
    }

    const handleBlurPhone = (e) => {
        setNumber(e.target.value)
        e.target.value = e.target.value.replace(/(\d{2})(\d{3})(\d{2})(\d{2})/, '($1) $2-$3-$4')
    }
    const handleFocusPhone = (e) => {
        number ? e.target.value = number : null
    }

    const handleClickCleaner = () => {
        setNumber(false)
        useFocusInput(inputRef)
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
            isCorrectCode: (val) => {
                // console.log(val.length)
                const code_list = ['29', '33', '44', '25']
                const message = 'Неизвестный код оператора связи'
                if (val.length >= 10) {
                    // console.log(val.substr(1,2))
                    return (code_list.includes(val.substr(1,2)) || message)
                }else if (val.length === 9){
                    // console.log(val.substr(0,2))
                    return (code_list.includes(val.substr(0,2)) || message)
                }else return true
            },
        },
        onChange: (e) => {
            handleChangePhone(e)
        },
        onBlur: (e) => {
            handleBlurPhone(e)
        }
    })

    return ( 
        <div className='phone_input-cont input-cont cont'>
            <input
                {... rest_register}
                ref={(e) => {
                    ref(e)
                    inputRef.current = e
                }}
                className='phone_input'
                type='tel'
                inputMode='number'
                maxLength={9}
                placeholder='(29) 555-35-35'
                disabled={disabled}
                // autoComplete='cc-number'
                autoComplete='off'
                onFocus={handleFocusPhone}
            />
            <span className='phone_mask'>+375</span>
            <FiPhoneCall className='input-icon'/>
            <InputsError error={error} />
            <InputsCleaner opened={isCleanerOpened} onClick={handleClickCleaner} />
        </div>
     )
}
 
export default PhoneInput