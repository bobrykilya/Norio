import { useContext } from "react"
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom"
import { SnackbarProvider } from "notistack"
import { AuthContext } from "./context/AuthContext"
import AuthProvider from "./context/AuthContext"
import LoginPage from './pages/LoginPage/LoginPage';
import HomePage from './pages/HomePage/HomePage'
import './App.sass'



const App = () => {

    const { isUserLogged } = useContext(AuthContext)

    return (
        <div id='main_body-cont' className="cont">
            <AuthProvider>
                <SnackbarProvider />
                <BrowserRouter>
                    <Routes>
                        {isUserLogged ? (
                            <Route path="home-page" element={<HomePage />} />
                        ) : (
                            <Route path="login" element={<LoginPage />} />
                        )}
                        <Route path="*" element={<Navigate to={isUserLogged ? "home-page" : "login"} />} />
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </div>
    )
}

export default App