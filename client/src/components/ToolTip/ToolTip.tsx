import React, { useState, useRef, MutableRefObject } from 'react'



type AvailableToolTipPosition = 'top' | 'bottom' | 'left' | 'right' | 'top_left' | 'top_right'| 'bottom_left' | 'bottom_right' 

interface ToolTipProps {
    text: string;
    position?: AvailableToolTipPosition;
}
const ToolTip = ({ text, position='top' }: ToolTipProps) => {
    const [isToolTipVisible, setIsToolTipVisible] = useState(false)
    const refSetTimeout = useRef<ReturnType<typeof setTimeout>>(null) as MutableRefObject<ReturnType<typeof setTimeout>>

    const handleEnterMouse = () => {
        refSetTimeout.current = setTimeout(() => {
            setIsToolTipVisible(true)
        }, 1300)
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
            <div className={`tool_tip ${isToolTipVisible ? 'active' : ''} ${position}`} >{text}</div>
        </div>
     )
}
 
export default ToolTip