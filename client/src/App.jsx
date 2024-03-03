import { useContext } from "react"
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom"
import { SnackbarProvider } from "notistack"
import { AuthContext } from "./context/AuthContext"
import BgImg from '../src/assets/main_bg.jpg'
import LoginPage from './pages/LoginPage/LoginPage'
import HomePage from './pages/HomePage/HomePage'
import './App.sass'



const App = () => {

    const { isUserLogged } = useContext(AuthContext)

    return (
        <div id='main_body-cont' className={`cont ${isUserLogged ? 'active_bg' : ''}`}>
            <SnackbarProvider />
            <BrowserRouter>
                <Routes>
                    {isUserLogged ? (
                        <Route path="home" element={<HomePage />} />
                    ) : (
                        <Route path="login" element={<LoginPage />} />
                    )}
                    <Route path="*" element={<Navigate to={isUserLogged ? "home" : "login"} />} />
                </Routes>
            </BrowserRouter>
            {!isUserLogged && <img className='main_bg-img' src={BgImg} alt="" />}
        </div>
    )
}

export default App