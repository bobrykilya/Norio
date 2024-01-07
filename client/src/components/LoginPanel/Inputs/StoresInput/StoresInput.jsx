import { useState, useRef, useEffect } from 'react'
import { FaHouseChimneyUser } from "react-icons/fa6"
import { useClickOutside } from "../../../Hooks/useClickOutside"



const StoresInput = ({store, setStore}) => {
    
    //! const user_name = document.querySelector('#sign_up-form .name_input')
    
    const [isDropDownOpened, setIsDropDownOpened] = useState(false)
    const dropDownRef = useRef(null)
    const dropDownButtonRef = useRef(null)
    const STORES_LIST = [
        {
            key: 'office',
            text: 'Офис'
        },
        {
            key: 'krasnoe',
            text: 'Красное'
        },
        {
            key: 'polock',
            text: 'Полоцк'
        },
        {
            key: 'belmash',
            text: 'БелМаш'
        },
        {
            key: 'turly',
            text: 'Тюрли'
        },
        {
            key: 'glubokoe',
            text: 'Глубокое'
        },
        {
            key: 'radoshk',
            text: 'Радошковичи'
        },
        {
            key: 'sputnik',
            text: 'Спутник'
        },
        {
            key: 'libava',
            text: 'Либава'
        },
    ]

    const handleSetStoreName = (e) => {
        if (e.target.tagName === 'LI') {
            // console.log(e.target.textContent)
            setStore(e.target.textContent)
            setIsDropDownOpened(false)
            //! user_name.focus()
        }
    }
    
    useClickOutside(dropDownRef, dropDownButtonRef, () => {
        setIsDropDownOpened(setIsDropDownOpened(false))
    })

    return ( 
        <div className="stores_input-cont input-cont cont">
            <button 
                type='button'
                id='stores_input'
                className='cont'
                onClick={() => {setIsDropDownOpened((prev) => !prev)}}
                ref={dropDownButtonRef}
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
                id='dropdown_stores-cont'
                className={isDropDownOpened ? 'opened' : ''}
                onClick={handleSetStoreName}
                ref={dropDownRef}
            >
                {
                    STORES_LIST.map((el) => {
                        // console.log(el)
                        return (
                            <li key={el.key}>{el.text}</li>
                        )
                    })
                }
            </ul>
        </div>
     )
}
 
export default StoresInput
