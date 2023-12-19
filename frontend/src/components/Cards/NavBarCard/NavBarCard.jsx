import LittleLogoImg from '../../../assets/logos/little_logo.png'
import ButtonsCont from './../../LoginPanel/ButtonsCont/ButtonsCont';



const NavBarCard = () => {
    return ( 
        <div className='nav_bar_card-cont cont card'>
            <button className='logo-cont cont'>
                <img src={LittleLogoImg} alt="" className='little_logo-img' />
                <p>Stroypr<br/>Team</p>
            </button>
            <ul className='views_list-cont cont'>
                <li className='cont'>
                    <i class="fa-solid fa-house"></i>
                    <label>Главная</label>
                </li>
                <li className='cont'>
                    <i class="fa-solid fa-house"></i>
                    <label>Задачи</label>
                </li>
                <li className='cont'>
                    <i class="fa-solid fa-house"></i>
                    <label>Главная</label>
                </li>
                <li className='cont'>
                    <i class="fa-solid fa-house"></i>
                    <label>Таблицы</label>
                </li>
                <li className='cont'>
                    <i class="fa-solid fa-house"></i>
                    <label>Аналитика</label>
                </li>
                <li className='cont'>
                    <i class="fa-solid fa-house"></i>
                    <label>Сотрудники</label>
                </li>
                <li className='cont'>
                    <i class="fa-solid fa-house"></i>
                    <label>Настройки</label>
                </li>
                <ButtonsCont />
            </ul>
        </div>
     )
}
 
export default NavBarCard