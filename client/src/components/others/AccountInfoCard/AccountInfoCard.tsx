import React, { useEffect, useState } from 'react'
import DateTime from "./DateTime/DateTime"
import FastRoundButton from "../../common/Buttons/FastRoundButton/FastRoundButton"
import UserCard from "./UserCard/UserCard"
import { ICONS } from "../../../assets/common/Icons-data"
import { useJwtInfoListState } from "../../../stores/Auth-store"
import { useUserInfoState } from "../../../stores/User-store"



const AccountInfoCard = () => {

    const { userInfoState } = useUserInfoState()
    const getJwtInfoState = useJwtInfoListState(s => s.getJwtInfoState)
    const [fastSessionState, setFastSessionState] = useState(false)

    useEffect(() => {
        setFastSessionState(getJwtInfoState(userInfoState.userId).isFast)
    }, [])

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
            <UserCard
                fastSessionState={fastSessionState}
            />
            {
                fastSessionState &&
                <span
                    className={`fast_session_bg-icon`}
                >
					{ICONS.flash}
				</span>
            }
        </div>
     )
}
 
export default AccountInfoCard