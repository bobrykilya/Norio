// import { useEffect } from 'react';
import { IoMdNotifications } from "react-icons/io"
import Notification from './Notification/Notification'



const NotificationCard = () => {

    const now = new Date()
    
    const NOTIFICATIONS_LIST = [
        {
            key: 'guard_1',
            type: 'guard',
            time: 1704295745795,
            other: 'Вход с нового устройcтва',
            link: '',
        },
        {
            key: 'certificate_1',
            type: 'certificate',
            time: 1704295545795,
            other: 'Стройпродукт',
            link: '',
        },
        {
            key: 'new_user_1',
            type: 'new_user',
            time: 1703295745795,
            link: '',
        },
        {
            key: 'system_1',
            type: 'system',
            time: 1703295745795,
            link: '',
        },
        {
            key: 'new_user_2',
            type: 'new_user',
            time: 1703295745795,
            link: '',
        },
    ]
    // console.log(NOTIFICATIONS_LIST)
    
    const now_ms = new Date().getTime()
    // console.log(now_ms)
    const cutoffs = [60, 3600, 86400, 86400 * 7, 86400 * 30, 86400 * 365, Infinity]
    const units = ['second', 'minute', 'hour', 'day', 'week', 'month', 'year']
    const rtf = new Intl.RelativeTimeFormat('ru', {
        numeric: 'always',
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
                        !NOTIFICATIONS_LIST[0] ? 
                        (
                            <div className='no_messages-text cont'>
                                Новых<br/>уведомлений<br/>нет
                            </div>
                         ) : 
                            NOTIFICATIONS_LIST.slice(0, 10).map((elem) => {
                                
                                const notif_time = new Date(elem.time)

                                return <Notification 
                                            key={elem.key} 
                                            el={elem} 
                                            timeAgo={timeAgoSinceNotifCounting(elem.time)}
                                            timeExact={`${notif_time.toLocaleString()}`}
                                        />
                        })
                    }
                </ul>
            </div>
            <div className='notif_list-blackout'></div>
        </div>
     )
}
 
export default NotificationCard