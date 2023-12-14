



const MainView = () => {
    return ( 
        <div id='main_view-cont' className='cont'>
            <div className='first-column cont'>
                <div className='menu_bar cont card'>
                    <div id='logo-cont' className='cont'>
                        <p>Stroypr<br/>Team</p>
                    </div>
                </div>
                <div className='notifs cont card' >
                    <div className='notif_elem'>
                        <span className='notif_elem-icon'>
                        </span>
                        <div className='notif_elem_info-cont'>
                            <h2>
                                Вход с нового устройcтва
                            </h2>
                            <span className='notif_elem_time-cont'>
                                <p>12:32  19.08.2023</p>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="second-column cont">
                <div className="search_filters_day-cont cont">
                    <div className="search_and_main_filters-cont cont">
                        <div className="search-cont cont card">
                        </div>
                        <div className="main_filter-cont cont card">
                        </div>
                    </div>
                    <div className="date_filter-cont cont card">
                    </div>
                    <div className="day_info-cont cont card">
                    </div>
                </div>
                <div className="tasks cont card">
                </div>
                <div className="new_task_but-cont cont">
                    <button className="card">Новая задача</button>
                    <button className="card">Все задачи</button>
                    <button className="card">Шаблоны задач</button>
                </div>
            </div>
            <div className="third-column cont">
                <div className="account cont card">
                    
                </div>
                <div className="recent_changes cont card">
                    
                </div>
                <div className="recent_messages cont card">
                    
                </div>
            </div>
        </div>
     )
}
 
export default MainView