import React from 'react'
// import LittleLogoImg from '../../../assets/logos/little_logo.png'
import ButtonsCont from '../../ButtonsCont/ButtonsCont'
import AppTitle from '../../common/AppTitle/AppTitle'
import { NAV_BAR_LIST } from '../../../assets/common/Common-data'
import Card from "../../common/Card/Card"



const NavBar = () => {



    return (
        <Card
            className='nav_bar-cont'
        >
            <button
                className='logo-cont cont'
                // title='Улыбнись, заяц)'
            >

                <AppTitle />
            </button>
            <Card
                className='nav_bar'
            >
                <div className=' cont'>
                    <nav className='views_list-cont cont'>
                    {
                        NAV_BAR_LIST.map((el) => {
                            return (
                                <a className='cont' key={el.id}>
                                    <div className='nav_bar__inner-cont cont'>
                                        {el.icon}
                                        {/*<span className='cont'>{el.label}</span>*/}
                                    </div>
                                </a>
                            )
                        })
                    }
                    </nav>
                    <ButtonsCont />
                </div>
            </Card>
        </Card>
     )
}
 
export default NavBar