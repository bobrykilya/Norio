import React, { useRef, useState } from 'react'



export type AvailableToolTipPositions = 'top' | 'bottom' | 'left' | 'right' | 'top_left' | 'top_right'| 'bottom_left' | 'bottom_right'

type ToolTipProps = {
    text: string;
    position?: AvailableToolTipPositions;
    timeMS?: number;
}
const ToolTip = ({ text, position='top', timeMS }: ToolTipProps) => {
    const [isToolTipVisible, setIsToolTipVisible] = useState(false)
    const timer = useRef<number | null>(null)

    const handleEnterMouse = () => {
        // console.log('enter mouse')
        timer.current = window.setTimeout(() => {
            // console.log('open')
            setIsToolTipVisible(true)
        }, timeMS || 1300)
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