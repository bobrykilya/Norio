import { useState } from 'react'
import { FaUser } from "react-icons/fa"
import InputsError from '../InputsError/InputsError'
import InputsCleaner from '../../Inputs/InputsCleaner/InputsCleaner'
import { useFocusInput } from "../../../Hooks/useFocusInput"



const NameInput = ({ name, register, error, reset, inputRef }) => {

    // console.log('Name')
    const [isCleanerOpened, setIsCleanerOpened] = useState(false)

    
    const handleChangeName = (e) => {
        e.target.value ? ChangeInput(e.target.value) : clearInput()
    }
    
    const ChangeInput = (value) => {
        value = value.replace(/[^a-zA-Zа-яА-Я]/, '')
        setIsCleanerOpened(true)
    }

    const clearInput = () => {
        reset(name)
        setIsCleanerOpened(false)
        useFocusInput(inputRef)
    }

    const { ref, ... rest_register } = register(name, {
        // required: 'Логин обязателен к заполнению',
        required: true,
        minLength: {
            value: 4,
            message: 'Длина логина должна быть больше 3 букв'
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
                maxLength={13}
                placeholder='Логин'
                autoComplete='username'
                onChange={handleChangeName}
            />
            <FaUser className='input-icon'/>
            {isCleanerOpened ? <InputsError error={error} /> : null}
            <InputsCleaner opened={isCleanerOpened} onClick={clearInput} />
        </div>
    )
}

export default NameInput