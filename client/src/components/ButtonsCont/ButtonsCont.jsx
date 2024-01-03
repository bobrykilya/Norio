import { MdInstallDesktop } from "react-icons/md"
import { FaInfo } from "react-icons/fa6"



const ButtonsCont = () => {

    return (
        <div className='buts-cont cont'>
            {/* <button
                id='new-user-but'
                title='Создать заявку на регистрацию нового пользователя'
                className='cont'>
                    <i className="fa-regular fa-address-card"></i>
            </button> */}
            <button 
                title='Создать ярлык на рабочем столе'
                className='pwa-but'
                tabIndex={-1}
                >
                    <MdInstallDesktop className='fa-icon'/>
            </button>
            <button
                title='Описание приложения и инструкция'
                className='info-but'
                tabIndex={-1}
                >
                    <FaInfo className='fa-icon'/>
            </button>
        </div>
    )
}

export default ButtonsCont