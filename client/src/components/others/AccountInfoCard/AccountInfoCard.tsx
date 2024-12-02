import React, { useContext } from 'react'
import { AuthContext } from '../../../context/Auth-context'
import DateTime from "./DateTime/DateTime"
import FastRoundButton from "../../common/Buttons/FastRoundButton/FastRoundButton"
import { HiDocumentText } from "react-icons/hi2"
import { IoNotificationsSharp } from "react-icons/io5"
import { useUserInfo } from "../../../stores/Auth-store"



const AccountInfoCard = () => {
    const { handleLogOut } = useContext(AuthContext)
    // const userInfo = JSON.parse(localStorage.getItem('userInfo') || '')
    const { userInfoState } = useUserInfo()


    return ( 
        <div className='account_info-card cont card'>
            <FastRoundButton
                icon={
                    <IoNotificationsSharp className={'fa-icon'} />
                }
                toolTip={{
                    text: 'Уведомления',
                    position: 'bottom',
                }}
                notif={12}
            />
            <FastRoundButton
                icon={
                    <HiDocumentText className={'fa-icon'} />
                }
                toolTip={{
                    text: 'Реквизиты',
                    position: 'bottom',
                }}
            />
            <DateTime />
            <button 
                className='account-img'
                onClick={handleLogOut}
            >
                <img src={`/avatars/${userInfoState?.avatar}.jpg`} alt='Avatar error 3' />
            </button>
        </div>
     )
}
 
export default AccountInfoCard