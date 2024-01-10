import { FaUser } from "react-icons/fa"
import InputsError from '../InputsError/InputsError'
import { forwardRef } from 'react'



const NameInput = ({ inputRef, name, register, error }) => {

    console.log('Name')
    const handleChangeName = (e) => {
        e.target.value = e.target.value.replace(/[^a-zA-Zа-яА-Я]/, '')
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
            <InputsError error={error}/>
        </div>
    )
}

export default NameInput