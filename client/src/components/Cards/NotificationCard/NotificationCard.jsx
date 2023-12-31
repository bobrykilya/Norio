import { IoMdNotifications } from "react-icons/io"



const NotificationCard = () => {
    return ( 
        <div className='notification_card-cont cont card'>
            <div className='card_label-cont cont'>
                <IoMdNotifications className='fa-icon'/>
                <span className='label-name'>Уведомления</span>
            </div>
            <div className='card_content-cont cont'>
                <ul className='notif_list-cont cont'>
                    <div className='notif_elem'>
                        <span className='notif_elem-icon'>
                        </span>
                        <div className='notif_elem_info-cont'>
                            <h2>
                                Вход с нового устройcтва
                            </h2>
                            <span className='notif_elem_time-cont'>
                                <p>12:32  19.08.2023</p>
                            </span>
                        </div>
                    </div>
                </ul>
            </div>
        </div>
     )
}
 
export default NotificationCard