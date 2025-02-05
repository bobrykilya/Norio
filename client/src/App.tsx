import React from "react"
import { Navigate, Route, Routes, useLocation } from "react-router-dom"
import { Toaster } from 'react-hot-toast'
import { AnimatePresence } from 'framer-motion'
import AuthPage from './pages/AuthPage/AuthPage'
import HomePage from './pages/HomePage/HomePage'
import './App.sass'
import CoverAppTitle from "./components/common/CoverAppTitle/CoverAppTitle"
import { useBlockErrorState } from "./stores/Device-store"
import LogBookCard from "./components/others/JumpingCards/LogBookCard/LogBookCard"
import { useUserInfoState } from "./stores/Auth-store"
import TopCard from "./components/others/JumpingCards/TopCard/TopCard"



const App = () => {

    const userLoggedState = useUserInfoState(s => s.userInfoState)
    const blockErrorState = useBlockErrorState(s => s.blockErrorState)

    const location = useLocation()

    
    return (
        <div 
            id='main_body-cont'
            className='cont'
        >
            <LogBookCard />
            <TopCard />
            <Toaster reverseOrder={true} />
            <AnimatePresence>
                <Routes
                    location={location}
                    key={location.pathname}
                >
                    <Route path="*" element={<Navigate to={Boolean(userLoggedState) ? "home" : "auth"} />} />
                    {!userLoggedState ?
                        <Route path="auth" element={
                            <AuthPage blockErrorMessage={blockErrorState} />
                        } />
                        :
                        <Route path="home" element={
                            <HomePage isUserLogged={Boolean(userLoggedState)} location={location}/>
                        } />
                    }
                </Routes>
            </AnimatePresence>
            <CoverAppTitle block={!!blockErrorState} />
            <div className="main_bg-gradient bg" />
        </div>
    )
}

export default App