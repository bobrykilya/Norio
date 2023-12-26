import { useState, useRef, useEffect } from 'react'
import { FaHouseChimneyUser } from "react-icons/fa6"
import { useClickOutside } from "../../../Hooks/useClickOutside"



const StoresInput = () => {
    
    //! const user_name = document.querySelector('#sign_up-form .name_input')
    
    const [store, setStore] = useState('Точка')
    const [isDropDownOpened, setIsDropDownOpened] = useState(false)
    const dropDownRef = useRef(null)
    const dropDownButtonRef = useRef(null)

    const handleSetStoreName = (e) => {
        // console.log(user_name)
        if (e.target.tagName !== 'UL') {
            setStore(e.target.textContent)
            setIsDropDownOpened(false)
            //! user_name.focus()
        }
    }
    
    useClickOutside(dropDownRef, dropDownButtonRef, isDropDownOpened, () => {
        setIsDropDownOpened(setIsDropDownOpened(false))
    })
    // useEffect(() => {
    // }, [isDropDownOpened])

    return ( 
        <div className="stores_input-cont input-cont cont">
            <button 
                type='button'
                id='stores_input'
                className='cont'
                onClick={() => {setIsDropDownOpened(!isDropDownOpened)}}
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
