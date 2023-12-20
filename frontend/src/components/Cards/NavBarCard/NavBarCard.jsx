import LittleLogoImg from '../../../assets/logos/little_logo.png'
import ButtonsCont from './../../LoginPanel/ButtonsCont/ButtonsCont'
import { AiOutlineHome } from "react-icons/ai"
import { MdOutlineTaskAlt } from "react-icons/md"
import { TbTableShortcut } from "react-icons/tb"
import { TbReportAnalytics } from "react-icons/tb"
import { LuBuilding } from "react-icons/lu"
import { FiSettings } from "react-icons/fi"



const NavBarCard = () => {

    const NAV_BAR_LIST = [
        {
            id: 'home_page',
            icon: <AiOutlineHome className='fa-icon'/>,
            label: 'Главная'
        },
        {
            id: 'tasks_page',
            icon: <MdOutlineTaskAlt className='fa-icon'/>,
            label: 'Задачи'
        },
        {
            id: 'tables_page',
            icon: <TbTableShortcut className='fa-icon'/>,
            label: 'Таблицы'
        },
        {   
            id: 'analytics_page',
            icon: <TbReportAnalytics className='fa-icon'/>,
            label: 'Аналитика'
        },
        {
            id: 'company_page',
            icon: <LuBuilding className='fa-icon'/>,
            label: 'Компания'
        },
        {
            id: 'settings_page',
            icon: <FiSettings className='fa-icon'/>,
            label: 'Настройки'
        },
    ]

    return ( 
        <div className='nav_bar_card-cont cont card'>
            <button className='logo-cont cont'>
                <img src={LittleLogoImg} alt="" className='little_logo-img' />
                <p>Stroypr<br/>Team</p>
            </button>
            <nav className='views_list-cont cont'>
            {
                NAV_BAR_LIST.map((el) => {
                    return (
                        <a className='cont' key={el.id}>
                            <div className='inner-cont cont'>
                                {el.icon}
                                <span className='cont'>{el.label}</span>
                            </div>
                        </a>
                    )
                })
            }   
            </nav>
            <ButtonsCont />
        </div>
     )
}
 
export default NavBarCard