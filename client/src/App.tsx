import React from "react"
import { Navigate, Route, Routes, useLocation } from "react-router-dom"
import { Toaster } from 'react-hot-toast'
import { AnimatePresence } from 'framer-motion'
import AuthPage from './pages/AuthPage/AuthPage'
import HomePage from './pages/HomePage/HomePage'
import './App.sass'
import CoverAppTitle from "./components/common/CoverAppTitle/CoverAppTitle"
import { useBlockErrorState } from "./stores/Device-store"
import LogBookList from "./components/others/LogBook/LogBookList"
import { useUserInfoState } from "./stores/Auth-store"



const App = () => {

    const userLoggedState = useUserInfoState(s => s.userInfoState)
    const blockErrorState = useBlockErrorState(s => s.blockErrorState)

    const location = useLocation()

    // window.onbeforeunload = function() {
    //     return 'Нажатие на кнопки перехода по браузеру некорректно работают с такими приложениями'
    // }


    return (
        <div 
            id='main_body-cont'
            className='cont'
        >
            <LogBookList />
            <Toaster reverseOrder={true} />
            <AnimatePresence>
                <Routes
                    location={location}
                    key={location.pathname}
                >
                    <Route path="*" element={<Navigate to={Boolean(userLoggedState) ? "home" : "auth"} />} />
                    {!userLoggedState ? (
                        <Route path="auth" element={
                            <AuthPage blockErrorMessage={blockErrorState} />
                        } />
                    ) : (
                        <Route path="home" element={
                            <HomePage isUserLogged={Boolean(userLoggedState)} location={location}/>
                        } />
                    )}
                </Routes>
            </AnimatePresence>
            <CoverAppTitle block={!!blockErrorState}/>
            <div className="main_bg-gradient bg"></div>
        </div>
    )
}

export default App