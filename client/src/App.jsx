import { useContext } from "react"
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom"
import { AuthContext } from "./context/Auth-context"
// import BgImg from '../src/assets/main_bg.jpg'
// import SnackBar from './components/SnackBar/SnackBar'
import { Toaster } from 'react-hot-toast'
import AuthPage from './pages/AuthPage/AuthPage'
import HomePage from './pages/HomePage/HomePage'
import './App.sass'
import ErrorsLogButton from './components/ErrorsLog/ErrorsLog'



const App = () => {

    const { isUserLogged } = useContext(AuthContext)

    return (
        <div 
            id='main_body-cont' 
            className={`cont ${isUserLogged ? 'active_bg' : ''}`}
        >
            <Toaster reverseOrder={true} />
            <ErrorsLogButton />
            <BrowserRouter>
                <Routes>
                    {isUserLogged ? (
                        <Route path="home" element={
                            <HomePage />
                        } />
                    ) : (
                        <Route path="auth" element={
                            <AuthPage />
                        } />
                    )}
                    <Route path="*" element={<Navigate to={isUserLogged ? "home" : "auth"} />} />
                </Routes>
            </BrowserRouter>
            {/* {!isUserLogged && <img className='main_bg-img' src={BgImg} alt="" />} */}
        </div>
    )
}

export default App