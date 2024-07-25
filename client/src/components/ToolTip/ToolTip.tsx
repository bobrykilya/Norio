import React, { useState, useRef } from 'react'



type AvailableToolTipPosition = 'top' | 'bottom' | 'left' | 'right' | 'top_left' | 'top_right'| 'bottom_left' | 'bottom_right' 

interface ToolTipProps {
    text: string;
    position?: AvailableToolTipPosition;
}
const ToolTip = ({ text, position='top' }: ToolTipProps) => {
    const [isToolTipVisible, setIsToolTipVisible] = useState(false)
    const timer = useRef<number | null>(null)

    const handleEnterMouse = () => {
        // console.log('enter mouse')
        timer.current = setTimeout(() => {
            // console.log('open')
            setIsToolTipVisible(true)
        }, 1300)
    }
    
    const handleLeaveMouse = () => {
        // console.log(timer.current)
        setIsToolTipVisible(false)
        if (timer.current) clearTimeout(timer.current)
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