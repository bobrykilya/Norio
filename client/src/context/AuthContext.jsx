import { createContext, useState, useEffect, useRef } from "react"
import axios from "axios"
import { Circle } from "react-preloaders"
import { useActions } from '../hooks/useActions'
import config from "../config"
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
	const [signUpUserName, setSignUpUserName] = useState(false)
	const [signUpUserPassword, setSignUpUserPassword] = useState(false)
	const [listOfUsedAvatars, setListOfUsedAvatars] = useState([])
	const { toggleCoverPanel } = useActions()
	const refSetTimeout = useRef(null)

	const setTimer = (logOutTime) => {
		const timeOutTime = new Date(logOutTime).getTime() - new Date().getTime()
		if (!timeOutTime) return

		refSetTimeout.current = setTimeout(() => {
			// console.log('Auto logOut')
			handleLogOut()
		}, timeOutTime)
	}

	const handleSignIn = (data) => {
		// console.log(data.is_not_save)

		AuthClient.post("/sign-in", data)
			.then((res) => {
				const { accessToken, accessTokenExpiration, logOutTime } = res.data
				inMemoryJWT.setToken(accessToken, accessTokenExpiration)

				setIsUserLogged(true)
				toggleCoverPanel('sign_in')

				// console.log(logOutTime)
				if (logOutTime) {
					setTimer(logOutTime)
				}
			})
			.catch(showErrorMessage)
	}

	const handleCheckUser = (data) => {
		AuthClient.post("/check-user", data)
			.then((res) => {
				const { userName, userPassword, avatarsList } = res.data

				setSignUpUserName(userName)
				setSignUpUserPassword(userPassword)
				setListOfUsedAvatars(avatarsList)

				toggleCoverPanel('sign_up_2')
			})
			.catch(showErrorMessage)
	}

	const resetSignUpVariables = () => {
		setSignUpUserName(false)
		setSignUpUserPassword(false)
		setListOfUsedAvatars([])
	}

	const handleReturnToSignUp = () => {
		resetSignUpVariables()

		toggleCoverPanel('sign_up')
	}

	const handleSignUp = (data) => {
		data.username = signUpUserName
		data.hashedPassword = signUpUserPassword

		AuthClient.post("/sign-up", data)
			.then((res) => {
				const { accessToken, accessTokenExpiration } = res.data
				inMemoryJWT.setToken(accessToken, accessTokenExpiration)

				resetSignUpVariables()

				setIsUserLogged(true)
				toggleCoverPanel('sign_in')
			})
			.catch(showErrorMessage)
	}


	const handleLogOut = () => {
		clearTimeout(refSetTimeout.current)

		AuthClient.post("/logout")
			.then(() => {
				inMemoryJWT.deleteToken()
				// location.reload(true)

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
				const { accessToken, accessTokenExpiration, logOutTime } = res.data
				inMemoryJWT.setToken(accessToken, accessTokenExpiration)

				setIsAppReady(true)
				setIsUserLogged(true)

				if (logOutTime) {
					setTimer(logOutTime)
				}
			})
			.catch(() => {
				setIsAppReady(true)
				setIsUserLogged(false)
				clearTimeout(refSetTimeout.current)
			})
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
				handleFetchProtected,
				handleCheckUser,
				handleReturnToSignUp,
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
					<Circle />
				</div>
			)}
		</AuthContext.Provider>
	)
}

export default AuthProvider
