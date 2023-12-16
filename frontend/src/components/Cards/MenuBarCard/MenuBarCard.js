import LittleLogoImg from '../../../assets/logos/little_logo.png'



const MenuBarCard = () => {
    return ( 
        <div className='menu_bar_card-cont cont card'>
            <button className='logo-cont cont'>
                <img src={LittleLogoImg} alt="" className='little_logo-img' />
                <p>Stroypr<br/>Team</p>
            </button>
            <ul className='views_list-cont cont'>
                <li className='cont'>
                    <i class="fa-solid fa-house"></i>
                    <label>Главная</label>
                </li>
            </ul>
        </div>
     )
}
 
export default MenuBarCard