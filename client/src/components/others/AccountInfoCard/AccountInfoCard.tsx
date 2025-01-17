import React from 'react'
import DateTime from "./DateTime/DateTime"
import FastRoundButton from "../../common/Buttons/FastRoundButton/FastRoundButton"
import { HiDocumentText } from "react-icons/hi2"
import { IoNotificationsSharp } from "react-icons/io5"
import UserCard from "./UserCard/UserCard"



const AccountInfoCard = () => {


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
            <UserCard />
        </div>
     )
}
 
export default AccountInfoCard