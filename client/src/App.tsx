import React, { useContext } from "react"
import { Routes, Route, Navigate, useLocation } from "react-router-dom"
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
                        <Route path="home" element={<HomePage />} />
                    ) : (
                        <Route path="auth" element={<AuthPage />} />
                    )}
                </Routes>
            </AnimatePresence>
        </div>
    )
}

export default App