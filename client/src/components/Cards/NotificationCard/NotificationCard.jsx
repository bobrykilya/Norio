// import { useEffect } from 'react';
import { IoMdNotifications } from "react-icons/io"
import Notification from './Notification/Notification';



const NotificationCard = () => {

    const now = new Date().toISOString()
    
    const NOTIFICATIONS_LIST = [
        {
            key: 'guard_1',
            type: 'guard',
            time: '2024-01-03T12:03:17.723Z',
            // label: 'Безопасность',
            other: 'Вход с нового устройcтва',
        },
        {
            key: 'certificate_1',
            type: 'certificate',
            time: '2023-01-02T12:03:17.723Z',
            // mess: 'Заканчивается сертификат',
            other: 'Стройпродукт',
        },
        {
            key: 'new_user_1',
            type: 'new_user',
            time: '2024-01-02T12:03:17.723Z',
            // mess: 'Новый пользователь пытается зар',
        },
    ]
    
    const now_ms = Date.now()
    console.log(now)
    const cutoffs = [60, 3600, 86400, 86400 * 7, 86400 * 30, 86400 * 365, Infinity]
    const units = ['second', 'minute', 'hour', 'day', 'week', 'month', 'year']
    const rtf = new Intl.RelativeTimeFormat('ru', {
        numeric: 'auto',
        style: 'short',
        localeMatcher: 'best fit'
    })

    const timeAgoSinceNotifCounting = (notif_time) => {

        const deltaSeconds = Math.round((notif_time - now_ms) / 1000)
        const unitIndex = cutoffs.findIndex(cutoff => cutoff > Math.abs(deltaSeconds))
        const divisor = unitIndex ? cutoffs[unitIndex - 1] : 1
        // console.log(deltaSeconds)

        return rtf.format(Math.floor(deltaSeconds / divisor), units[unitIndex])
    }


    // useEffect(() => {
        
    // }, []);

    return ( 
        <div className='notification_card-cont cont card'>
            <div className='card_label-cont cont'>
                <IoMdNotifications className='fa-icon'/>
                <span className='label-name'>Уведомления</span>
            </div>
            <div className='card_content-cont cont'>
                <ul className='notif_list-cont cont'>
                    {
                        NOTIFICATIONS_LIST.map((elem) => {

                            const notif_time = new Date(elem.time).getTime()

                            return <Notification 
                                        key={elem.key} 
                                        el={elem} 
                                        timeAgo={timeAgoSinceNotifCounting(notif_time)}
                                    />
                        })
                    }
                </ul>
            </div>
        </div>
     )
}
 
export default NotificationCard