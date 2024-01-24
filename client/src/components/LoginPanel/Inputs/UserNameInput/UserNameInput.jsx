import { useState, useRef } from 'react'
import { FaUser } from "react-icons/fa"
import InputsError from '../InputsError/InputsError'
import InputsCleaner from '../../Inputs/InputsCleaner/InputsCleaner'
import { useFocusInput } from "../../../../Hooks/useFocusInput"



const NameInput = ({ name, register, error=null, reset, isValidate=false, notSaveUser=false, placeholder, inputMaxLength=15, notLatin=false, disabled=false }) => {

    // console.log(error)
    const [isCleanerOpened, setIsCleanerOpened] = useState(false)
    const [isErrorHidden, setIsErrorHidden] = useState(false)
    const inputRef = useRef(null)
    
    const handleChangeName = (e) => {
        e.target.value = e.target.value.replace(/[^a-zA-Zа-яА-ЯёЁ]/, '')
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

    const { ref, ... rest_register } = isValidate ? 
    (!notLatin ? register(name, {    //* SignUp
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
    }): 
    register(name, {  //* SignUp_2
        required: true,
        validate: {
            isNotLatin: (val) => !/[a-zA-Z]/.test(val) || 
                'Поле должно содержать лишь кириллицу',
        },
        onChange: (e) => {
            handleChangeName(e)
        }
    })
    ) : register(name, {    //* SignIn
        required: true,
        onChange: (e) => {
            handleChangeName(e)
        }
    })

    return (
        <div className='user_name_input-cont input-cont cont'>
            <input
                {... rest_register}
                ref={(e) => {
                    ref(e)
                    inputRef.current = e
                }}
                className='name_input'
                type="text"
                maxLength={inputMaxLength}
                placeholder={placeholder}
                autoComplete={notSaveUser ? 'off' : 'username'}
                disabled={disabled}
                autoFocus
            />
            <FaUser className='input-icon'/>
            <InputsError error={error} isErrorHidden={isErrorHidden} />
            <InputsCleaner opened={isCleanerOpened} onClick={onClickCleaner} />
        </div>
    )
}

export default NameInput