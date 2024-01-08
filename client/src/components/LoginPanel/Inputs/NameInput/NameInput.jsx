import { FaUser } from "react-icons/fa"
import { useController } from 'react-hook-form'



const NameInput = ({fieldname, name, setName, control}) => {

    const {
        field: { ref, ...inputProps },
        fieldState: {
                error
            }
    } = useController({
        // 'username',
        // fieldname,
        control,
        rules: { 
            required:true,
        },
        defaultValue: "",
    })

    // console.log(register)
    const handleChangeName = (e) => {
        setName(e.target.value.replace(/[^a-zA-Zа-яА-Я]/, ''))
    }

    return (
        <div className='name_input-cont input-cont cont'>
            <input
                // name='username'
                {...inputProps}
                inputRef={ref}
                // name='field.name'
                className='name_input'
                type="text"
                // maxLength={13}
                placeholder='Логин'
                // value={name}
                autoComplete='username'
                onChange={handleChangeName}
            />
            <FaUser className='input-icon'/>
            {/* <div>{errors?.username && <p>{errors?.username?.message}</p>}</div> */}
        </div>
    )
}

export default NameInput