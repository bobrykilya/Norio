import React, { useContext } from "react"
import { Navigate, Route, Routes, useLocation } from "react-router-dom"
import { Toaster } from 'react-hot-toast'
import { AnimatePresence } from 'framer-motion'
import { AuthContext } from "./context/Auth-context"
import AuthPage from './pages/AuthPage/AuthPage'
import HomePage from './pages/HomePage/HomePage'
import './App.sass'



const App = () => {

    const { isUserLogged } = useContext(AuthContext)

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
                            <HomePage isUserLogged={isUserLogged} />
                        } />
                    ) : (
                        <Route path="auth" element={
                            <AuthPage />
                        } />
                    )}
                </Routes>
            </AnimatePresence>
            <div className="main_bg-gradient bg"></div>
        </div>
    )
}

export default App