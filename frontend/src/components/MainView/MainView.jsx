import MenuBarCard from '../Cards/MenuBarCard/MenuBarCard.jsx'
import NotificationCard from '../Cards/NotificationCard/NotificationCard.jsx'



const MainView = () => {
    return ( 
        <div id='main_view-cont' className='cont'>
            <div className='first-column cont'>
                <MenuBarCard />
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
                <div className="task_card-cont cont card">
                </div>
                <div className="new_task_but-cont cont">
                    <button className="card">Новая задача</button>
                    <button className="card">Все задачи</button>
                    <button className="card">Шаблоны задач</button>
                </div>
            </div>
            <div className="third-column cont">
                <div className="account_info_card-cont cont card">
                    
                </div>
                <div className="recent_changes_card-cont cont card">
                    
                </div>
                <div className="recent_messages_card-cont cont card">
                    
                </div>
            </div>
        </div>
     )
}
 
export default MainView