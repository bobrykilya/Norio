import { FaUser } from "react-icons/fa"
import InputsError from '../InputsError/InputsError'
// import { useController } from 'react-hook-form'



const NameInput = ({ username, setUserName, register, error }) => {

    // const {
    //     field: { ref, ...inputProps },
    //     fieldState: {
    //             error
    //         }
    // } = useController({
    //     // 'username',
    //     // fieldname,
    //     // control,
    //     rules: { 
    //         required:true,
    //     },
    //     // defaultValue: "",
    // })

    // console.log(error)
    const handleChangeName = (e) => {
        setUserName(e.target.value.replace(/[^a-zA-Zа-яА-Я]/, ''))
    }

    return (
        <div className='user_name_input-cont input-cont cont'>
            <input
                // name='username'
                {... register('username', {
                    required: 'Логин обязателен к заполнению',
                    minLength: {
                        value: 4,
                        message: 'Длина логина должна быть больше 3 букв'
                    }
                })}
                // {... inputProps}
                // inputRef={ref} 
                className='name_input'
                type="text"
                maxLength={13}
                placeholder='Логин'
                value={username}
                autoComplete='username'
                onChange={handleChangeName}
            />
            <FaUser className='input-icon'/>
            <InputsError error={error}/>
        </div>
    )
}

export default NameInput