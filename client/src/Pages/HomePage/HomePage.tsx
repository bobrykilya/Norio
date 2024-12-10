import React, { useEffect } from 'react'
import NavBar from '../../components/others/NavBar/NavBar'
import AccountInfoCard from '../../components/others/AccountInfoCard/AccountInfoCard'
import { ClassicAnim } from '../../utils/pageTransitions'
import { socket } from '../../context/Auth-context'
import TaskCard from "../../components/_HomePage/TaskCard/TaskCard"
import WeatherCard from "../../components/_HomePage/WeatherCard/WeatherCard"
import { useUserInfo } from "../../stores/Auth-store"
import { IDeviceInfo } from "../../types/Auth-types"
import { STORES_LIST } from "../../assets/AuthPage/AuthPage-data"



type HomePageProps = {
    isUserLogged: boolean;
    location: {
        pathname: string;
    };
}
const HomePage = ({ isUserLogged, location }: HomePageProps) => {

    const { userInfoState } = useUserInfo()
    const lsDeviceInfo: IDeviceInfo = JSON.parse(localStorage.getItem('deviceInfo'))


    useEffect(() => {

        const userJoinEvent = () => socket.emit('join', { userId: userInfoState?.userId, deviceId: lsDeviceInfo?.id })

        if (isUserLogged) {
            userJoinEvent()
        }

        if (!lsDeviceInfo?.city) {
            let city: string
            if (lsDeviceInfo.type !== 'Desktop') {
                city = 'myLocation'
            } else {
                city = STORES_LIST.find(el => el.title === userInfoState?.store).city
            }
            localStorage.setItem('deviceInfo', JSON.stringify({ ...lsDeviceInfo, city }))
        }

	}, [isUserLogged])

    return ( 
        <ClassicAnim>
            <div id='main_view-cont' className='cont'>
                <NavBar location={location} />
                <div className="center-column cont">
                    <div className="center_column-header cont">
                        <div className="search_and_task_filters-cont cont">
                            <div className="search-card cont card">
                            </div>
                            <div className="task_filters-card cont card">
                            </div>
                        </div>
                        <div className="calendar-card cont card">
                        </div>
                        <WeatherCard lsDeviceInfo={lsDeviceInfo} />
                    </div>
                    <div
                        className={'task_and_note_cards-cont cont'}
                    >
                        <TaskCard />
                        <div
                            className={'note-card cont card'}
                        >

                        </div>
                    </div>

                </div>
                <div className="right-column cont">
                    <AccountInfoCard />
                    <div className="recent_changes_card-cont cont card">
            
                    </div>
                    <div className="recent_messages_card-cont cont card">
            
                    </div>
                </div>
            </div>
        </ClassicAnim>
     )
}
 
export default HomePage