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
	const userHasLogged = (pauseTime) => {
		setTimeout(() => {
			setIsUserLogged(true)
			setCoverPanelState('sign_in')
		}, pauseTime)
	}

	const checkSessionDouble = (newUserInfo) => {
		if (localStorage.getItem('userInfo')) {

			const { last_name, first_name, username } = JSON.parse(localStorage.getItem('userInfo')) //* Old user info
			const messageEnding = last_name ? `${last_name} ${first_name} (${username})` : username

			if (newUserInfo.username !== username) {
				showSnackBarMessage({ 
					type: 'w', 
					duration: 5000, 
					message: `Был выполнен фоновый выход из аккаунта пользователя: ${messageEnding}` 
				})
				handleLogOut()
				return 300 //* Timeout after logout, before new login
			}
		}
		return 0
	}

	const loginUser = ({ accessToken, accessTokenExpiration, userInfo, deviceId }) => {
		const pauseTime = checkSessionDouble(userInfo)
		
		inMemoryJWT.setToken(accessToken, accessTokenExpiration)
		if (!localStorage.getItem('deviceId')) localStorage.setItem('deviceId', deviceId)
		localStorage.setItem('userInfo', JSON.stringify(userInfo))

		userHasLogged(pauseTime)
	}

	const handleSignIn = async (data) => {

		const { accessToken, accessTokenExpiration, logOutTime, userInfo, deviceId } = await AuthService.signIn(data)
		loginUser({ accessToken, accessTokenExpiration, userInfo, deviceId })

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

		data.username = signUpUserName
		data.hashedPassword = signUpUserPassword
		
		const { accessToken, accessTokenExpiration, userInfo, deviceId } = await AuthService.signUp(data)
		loginUser({ accessToken, accessTokenExpiration, userInfo, deviceId })

		resetSignUpVariables()
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