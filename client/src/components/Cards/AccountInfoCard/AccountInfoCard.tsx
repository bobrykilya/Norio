import React, { useContext } from 'react'
import { AuthContext } from '../../../context/Auth-context'



const AccountInfoCard = () => {
    const { handleLogOut } = useContext(AuthContext)
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '')


    return ( 
        <div className='account_info_card-cont card_content-cont cont card'>
            
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