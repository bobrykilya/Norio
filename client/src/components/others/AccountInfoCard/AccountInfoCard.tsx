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
                onClick={() => {}}
                toolTip={{
                    text: 'Уведомления',
                    position: 'bottom',
                }}
                size={'big'}
                notif={12}
            >
                <IoNotificationsSharp className={'fa-icon'} />
            </FastRoundButton>
            <FastRoundButton
                onClick={() => {}}
                toolTip={{
                    text: 'Реквизиты',
                    position: 'bottom',
                }}
                size={'big'}
            >
                <HiDocumentText className={'fa-icon'} />
            </FastRoundButton>
            <DateTime />
            <UserCard />
        </div>
     )
}
 
export default AccountInfoCard