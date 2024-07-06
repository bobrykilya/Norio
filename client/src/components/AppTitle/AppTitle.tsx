import React from 'react'
import ToolTip from './../ToolTip/ToolTip'



const AppTitle = () => {
    return ( 
        <div className='app_title-cont'>
            <p className='app_title_name'>NORIO</p>
            {/* <p className='app_title_version'>1.0</p> */}
            <ToolTip text='Version 1.0' position='bottom_right' />
        </div>
    )
}
 
export default AppTitle