import { useState, useRef } from 'react'
// import { FaHouseChimneyUser } from "react-icons/fa6"
import { HiOutlineHome } from "react-icons/hi"
import { useClickOutside } from "../../../../Hooks/useClickOutside"
import InputsError from '../InputsError/InputsError'
import InputsCleaner from '../InputsCleaner/InputsCleaner'



const StoresInput = ({ store, setStore, onFocusInput, error=null, setStoreError }) => {

    // console.log(error)
    const [isDropDownOpened, setIsDropDownOpened] = useState(false)
    const [isCleanerOpened, setIsCleanerOpened] = useState(false)

    const dropDownRef = useRef(null)
    const dropDownButtonRef = useRef(null)

    const STORES_LIST = [
        {
            id: '1',
            title: 'Офис'
        },
        {
            id: '2',
            title: 'Красное'
        },
        {
            id: '3',
            title: 'Полоцк'
        },
        {
            id: '4',
            title: 'БелМаш'
        },
        {
            id: '5',
            title: 'Тюрли'
        },
        {
            id: '6',
            title: 'Глубокое'
        },
        {
            id: '7',
            title: 'Радошковичи'
        },
        {
            id: '8',
            title: 'Спутник'
        },
        {
            id: '9',
            text: 'Либава'
        },
    ]

    const handleSetStoreName = (e) => {
        if (e.target.tagName === 'LI') {
            // console.log(e.target.textContent)
            setStore(e.target.textContent)
            setIsDropDownOpened(false)
            setIsCleanerOpened(true)
            setStoreError(null)
            onFocusInput()
        }
    }
    
    useClickOutside(dropDownRef, () => {
        setIsDropDownOpened(false)
    }, dropDownButtonRef)

    const clearInput = () => {
        setStore('Точка')
        setIsCleanerOpened(false)
    }

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
            <HiOutlineHome className='input-icon'/>
            <InputsError error={error} />
            <InputsCleaner opened={isCleanerOpened} onClick={clearInput} />
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
                            <li key={el.id}>{el.title}</li>
                        )
                    })
                }
            </ul>
        </div>
     )
}
 
export default StoresInput
