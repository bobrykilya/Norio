import React from 'react'
import { APP_TITLE } from "../../../constants"



const AppTitle = () => {
    return ( 
        <div className='app_title-cont'>
            <p className='app_title_name'>{APP_TITLE}</p>
        </div>
    )
}
 
export default AppTitle