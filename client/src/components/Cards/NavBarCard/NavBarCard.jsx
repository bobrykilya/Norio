import LittleLogoImg from '../../../assets/logos/little_logo.png'
import ButtonsCont from './../../ButtonsCont/ButtonsCont'
import { AiOutlineHome } from "react-icons/ai"
import { MdOutlineTaskAlt } from "react-icons/md"
import { IoCalendarNumberOutline } from "react-icons/io5"
import { AiOutlineFileSearch } from "react-icons/ai";
import { TbTableShortcut } from "react-icons/tb"
import { TbReportAnalytics } from "react-icons/tb"
import { LuBuilding } from "react-icons/lu"
import { FiSettings } from "react-icons/fi"



const NavBarCard = () => {

    const NAV_BAR_LIST = [
        {
            id: 'home_page',
            label: 'Главная',
            icon: <AiOutlineHome className='fa-icon'/>,
            link:   '',
        },
        {
            id: 'tasks_page',
            label: 'Задачи',
            icon: <MdOutlineTaskAlt className='fa-icon'/>,
            link:   '',
        },
        {
            id: 'calendar_page',
            label: 'Календарь',
            icon: <IoCalendarNumberOutline className='fa-icon'/>,
            link:   '',
        },
        {
            id: 'reporting_page',
            label: 'Отчётность',
            icon: <AiOutlineFileSearch className='fa-icon'/>,
            link:   '',
        },
        {
            id: 'tables_page',
            label: 'Таблицы',
            icon: <TbTableShortcut className='fa-icon'/>,
            link:   '',
        },
        {   
            id: 'analytics_page',
            label: 'Аналитика',
            icon: <TbReportAnalytics className='fa-icon'/>,
            link:   '',
        },
        {
            id: 'company_page',
            label: 'Компания',
            icon: <LuBuilding className='fa-icon'/>,
            link:   '',
        },
        {
            id: 'settings_page',
            label: 'Настройки',
            icon: <FiSettings className='fa-icon'/>,
            link:   '',
        },
    ]

    return ( 
        <div className='nav_bar_card-cont cont card'>
            <button 
                className='logo-cont card_label-cont cont'
                title='Улыбнись, заяц)'
            >
                <img src={LittleLogoImg} alt="" className='little_logo-img' />
                <p className='little_logo-name'>Stroypr<br/>Team</p>
            </button>
            <div className='card_content-cont cont'>
                <nav className='views_list-cont cont'>
                {
                    NAV_BAR_LIST.map((el) => {
                        return (
                            <a className='cont' key={el.id}>
                                <div className='nav_bar__inner-cont cont'>
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
        </div>
     )
}
 
export default NavBarCard