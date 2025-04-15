import React from 'react'
import ToolTip from '../../others/ToolTip/ToolTip'



const NameTag = () => { 

    return (  
        <h3 className='name_tag'>
            bobrykilya
            <ToolTip message="Бобрик Илья Юрьевич" />
        </h3>
    )
}
 
export default NameTag