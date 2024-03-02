import { useContext } from "react"
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom"
import { SnackbarProvider } from "notistack"
import { AuthContext } from "./context/AuthContext"
// import background from '../public/background.jpg'
import LoginPage from './pages/LoginPage/LoginPage'
import HomePage from './pages/HomePage/HomePage'
import './App.sass'



const App = () => {

    const { isUserLogged } = useContext(AuthContext)

    return (
        <div id='main_body-cont' className="cont">
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
            {/* <img className='background-img' src={background} alt="" /> */}
        </div>
    )
}

export default App