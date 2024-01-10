import { FaUser } from "react-icons/fa"
import InputsError from '../InputsError/InputsError'



const NameInput = ({ name, register, error }) => {

        

    // console.log(error)
    const handleChangeName = (e) => {
        e.target.value = e.target.value.replace(/[^a-zA-Zа-яА-Я]/, '')
    }

    return (
        <div className='user_name_input-cont input-cont cont'>
            <input
                {... register(name, {
                    required: 'Логин обязателен к заполнению',
                    minLength: {
                        value: 4,
                        message: 'Длина логина должна быть больше 3 букв'
                    }
                })}
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