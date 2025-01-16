import React, { useRef, useState } from 'react'
import AppTitle from '../../common/AppTitle/AppTitle'
import { NAV_BAR_LIST } from '../../../assets/common/Common-data'
// @ts-ignore
import appIcon from '../../../assets/common/logos/app_icon.png'
import LogBookButton from "../LogBook/LogBookButton"
import RoundButton from "../../common/Buttons/RoundButton/RoundButton"
import ToolTip from "../ToolTip/ToolTip"
import { TbInfoSquareRoundedFilled } from "react-icons/tb"
import SettingsButton from "../SettingsButton/SettingsButton"
import { TOOLTIP_DELAY_TIME } from "../../../../constants"



type NavBarProps = {
    location: {
        pathname: string;
    };
}
const NavBar = ({ location }: NavBarProps) => {
    const curr_path = location.pathname.split('/')[1]
    // console.log(curr_path)

    const [toolTipDelayTimeMS, setToolTipDelayTimeMS] = useState(TOOLTIP_DELAY_TIME)
    const timer = useRef<number | null>(null)

    const handleEnterMouse = () => {
        timer.current = window.setTimeout(() => {
            setToolTipDelayTimeMS(100)
        }, TOOLTIP_DELAY_TIME)
    }

    const handleLeaveMouse = () => {
        setToolTipDelayTimeMS(TOOLTIP_DELAY_TIME)
        if (timer.current) {
            clearTimeout(timer.current)
        }
    }

    return (
        <div
            className='nav_bar-card cont'
            onMouseEnter={handleEnterMouse}
            onMouseLeave={handleLeaveMouse}
        >
            <button
                className='logo-cont cont'
                tabIndex={-1}
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
                            <a className={`cont ${el.id === curr_path ? 'selected' : ''}`} key={el.id}>
                                {el.icon}
                                <ToolTip
                                    text={el.title}
                                    position={'right'}
                                    delayTimeMS={toolTipDelayTimeMS}
                                    isAlwaysToolTip={true}
                                />
                            </a>
                        )
                    })
                }
            </nav>
            <div
                className={'nav_bar-footer cont'}
            >
                <LogBookButton delayTimeMS={toolTipDelayTimeMS} />
                <RoundButton
                    onClick={() => {}}
                    className={'info-button'}
                >
                    <TbInfoSquareRoundedFilled className='fa-icon'/>
                    <ToolTip
                        text='Описание приложения и инструкция'
                        position={'right'}
                        delayTimeMS={toolTipDelayTimeMS}
                    />
                </RoundButton>
                <SettingsButton delayTimeMS={toolTipDelayTimeMS} />
            </div>
        </div>
     )
}
 
export default NavBar