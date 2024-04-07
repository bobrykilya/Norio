import axios from "axios"
import { createContext, useEffect, useRef, useState } from "react"
import { Circle } from "react-preloaders"
import inMemoryJWT from '../../services/inMemoryJWT.js'
import config from "../config.js"
import showErrorMessage from "../utils/showErrorMessage.js"



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
	const [coverPanelState, setCoverPanelState] = useState('sign_in')
	const refSetTimeout = useRef(null)

	const setTimer = (logOutTime) => {
		const timeOutTime = new Date(logOutTime).getTime() - new Date().getTime()
		if (!timeOutTime) return

		refSetTimeout.current = setTimeout(() => {
			// console.log('Auto logOut')
			handleLogOut()
		}, timeOutTime)
	}

	const getDeviceType = () => {
		const ua = navigator.userAgent
		const tabletRegex = /(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i
		const mobRegex = /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/
		
		if (tabletRegex.test(ua)) return "Tablet"
		if (mobRegex.test(ua)) return "Mobile"
		return "Desktop"
	}

	const getCountryCode = async () => {
		return await axios.get('https://ipapi.co/json/').then((res) => {
			if (res.data.country_code !== 'BV') {
				// console.log(res)
				// throw new Error(res.json('Ошибка'))
			}
			return res.data.country_code
		})
		.catch(showErrorMessage)
	}

	const assignDeviceOtherData = async (data) => {
		const countryCode = await getCountryCode()
		const deviceType = getDeviceType()
		
		// console.log(countryCode)
		return Object.assign(data, { countryCode, deviceType })
	}

	const handleUserLogged = () => {
		setIsUserLogged(true)
		setCoverPanelState('sign_in')
	}

	const handleSignIn = async (data) => {
		await assignDeviceOtherData(data).then((newData) => {
			// console.log(newData)
			AuthClient.post("/sign-in", newData)
				.then((res) => {
					const { accessToken, accessTokenExpiration, logOutTime, userInfo } = res.data
					inMemoryJWT.setToken(accessToken, accessTokenExpiration)
	
					localStorage.setItem('userInfo', JSON.stringify(userInfo))

					handleUserLogged()

					// console.log(logOutTime)
					if (logOutTime) {
						setTimer(logOutTime)
					}
				})
				.catch(showErrorMessage)
		})
		.catch(showErrorMessage)
	}

	const handleCheckUser = (data) => {
		AuthClient.post("/check-user", data)
			.then((res) => {
				const { userName, hashedPassword, avatarsList } = res.data

				setSignUpUserName(userName)
				setSignUpUserPassword(hashedPassword)
				setListOfUsedAvatars(avatarsList)

				setCoverPanelState('sign_up_info')
			})
			.catch(showErrorMessage)
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

	const handleSignUp = async (data) => {
		data.username = signUpUserName
		data.hashedPassword = signUpUserPassword
		data.deviceType = getDeviceType()

		await assignDeviceOtherData(data).then((newData) => {
			// console.log(newData)
			AuthClient.post("/sign-up", newData)
				.then((res) => {
					const { accessToken, accessTokenExpiration, userInfo } = res.data
					inMemoryJWT.setToken(accessToken, accessTokenExpiration)

					localStorage.setItem('userInfo', JSON.stringify(userInfo))

					resetSignUpVariables()

					handleUserLogged()
				})
				.catch(showErrorMessage)
		})
		.catch(showErrorMessage)
	}

	const handleLogOut = () => {
		resetSignInVariables()

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
				const { accessToken, accessTokenExpiration, logOutTime, userInfo } = res.data
				inMemoryJWT.setToken(accessToken, accessTokenExpiration)

				localStorage.setItem('userInfo', JSON.stringify(userInfo))				

				setIsAppReady(true)
				setIsUserLogged(true)

				if (logOutTime) {
					setTimer(logOutTime)
				}
			})
			.catch(() => {
				setIsAppReady(true)
				setIsUserLogged(false)
				resetSignInVariables()
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
					<Circle />
				</div>
			)}
		</AuthContext.Provider>
	)
}

export default AuthProvider