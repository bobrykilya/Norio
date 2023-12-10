import { useState } from 'react'
// import './NameInput.sass'


const NameInput = (props) => {

    const [name, setName] = useState('')

    const handleChangeName = (e) => {
        // props.onChange(name)
        setName(e.target.value)
    }

    return (
        <div className='input-cont cont'>
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