import { useState, useRef } from 'react'
import InputsError from '../InputsError/InputsError'
import InputsCleaner from '../../Inputs/InputsCleaner/InputsCleaner'
import { FiPhoneCall } from "react-icons/fi";
import { useFocusInput } from "../../../../Hooks/useFocusInput"



const PhoneInput = ({ name, register, error=null, reset, disabled=false }) => {

    // console.log(error)
    const [isCleanerOpened, setIsCleanerOpened] = useState(false)
    const [isErrorHidden, setIsErrorHidden] = useState(false)
    const inputRef = useRef(null)

    const handleChangePhone = (e) => {
        e.target.value = e.target.value.replace(/[^1-9]/, '')
        // const val = e.target.value
        // let new_val = false
        // console.log(val)
        // switch(val?.length) {
        //     case 1:
        //         new_val = `(${val}`
        //         break
        //     case 3:
        //         new_val = `(${val.substring(1, 3)}) ${val.substring(4)}`
        //         break
        //     case 8:
        //         new_val = `${val.substring(1-7)}-${val.substring(8)}`
        //         break
        //     case 11:
        //         new_val = `${val.substring(1-10)}-${val.substring(11)}`
        //         break
        // }
        // console.log(val.length)
        // if (new_val) e.target.value = new_val
        // e.target.value = `(${val.substring(0, 2)}) ${val.substring(3, 5)}-${val.substring(5, val.length)}`
        e.target.value ? ChangeInput() : clearInput()
    }

    const ChangeInput = () => {
        setIsErrorHidden(false)
        setIsCleanerOpened(true)
    }

    const onClickCleaner = () => {
        setIsErrorHidden(true)
        clearInput()
        useFocusInput(inputRef)
    }

    const clearInput = () => {
        reset(name)
        setIsCleanerOpened(false)
    }

    const { ref, ... rest_register } = register(name, {
        required: true,
        mask: '{(}00{)}000-00-00',
        // minLength: {
        //     value: 14,
        //     message: `Номер должен содержать 7 цифр`
        // },
        // validate: {
        //     isNotLatin: (val) => !/[a-zA-Z]/.test(val) || 
        //         'Поле должно содержать лишь кириллицу',
        // },
        onChange: (e) => {
            handleChangePhone(e)
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
                type='text'
                inputMode='number'
                maxLength={11}
                placeholder='(88) 005-55-35'
                disabled={disabled}
            />
            <span className='phone_mask'>+375</span>
            <FiPhoneCall className='input-icon'/>
            <InputsError error={error} isErrorHidden={isErrorHidden} />
            <InputsCleaner opened={isCleanerOpened} onClick={onClickCleaner} />
        </div>
     )
}
 
export default PhoneInput