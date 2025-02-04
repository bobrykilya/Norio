import React, { useRef, useState } from 'react'
import AppTitle from '../../common/AppTitle/AppTitle'
import { NAV_BAR_LIST } from '../../../assets/common/Common-data'
import LogBookButton from "../JumpingCards/LogBookCard/LogBookButton"
import { TbInfoSquareRoundedFilled } from "react-icons/tb"
import SettingsButton from "../JumpingCards/SettingsCard/SettingsButton"
import { TOOLTIP_DELAY_TIME } from "../../../../constants"
// @ts-ignore
import appIcon from '../../../assets/common/logos/app_icon.png'
import RoundButton from "../../common/Buttons/RoundButton/RoundButton"



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
                    NAV_BAR_LIST.map(el => {
                        return (
                            <RoundButton
                                key={el.id}
                                onClick={() => {}}
                                className={`clear-but ${el.id === curr_path ? 'selected' : ''}`}
                                toolTip={{
                                    text: el.title,
                                    position: 'right',
                                    isAlwaysToolTip: true
                                }}
                                size={'big'}
                            >
                                {el.icon}
                            </RoundButton>
                        )
                    })
                }
            </nav>
            <div
                className={'nav_bar-footer cont'}
            >
                <LogBookButton
                    delayTimeMS={toolTipDelayTimeMS}
                />
                <RoundButton
                    onClick={() => {}}
                    className={'info-but before_hover-but'}
                    toolTip={{
                        text: 'Описание приложения и инструкция',
                        position: 'right',
                        delayTimeMS: toolTipDelayTimeMS
                    }}
                >
                    <TbInfoSquareRoundedFilled className='fa-icon' />
                </RoundButton>
                <SettingsButton
                    delayTimeMS={toolTipDelayTimeMS}
                />
            </div>
        </div>
     )
}
 
export default NavBar