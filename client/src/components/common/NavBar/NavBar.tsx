import React from 'react'
import AppTitle from '../AppTitle/AppTitle'
import { NAV_BAR_LIST } from '../../../assets/common/Common-data'
// @ts-ignore
import appIcon from '../../../assets/common/logos/app_icon.png'
import LogBookButton from "../../others/LogBook/LogBookButton"



const NavBar = () => {
    const c_path = document.location.pathname.split('/')[1]
    // console.log(c_path)

    return (
        <div
            className='nav_bar-card cont'
        >
            <button
                className='logo-cont cont'
                // title='Улыбнись, заяц)'
            >
                <img className="app_icon-img" src={appIcon} alt="*" />
                <AppTitle />
            </button>
            <nav
                className='nav_bar-cont cont card'
            >
                {
                    NAV_BAR_LIST.map((el) => {
                        return (
                            <a className={`cont ${el.id === c_path ? 'selected' : ''}`} key={el.id}>
                                {el.icon}
                            </a>
                        )
                    })
                }
            </nav>
            <div
                className={'nav_bar-footer cont'}
            >
                <LogBookButton />
            </div>
        </div>
     )
}
 
export default NavBar