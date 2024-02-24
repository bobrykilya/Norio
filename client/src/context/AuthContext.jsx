import { createContext, useState, useEffect } from "react"
import axios from "axios"
import { Circle } from "react-preloaders"
import config from "../config"
// import style from "../app.module.scss"
import showErrorMessage from "../utils/showErrorMessage.js"
import inMemoryJWT from '../../services/inMemoryJWT'



export const AuthClient = axios.create({
  baseURL: `${config.API_URL}/auth`,
  withCredentials: true,
})

const ResourceClient = axios.create({
  baseURL: `${config.API_URL}/resource`,
})

ResourceClient.interceptors.request.use((config) => {
  const accessToken = inMemoryJWT.getToken()

  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`
  }

  return config
  }, 
  (error) => {
    Promise.reject(error)
  }
)

export const AuthContext = createContext({})

const AuthProvider = ({ children }) => {
  const [data, setData] = useState()
  const [isAppReady, setIsAppReady] = useState(false)
  const [isUserLogged, setIsUserLogged] = useState(false)

  const handleSignIn = (data) => {
    // location.reload(true)
    AuthClient.post("/sign-in", data)
    .then((res) => {
      const { accessToken, accessTokenExpiration } = res.data
      inMemoryJWT.setToken(accessToken, accessTokenExpiration)
      
      setIsUserLogged(true)
    })
    .catch(showErrorMessage)
  }
  
  const handleSignUp = (data) => {
    AuthClient.post("/sign-up", data)
    .then((res) => {
      const { accessToken, accessTokenExpiration } = res.data
      inMemoryJWT.setToken(accessToken, accessTokenExpiration)
      
      setIsUserLogged(true)
    })
    .catch(showErrorMessage)
  }
    
  
  const handleLogOut = () => {
    AuthClient.post("/logout")
    .then(() => {
      inMemoryJWT.deleteToken()
      
      setIsUserLogged(false)
    })
    .catch(showErrorMessage)
  }
  
  const handleFetchProtected = () => {
    ResourceClient.get("/protected")
    .then((res) => {
      setData(res.data)
    })
    .catch(showErrorMessage)
  }

  useEffect(() => {
    AuthClient.post("/refresh")
      .then((res) => {
        const { accessToken, accessTokenExpiration } = res.data
        inMemoryJWT.setToken(accessToken, accessTokenExpiration)

        setIsAppReady(true)
        setIsUserLogged(true)
      })
      .catch(() => {
        setIsAppReady(true)
        setIsUserLogged(false)
      })
  }, [])

  useEffect(() => {
    const handlePersistedLogOut = (event) => {
      // console.log(event.key)
      if (event.key === config.LOGOUT_STORAGE_KEY) {
        inMemoryJWT.deleteToken()
        setIsUserLogged(false)
      }
    }

    window.addEventListener("storage", handlePersistedLogOut)
    return () => {
      window.removeEventListener("storage", handlePersistedLogOut)
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{
        data,
        handleFetchProtected,
        handleSignUp,
        handleSignIn,
        handleLogOut,
        isUserLogged,
        isAppReady,
      }}
    >
      {isAppReady ? (
        children
      ) : (
        <div>
          <Circle />
        </div>
      )}
    </AuthContext.Provider>
  )
}

export default AuthProvider
