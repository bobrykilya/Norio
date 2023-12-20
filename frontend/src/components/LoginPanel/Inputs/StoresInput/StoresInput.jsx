import { useState } from 'react'
import { FaHouseChimneyUser } from "react-icons/fa6"



const StoresInput = () => {
    
    const user_name = document.querySelector('#sign_up-form .name_input')
    
    const [store, setStore] = useState('Точка')
    const [isDropDownOpened, setIsDropDownOpened] = useState(false)

    const handleSetStoreName = (e) => {
        // console.log(user_name)
        if (e.target.tagName !== 'UL') {
            setStore(e.target.textContent)
            user_name.focus()
        }
    }

    return ( 
        <div className="stores_input-cont input-cont cont">
            <button 
                type='button'
                id='stores_input'
                className='cont'
                onClick={() => {setIsDropDownOpened(!isDropDownOpened)}}
                // onBlur={handleToggleDropDownStores}
            >
                <span 
                    id='store_name'
                    className={store !== 'Точка' ? 'selected' : ''}
                >
                    {store}
                </span>
            </button>
            <FaHouseChimneyUser className='input-icon'/>
            <ul
                id='dropdown-stores-cont'
                className={isDropDownOpened ? 'opened' : ''}
                onClick={handleSetStoreName}
            >
                <li>Офис</li>
                <li>Красное</li>
                <li>Полоцк</li>
                <li>БелМаш</li>
                <li>Тюрли</li>
                <li>Глубокое</li>
                <li>Радошковичи</li>
                <li>Спутник</li>
                <li>Либава</li>
            </ul>
        </div>
     )
}
 
export default StoresInput
