import React, { useContext } from 'react'
import { AuthContext } from '../../../context/Auth-context'
import DateTime from "./DateTime/DateTime"



const AccountInfoCard = () => {
    const { handleLogOut } = useContext(AuthContext)
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '')

    
    return ( 
        <div className='account_info-card cont card'>
            <div
                className={'fast_but-cont'}
            >

            </div>
            <DateTime />
            <button 
                className='account-img'
                onClick={handleLogOut}
            >
                <img src={`/avatars/${userInfo?.avatar}.jpg`} alt='Avatar error 3' />
            </button>
        </div>
     )
}
 
export default AccountInfoCard