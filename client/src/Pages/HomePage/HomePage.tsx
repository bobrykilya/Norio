import React, { useEffect } from 'react'
import NavBar from '../../components/others/NavBar/NavBar'
import AccountInfoCard from '../../components/others/AccountInfoCard/AccountInfoCard'
import { ClassicAnim } from '../../utils/pageTransitions'
import { socket } from '../../context/Auth-context'
import TaskCard from "../../components/_HomePage/TaskCard/TaskCard"
import { useUserInfo } from "../../stores/Auth-store"
import { STORES_LIST } from "../../assets/AuthPage/AuthPage-data"
import { useDeviceInfoState } from "../../stores/Device-store"
import { LOCATIONS_LIST } from "../../assets/common/Common-data"
import { IDeviceLocation } from "../../../../common/types/Device-types"
import WeatherCard from "../../components/_HomePage/WeatherCard/WeatherCard"
import HoroscopeCard from "../../components/_HomePage/HoroscopeCard/HoroscopeCard"
import { handleLocationCoords } from "../../services/Device-service"



type HomePageProps = {
    isUserLogged: boolean;
    location: {
        pathname: string;
    };
}
const HomePage = ({ isUserLogged, location }: HomePageProps) => {

    const { userInfoState } = useUserInfo()
    const { deviceInfoState, setDeviceLocationState } = useDeviceInfoState()

    useEffect(() => {

        const userJoinEvent = () => socket.emit('join', { userId: userInfoState?.userId, deviceId: deviceInfoState?.id })

        if (isUserLogged) {
            userJoinEvent()
        }

        if (!deviceInfoState?.location) {
            let location: IDeviceLocation

            if (deviceInfoState?.type !== 'Desktop') {
                location = {
                    city: {
                        id: 'myLocation',
                        title: ''
                    }
                }
            } else {
                const cityId = STORES_LIST.find(el => el.title === userInfoState?.store).cityId
                location = LOCATIONS_LIST.find(el => el.city.id === cityId)
            }
            setDeviceLocationState(handleLocationCoords(location))
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
                        <WeatherCard />
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
                    <HoroscopeCard />
                </div>
            </div>
        </ClassicAnim>
     )
}
 
export default HomePage