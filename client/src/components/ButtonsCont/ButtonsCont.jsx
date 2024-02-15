import { MdInstallDesktop } from "react-icons/md"
import { FaInfo } from "react-icons/fa6"
import ToolTip from '../ToolTip/ToolTip'



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
                    className='pwa-but cont'
                    tabIndex={-1}
                    >
                        <MdInstallDesktop className='fa-icon'/>
                        <ToolTip text={'Создать ярлык на рабочем столе'} />
                </button>
                <button
                    className='info-but cont'
                    tabIndex={-1}
                    >
                        <FaInfo className='fa-icon'/>
                        <ToolTip text={'Описание приложения и инструкция'} />
                </button>
        </div>
    )
}

export default ButtonsCont