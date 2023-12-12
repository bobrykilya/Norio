import { useState } from 'react'



const NameInput = (props) => {

    const [name, setName] = useState('')

    const handleChangeName = (e) => {
        // props.onChange(name)
        setName(e.target.value)
    }

    return (
        <div className='name_input-cont input-cont cont'>
            <input
                className='name_input'
                type="text"
                maxLength={15}
                placeholder='Логин'
                value={name}
                onChange={handleChangeName}
            />
            <i className="info-icon fa-solid fa-user"></i>
        </div>
    )
}

export default NameInput