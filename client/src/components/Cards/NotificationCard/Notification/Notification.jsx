import { FaShieldAlt } from "react-icons/fa";
import { GiUsbKey } from "react-icons/gi";
import { FaRegIdCard } from "react-icons/fa";



const Notification = ({el, timeAgo}) => {

    let icon, label, mess

    switch (el.type) {
        case 'guard':
            icon = <FaShieldAlt className='fa-icon'/>
            label = 'Безопасность'
            mess = 'Вход с нового устройства'
            break;
        case 'certificate':
            icon = <GiUsbKey className='fa-icon'/>
            label = 'Сертификат'
            mess = 'Заявка на регистрацию'
            break;
        case 'new_user':
            icon = <FaRegIdCard className='fa-icon'/>
            label = 'Новый пользователь'
            mess = 'Заявка на регистрацию'
            break;
    }
    

    return (  
        <li className='notif_elem'>
            {icon}
            <div className='notif_elem_info-cont'>
                <h2>
                    {label}
                </h2>
                <span className='notif_elem_time-cont'>
                    {mess}
                    <p>{timeAgo}</p>
                </span>
            </div>
            <button>Подробнее</button>
        </li>
    );
}
 
export default Notification;