import React, { useContext } from "react"
import { Navigate, Route, Routes, useLocation } from "react-router-dom"
import { Toaster } from 'react-hot-toast'
import { AnimatePresence } from 'framer-motion'
import { AuthContext } from "./context/Auth-context"
import AuthPage from './pages/AuthPage/AuthPage'
import HomePage from './pages/HomePage/HomePage'
import './App.sass'
import CoverAppTitle from "./components/common/CoverAppTitle/CoverAppTitle"
import { useBlockError } from "./stores/Device-store"



const App = () => {

    const { isUserLogged } = useContext(AuthContext)
    const blockErrorMessage = useBlockError(s => s.blockErrorMessage)

    const location = useLocation()

    return (
        <div 
            id='main_body-cont'
            className='cont'
        >
            <Toaster reverseOrder={true} />
            <AnimatePresence>
                <Routes
                    location={location}
                    key={location.pathname}
                >
                    <Route path="*" element={<Navigate to={isUserLogged ? "home" : "auth"} />} />
                    {isUserLogged ? (
                        <Route path="home" element={
                            <HomePage isUserLogged={isUserLogged} location={location}/>
                        } />
                    ) : (
                        <Route path="auth" element={
                            <AuthPage blockErrorMessage={blockErrorMessage} />
                        } />
                    )}
                </Routes>
            </AnimatePresence>
            <CoverAppTitle block={!!blockErrorMessage}/>
            <div className="main_bg-gradient bg"></div>
        </div>
    )
}

export default App