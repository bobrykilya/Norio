import NavBarCard from '../../Cards/NavBarCard/NavBarCard.jsx'
import NotificationCard from '../../Cards/NotificationCard/NotificationCard.jsx'
import TaskCard from '../../Cards/TaskCard/TaskCard.jsx'
import AccountInfoCard from '../../Cards/AccountInfoCard/AccountInfoCard.jsx'



const HomePage = () => {
    return ( 
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
     )
}
 
export default HomePage