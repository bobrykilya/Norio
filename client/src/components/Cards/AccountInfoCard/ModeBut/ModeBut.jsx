import { useState } from 'react'
import { FaSun } from "react-icons/fa6"
import { BsFillMoonStarsFill } from "react-icons/bs"



const ModeBut = () => {

    const [isDarkMode, setIsDarkMode] = useState(false)
    
    const switchMode = () => {
        setIsDarkMode((prev) => !prev)
    }

    return ( 
        <button
            title='Сменить тему'
            className='mode-but cont'
            onClick={switchMode}
        >
            <div className={`icons-section cont ${isDarkMode ? 'dark_mode' : ''}`}>
                <FaSun  className='fa-icon'/>
                <BsFillMoonStarsFill  className='fa-icon dark'/>
            </div>
        </button>
     )
}
 
export default ModeBut