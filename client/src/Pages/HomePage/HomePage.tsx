import React, { useEffect } from 'react'
import NavBarCard from '../../components/Cards/NavBarCard/NavBarCard'
import NotificationCard from '../../components/Cards/NotificationCard/NotificationCard'
import TaskCard from '../../components/Cards/TaskCard/TaskCard'
import AccountInfoCard from '../../components/Cards/AccountInfoCard/AccountInfoCard'
import { ClassicAnim } from '../../utils/pageTransitions'
import { socket } from '../../context/Auth-context'


type HomePageProps = {
    isUserLogged: boolean;
}
const HomePage = ({ isUserLogged }: HomePageProps) => {


    const { user_id } = JSON.parse(localStorage.getItem('userInfo') || '{}')
    const deviceId = Number(localStorage.getItem('deviceId'))


    useEffect(() => {
        const userJoinEvent = () => socket.emit('join', { userId: user_id, deviceId })

        if (isUserLogged) {
            userJoinEvent()
        }
	}, [isUserLogged])

    return ( 
        <ClassicAnim>
            <div id='main_view-cont' className='cont'>
                <div className='first-column cont'>
                    <NavBarCard />
                    <NotificationCard />
                </div>
                <div className="second-column cont">
                    <div className="search_filters_day-cont cont">
                        <div className="search_and_main_filters-cont cont">
                            <div className="search_card-cont cont card">
                            </div>
                            <div className="main_filter_card-cont cont card">
                            </div>
                        </div>
                        <div className="date_filter_card-cont cont card">
                        </div>
                        <div className="day_info_card-cont cont card">
                        </div>
                    </div>
                    <TaskCard />
                    <div className="new_task_but-cont cont">
                        <button className="card">Новая задача</button>
                        <button className="card">Все задачи</button>
                        <button className="card">Шаблоны задач</button>
                    </div>
                </div>
                <div className="third-column cont">
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