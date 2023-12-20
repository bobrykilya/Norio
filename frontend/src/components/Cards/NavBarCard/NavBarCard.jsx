import LittleLogoImg from '../../../assets/logos/little_logo.png'
import ButtonsCont from './../../LoginPanel/ButtonsCont/ButtonsCont';



const NavBarCard = () => {

    const NAV_BAR_LIST = [
        {
            id: 'home_page',
            icon: 'fa-solid fa-house',
            label: 'Главная'
        },
        {
            id: 'tasks_page',
            icon: 'fa-solid fa-house',
            label: 'Задачи'
        },
        {
            id: 'tables_page',
            icon: 'fa-solid fa-house',
            label: 'Таблицы'
        },
        {   
            id: 'analytics_page',
            icon: 'fa-solid fa-house',
            label: 'Аналитика'
        },
        {
            id: 'company_page',
            icon: 'fa-solid fa-house',
            label: 'Компания'
        },
        {
            id: 'settings_page',
            icon: 'fa-solid fa-house',
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
                        <a className={`cont ${el.id}`}>
                            <i class={el.icon}></i>
                            <label>{el.label}</label>
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