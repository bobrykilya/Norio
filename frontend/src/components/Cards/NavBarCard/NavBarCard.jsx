import LittleLogoImg from '../../../assets/logos/little_logo.png'
import ButtonsCont from './../../ButtonsCont/ButtonsCont'
import { AiOutlineHome } from "react-icons/ai"
import { MdOutlineTaskAlt } from "react-icons/md"
import { TbTableShortcut } from "react-icons/tb"
import { TbReportAnalytics } from "react-icons/tb"
import { LuBuilding } from "react-icons/lu"
import { FiSettings } from "react-icons/fi"



const NavBarCard = () => {

    const NAV_BAR_LIST = [
        {
            key: 'home_page',
            label: 'Главная',
            icon: <AiOutlineHome className='fa-icon'/>,
            link:   '',
        },
        {
            key: 'tasks_page',
            label: 'Задачи',
            icon: <MdOutlineTaskAlt className='fa-icon'/>,
            link:   '',
        },
        {
            key: 'tables_page',
            label: 'Таблицы',
            icon: <TbTableShortcut className='fa-icon'/>,
            link:   '',
        },
        {   
            key: 'analytics_page',
            label: 'Аналитика',
            icon: <TbReportAnalytics className='fa-icon'/>,
            link:   '',
        },
        {
            key: 'company_page',
            label: 'Компания',
            icon: <LuBuilding className='fa-icon'/>,
            link:   '',
        },
        {
            key: 'settings_page',
            label: 'Настройки',
            icon: <FiSettings className='fa-icon'/>,
            link:   '',
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
                        <a className='cont' key={el.key}>
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