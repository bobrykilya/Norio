import React from 'react'
import DateTime from "./DateTime/DateTime"
import FastRoundButton from "../../common/Buttons/FastRoundButton/FastRoundButton"
import UserCard from "./UserCard/UserCard"
import { ICONS } from "../../../assets/common/Icons-data"



const AccountInfoCard = () => {


    return ( 
        <div className='account_info-card cont card'>
            <FastRoundButton
                onClick={() => {}}
                toolTip={{
                    message: 'Уведомления',
                    position: 'bottom',
                }}
                size={'big'}
                notif={12}
            >
                {ICONS.notification}
            </FastRoundButton>
            <FastRoundButton
                onClick={() => {}}
                toolTip={{
                    message: 'Реквизиты организации',
                    position: 'bottom',
                }}
                size={'big'}
            >
                {ICONS.document}
            </FastRoundButton>
            <DateTime />
            <UserCard />
        </div>
     )
}
 
export default AccountInfoCard