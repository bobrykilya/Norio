import React, { createContext, MutableRefObject, useEffect, useRef, useState } from "react"
import CircularProgress from '@mui/joy/CircularProgress'
import inMemoryJWT from '../services/inMemoryJWT-service.js'
import config from "../config.js"
import AuthService from "../services/Auth-service.js"
import { showSnackBarMessage } from "../features/showSnackBarMessage/showSnackBarMessage.jsx"
import { CoverPanelOptions, IAvatarListElement, IHandleCheckUser, IHandleSignIn, IUserInfo, ILoginServiceResp, ISignUpServiceReq, IHandleLogOut } from "../types/Auth-types.js"



export const AuthContext = createContext({})

const AuthProvider = ({ children }) => {
	const [data, setData] = useState<Record<string, any> | null>(null)
	const [isAppReady, setIsAppReady] = useState(false)
	const [isUserLogged, setIsUserLogged] = useState(false)
	const [listOfUsedAvatars, setListOfUsedAvatars] = useState<IAvatarListElement[]>([])
	const [coverPanelState, setCoverPanelState] = useState<CoverPanelOptions>('sign_in')
	const logOutTimer = useRef<ReturnType<typeof setTimeout>>(null) as MutableRefObject<ReturnType<typeof setTimeout>>
	const [signUpUserName, setSignUpUserName] = useState('')
	const [signUpUserPassword, setSignUpUserPassword] = useState('')

	const setLogOutTimer = (logOutTime: Date)=> {
		const timeOutTime = new Date(logOutTime).getTime() - new Date().getTime()
		if (!timeOutTime) return
	
		logOutTimer.current = setTimeout(() => {
			console.log('Auto logOut')
			handleLogOut({ interCode: 204 })
			showSnackBarMessage({ type: 'w', message: 'Был выполнен выход из аккаунта пользователя по истечении быстрой сессии' })
		}, timeOutTime)
	}
	const resetSignUpVariables = () => {
		setSignUpUserName('')
		setSignUpUserPassword('')
		clearTimeout(logOutTimer.current)
		setListOfUsedAvatars([])
	}
	const resetSignInVariables = () => {
		localStorage.removeItem('userInfo')
	}
	const handleReturnToSignUp = () => {
		resetSignUpVariables()
		
		setCoverPanelState('sign_up')
	}
	const userHasLogged = (pauseTime: number) => {
		setTimeout(() => {
			setIsUserLogged(true)
			setCoverPanelState('sign_in')
		}, pauseTime)
	}

	const checkSessionDouble = (newUserInfo : IUserInfo): boolean => {
		if (localStorage.getItem('userInfo')) {

			const { last_name, first_name, username } = JSON.parse(localStorage.getItem('userInfo') || '{}') //* Old user info
			const messageEnding = last_name ? `${last_name} ${first_name} (${username})` : username

			if (newUserInfo.username !== username) {
				//! showSnackBarMessage({ 
				// 	type: 'w', 
				// 	duration: 5000, 
				// 	message: `Был выполнен фоновый выход из аккаунта пользователя: ${messageEnding}` 
				//! })
				handleLogOut()
				return true
			}
		}
		return false
	}

	const loginUser = ({ accessToken, accessTokenExpiration, userInfo, deviceId }: ILoginServiceResp) => {
		const pauseTime = checkSessionDouble(userInfo) ? 300 : 0 //* Timeout after logout, before new login
		
		saveUserDataOnBrowser({ accessToken, accessTokenExpiration, userInfo, deviceId })
		
		userHasLogged(pauseTime)
	}

	const saveUserDataOnBrowser = ({ accessToken, accessTokenExpiration, userInfo, deviceId, lsDeviceId }: ILoginServiceResp & { lsDeviceId?: number }) => {
		inMemoryJWT.setToken(accessToken, accessTokenExpiration)
		testAndUpdateLSDeviceId(deviceId, lsDeviceId)
		localStorage.setItem('userInfo', JSON.stringify(userInfo))
	}

	const testAndUpdateLSDeviceId = (deviceId: number, lsDeviceId?: number) => {
		const lsDeviceId_2 = lsDeviceId || Number(localStorage.getItem('deviceId'))

		if (!lsDeviceId_2 || (lsDeviceId_2 !== deviceId)) localStorage.setItem('deviceId', String(deviceId))
	}

	const handleSignIn = async (data: IHandleSignIn) => {

		const { accessToken, accessTokenExpiration, logOutTime, userInfo, deviceId } = await AuthService.signIn(data)
		loginUser({ accessToken, accessTokenExpiration, userInfo, deviceId })

		if (logOutTime) {
			setLogOutTimer(logOutTime)
		}
	}

	const handleCheckUser = async (data: IHandleCheckUser) => {

		const { userName, hashedPassword, avatarsList } = await AuthService.checkUser(data)

		setSignUpUserName(userName)
		setSignUpUserPassword(hashedPassword)
		setListOfUsedAvatars(avatarsList)

		setCoverPanelState('sign_up_info')
	}

	const handleSignUp = async (data: ISignUpServiceReq) => {

		data.username = signUpUserName
		data.hashedPassword = signUpUserPassword
		
		const { accessToken, accessTokenExpiration, userInfo, deviceId } = await AuthService.signUp(data)
		loginUser({ accessToken, accessTokenExpiration, userInfo, deviceId })

		resetSignUpVariables()
	}

	const handleLogOut = ({ interCode }: IHandleLogOut = {}) => {

		AuthService.logOut({ interCode })

		resetSignInVariables()

		inMemoryJWT.deleteToken()
		// location.reload(true)

		setIsUserLogged(false)
	}

	// const handleFetchProtected = () => {
	// 	const res = AuthService.fetchProtected()
	// 	setData(res)
	// }


	//* Refresh handling
	useEffect(() => {
			const refresh = async () => {
				try {
					// console.log('refresh')
					const lsDeviceId = Number(localStorage.getItem('deviceId'))

					const { accessToken, accessTokenExpiration, logOutTime, userInfo, deviceId }: ILoginServiceResp = await AuthService.refresh({ lsDeviceId })
					
					saveUserDataOnBrowser({ accessToken, accessTokenExpiration, userInfo, deviceId, lsDeviceId })
	
					setIsAppReady(true)
					setIsUserLogged(true)
	
					if (logOutTime) {
						setLogOutTimer(logOutTime)
					}
				} catch (err) {
					localStorage.removeItem('blockDevice')
					setIsAppReady(true)
					setIsUserLogged(false)
					resetSignInVariables()
				}
			}
		refresh()
	}, [])

	//* Exiting from all tabs when log out
	useEffect(() => {
		const handlePersistedLogOut = (event: StorageEvent) => {
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

	//* Check for block on Front
	useEffect(() => {
		const checkForBlock = () => {
			try {
				if (localStorage.getItem('blockDevice')) {
					setTimeout(() => handleLogOut(), 300)
				}
			} catch {
				setIsAppReady(true)
				setIsUserLogged(false)
				resetSignInVariables()
			}
		}
		checkForBlock()
	}, [])


	return (
		<AuthContext.Provider
			value={{
				data,
				coverPanelState,
                setCoverPanelState,
				handleReturnToSignUp,
				handleCheckUser,
				// handleFetchProtected,
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