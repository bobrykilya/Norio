import { createContext, useEffect, useRef, useState } from "react"
import CircularProgress from '@mui/joy/CircularProgress'
import inMemoryJWT from '../services/inMemoryJWT-service.js'
import config from "../config.js"
import AuthService from "../services/Auth-service.js"
import { showSnackBarMessage } from "../utils/showSnackBarMessage"



export const AuthContext = createContext({})

const AuthProvider = ({ children }) => {
	const [data, setData] = useState()
	const [isAppReady, setIsAppReady] = useState(false)
	const [isUserLogged, setIsUserLogged] = useState(false)
	const [listOfUsedAvatars, setListOfUsedAvatars] = useState([])
	const [coverPanelState, setCoverPanelState] = useState('sign_in')
	const refSetTimeout = useRef(null)
	const [signUpUserName, setSignUpUserName] = useState(false)
	const [signUpUserPassword, setSignUpUserPassword] = useState(false)

	const setLogOutTimer = (logOutTime) => {
		const timeOutTime = new Date(logOutTime).getTime() - new Date().getTime()
		if (!timeOutTime) return
	
		refSetTimeout.current = setTimeout(() => {
			// console.log('Auto logOut')
			handleLogOut()
			showSnackBarMessage({ type: 'w', message: 'Был выполнен выход из аккаунта пользователя по истечении быстрой сессии' })
		}, timeOutTime)
	}
	const resetSignUpVariables = () => {
		setSignUpUserName(false)
		setSignUpUserPassword(false)
		setListOfUsedAvatars([])
	}
	const resetSignInVariables = () => {
		clearTimeout(refSetTimeout.current)
		localStorage.removeItem('userInfo')
	}
	const handleReturnToSignUp = () => {
		resetSignUpVariables()
		
		setCoverPanelState('sign_up')
	}
	const handleUserHasLogged = () => {
		setIsUserLogged(true)
		setCoverPanelState('sign_in')
	}

	const checkSessionDouble = () => {
		if (localStorage.getItem('userInfo')) {
			handleLogOut()
		}
	}

	const handleSignIn = async (data) => {

		checkSessionDouble()
		
		const { accessToken, accessTokenExpiration, logOutTime, userInfo } = await AuthService.signIn(data)

		inMemoryJWT.setToken(accessToken, accessTokenExpiration)
		localStorage.setItem('userInfo', JSON.stringify(userInfo))

		handleUserHasLogged()

		// console.log(logOutTime)
		if (logOutTime) {
			setLogOutTimer(logOutTime)
		}
	}

	const handleCheckUser = async (data) => {

		const { userName, hashedPassword, avatarsList } = await AuthService.checkUser(data)

		setSignUpUserName(userName)
		setSignUpUserPassword(hashedPassword)
		setListOfUsedAvatars(avatarsList)

		setCoverPanelState('sign_up_info')
	}

	const handleSignUp = async (data) => {

		checkSessionDouble()
		
		data.username = signUpUserName
		data.hashedPassword = signUpUserPassword

		const { accessToken, accessTokenExpiration, userInfo } = await AuthService.signUp(data)
		inMemoryJWT.setToken(accessToken, accessTokenExpiration)

		localStorage.setItem('userInfo', JSON.stringify(userInfo))

		resetSignUpVariables()
		handleUserHasLogged()
	}

	const handleLogOut =  () => {
		AuthService.logOut()

		resetSignInVariables()

		inMemoryJWT.deleteToken()
		// location.reload(true)

		setIsUserLogged(false)
	}

	const handleFetchProtected = () => {
		const res = AuthService.fetchProtected()
		setData(res)
	}


	//* Refresh handling
	useEffect(() => {
			const refresh = async () => {
				try {
					// console.log('refresh')
					const { accessToken, accessTokenExpiration, logOutTime, userInfo } = await AuthService.refresh()
					inMemoryJWT.setToken(accessToken, accessTokenExpiration)
	
					localStorage.setItem('userInfo', JSON.stringify(userInfo))				
	
					setIsAppReady(true)
					setIsUserLogged(true)
	
					if (logOutTime) {
						setLogOutTimer(logOutTime)
					}
				} catch {
					setIsAppReady(true)
					setIsUserLogged(false)
					resetSignInVariables()
				}
			}
			refresh()
	}, [])

	//* Exiting from all tabs when log out
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
				coverPanelState,
                setCoverPanelState,
				handleReturnToSignUp,
				handleCheckUser,
				handleFetchProtected,
				handleSignUp,
				handleSignIn,
				handleLogOut,
				isUserLogged,
				isAppReady,
				listOfUsedAvatars,
			}}
		>
			{isAppReady ? (
				children
			) : (
				<div className='cont'>
					<CircularProgress variant="plain" />
				</div>
			)}
		</AuthContext.Provider>
	)
}

export default AuthProvider