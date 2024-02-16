import { useState, useRef } from 'react'



const ToolTip = ({ text }) => {
    const refSetTimeout = useRef(null)
    const [isToolTipVisible, setIsToolTipVisible] = useState(false)

    const handleEnterMouse = () => {
        refSetTimeout.current = setTimeout(() => {
            setIsToolTipVisible(true)
        }, 1100)
      }
    
      const handleLeaveMouse = () => {
        clearTimeout(refSetTimeout.current)
        setIsToolTipVisible(false)
      }

    return ( 
        <div 
            className='tool_tip-cont'
            onMouseEnter={handleEnterMouse}
            onMouseLeave={handleLeaveMouse}
        >
            <div className={`tool_tip ${isToolTipVisible ? 'active' : ''}`} >{text}</div>
        </div>
     )
}
 
export default ToolTip