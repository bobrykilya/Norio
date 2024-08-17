import React from "react"
import { FaShieldAlt } from "react-icons/fa"
import { AiFillUsb } from "react-icons/ai"
import { FaUserCheck } from "react-icons/fa"
import { GrUpdate } from "react-icons/gr"



const Notification = ({el, timeAgo, timeExact}) => {

    let elem

    switch (el.type) {
        case 'guard':
            elem = {
                icon : <FaShieldAlt className='fa-icon'/>,
                label : 'Безопасность',
                mess : 'Вход с нового устройства'
            }
            break
        case 'certificate':
            elem = {
                icon : <AiFillUsb className='fa-icon'/>,
                label : 'Сертификат',
                mess : 'Кончается сертификат'
            }
            break
        case 'new_user':
            elem = {
                icon : <FaUserCheck className='fa-icon'/>,
                label : 'Новый пользователь',
                mess : 'Заявка на регистрацию'
            }
            break
        case 'system':
            elem = {
                icon : <GrUpdate className='fa-icon'/>,
                label : 'Система',
                mess : 'Произошло обновление!'
            }
            break
    }
    

    return (  
        <li className='notif_elem cont'>
            <h2>
                {elem.label}
            </h2>
            <div className={`notif_elem__info-cont cont ${el.type}`}>
                <div className='notif_elem__ic_and_mess-cont cont'>
                    <span className='notif_elem__icon-cont cont'>{elem.icon}</span>
                    <span className='notif_elem__mess'>{elem.mess}</span>
                </div>
                <button className='notif_elem__but'>Подробнее</button>
            </div>
            <div className='notif_elem__time cont' title={timeExact}>{timeAgo}</div>
        </li>
    )
}
 
export default Notification