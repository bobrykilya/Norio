import { useState } from 'react'
import { FaUser } from "react-icons/fa"



const NameInput = () => {

    const [name, setName] = useState('')

    const handleChangeName = (e) => {
        // onChange(name)
        setName(e.target.value.replace(/[^a-zA-Zа-яА-Я]/, ''))
    }

    return (
        <div className='name_input-cont input-cont cont'>
            <input
                name='username'
                className='name_input'
                type="text"
                maxLength={13}
                placeholder='Логин'
                value={name}
                autoComplete='username'
                onChange={handleChangeName}
            />
            <FaUser className='input-icon'/>
        </div>
    )
}

export default NameInput