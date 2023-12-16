import { useState } from 'react'



const StoresInput = () => {
    
    const dropdown_stores = document.getElementById('dropdown-stores-cont')
    const store_name = document.getElementById('store_name')
    const user_name = document.querySelector('#sign_up-form .name_input')
    
    const [store, setStore] = useState(null)


    const handleToggleDropDownStores = () => {
        dropdown_stores.classList.toggle('opened')
    }
    const handleSetStoreName = (e) => {
        // console.log(user_name)
        if (e.target.tagName !== 'UL') {
            store_name.classList.add('selected')
            setStore(e.target.textContent)
            store_name.innerHTML = e.target.textContent
            dropdown_stores.classList.remove('opened')
            user_name.focus()
        }
    }

    return ( 
        <div className='stores_input-cont input-cont cont'>
            {/* <label htmlFor='stores_input'>Точка</label> */}
            {/* <select id='stores_input' tabIndex={3}>
                <option value='' disabled selected>Точка</option>
                <option value='1'>Test 1</option>
                <option value='2'>Test 2</option>
                <option value='3'>Test 3</option>
                <option value='4'>Test 4</option>
                <option value='5'>Test 5</option>
                <option value='6'>Test 6</option>
                <option value='7'>Test 7</option>
                <option value='8'>Test 8</option>
                <option value='9'>Test 9</option>
            </select> */}
            <button 
                type='button'
                id='stores_input'
                className='cont'
                onClick={handleToggleDropDownStores}
                // onBlur={handleToggleDropDownStores}
            >
                <span id='store_name'>Точка</span>
            </button>
                <i className="info-icon fa-solid fa-house-chimney"></i>
            <ul id='dropdown-stores-cont' onClick={handleSetStoreName}>
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
