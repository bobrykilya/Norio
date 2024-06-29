import React, { createContext, useEffect, useRef, useState } from "react"
import CircularProgress from '@mui/joy/CircularProgress'
import inMemoryJWT from '../services/inMemoryJWT-service.js'
import config from "../config.js"
import AuthService from "../services/Auth-service.js"
import { showSnackBarMessage } from "../features/showSnackBarMessage/showSnackBarMessage.jsx"
// import { setUnlockTimer } from '../features/blockDevice/unlockDevice.js'
import { AvailableCoverPanel, ICheckUserService, IHandleCheckUser, IHandleSignIn, ILSUserInfo, IResponseLoginService, IResponseRefreshService, IUserInfo } from "../types/Auth-types.js"



export const AuthContext = createContext({})

const AuthProvider = ({ children }) => {
	const [data, setData] = useState<Object | null>(null) //! Change type
	const [isAppReady, setIsAppReady] = useState<Boolean>(false)
	const [isUserLogged, setIsUserLogged] = useState<Boolean>(false)
	const [listOfUsedAvatars, setListOfUsedAvatars] = useState<{ title: string }[] | null>(null)
	const [coverPanelState, setCoverPanelState] = useState<AvailableCoverPanel>('sign_in')
	// const refSetTimeout = useRef<ReturnType<typeof setInterval> | null>(null)
	let LogOutTimer: number
	const [signUpUserName, setSignUpUserName] = useState<string | null>(null)
	const [signUpUserPassword, setSignUpUserPassword] = useState<string | null>(null)

	const setLogOutTimer = (logOutTime: Date): void => {
		const timeOutTime = new Date(logOutTime).getTime() - new Date().getTime()
		if (!timeOutTime) return
	
		LogOutTimer = setTimeout(() => { //! Test timer
			// console.log('Auto logOut')
			handleLogOut(204)
			showSnackBarMessage({ type: 'w', message: 'Был выполнен выход из аккаунта пользователя по истечении быстрой сессии' })
		}, timeOutTime)
	}
	const resetSignUpVariables = () => {
		setSignUpUserName(null)
		setSignUpUserPassword(null)
		setListOfUsedAvatars(null)
	}
	const resetSignInVariables = () => {
		clearTimeout(LogOutTimer)
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

	const checkSessionDouble = (newUserInfo : ILSUserInfo): number => {
		if (localStorage.getItem('userInfo')) {

			const { last_name, first_name, username } = JSON.parse(localStorage.getItem('userInfo') || '{}') //* Old user info
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

	const loginUser = ({ accessToken, accessTokenExpiration, userInfo, deviceId }: IResponseLoginService) => {
		const pauseTime = checkSessionDouble(userInfo)
		
		inMemoryJWT.setToken(accessToken, accessTokenExpiration)

		testAndUpdateLSDeviceId(deviceId)
		localStorage.setItem('userInfo', JSON.stringify(userInfo))
		
		userHasLogged(pauseTime)
	}

	const testAndUpdateLSDeviceId = (deviceId: number, lsDeviceId: number | null = null) => {
		const lsDeviceId_2 = lsDeviceId || Number(localStorage.getItem('deviceId'))

		if (!lsDeviceId_2 || (lsDeviceId_2 !== deviceId)) localStorage.setItem('deviceId', String(deviceId))
	}

	const handleSignIn = async (data: IHandleSignIn) => {

		const { accessToken, accessTokenExpiration, logOutTime, userInfo, deviceId }: IResponseLoginService = await AuthService.signIn(data)
		loginUser({ accessToken, accessTokenExpiration, userInfo, deviceId })

		if (logOutTime) {
			setLogOutTimer(logOutTime)
		}
	}

	const handleCheckUser = async (data: IHandleCheckUser) => {

		const { userName, hashedPassword, avatarsList }: ICheckUserService = await AuthService.checkUser(data)

		setSignUpUserName(userName)
		setSignUpUserPassword(hashedPassword)
		setListOfUsedAvatars(avatarsList)

		setCoverPanelState('sign_up_info')
	}

	const handleSignUp = async (data: IUserInfo) => {

		data.username = signUpUserName
		data.hashedPassword = signUpUserPassword
		
		const { accessToken, accessTokenExpiration, userInfo, deviceId }: IResponseLoginService = await AuthService.signUp(data)
		loginUser({ accessToken, accessTokenExpiration, userInfo, deviceId })

		resetSignUpVariables()
	}

	const handleLogOut = (interCode?: number) => {

		AuthService.logOut({ interCode })

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
					const lsDeviceId = Number(localStorage.getItem('deviceId'))

					const { accessToken, accessTokenExpiration, logOutTime, userInfo, deviceId, unlockTime }: IResponseRefreshService = await AuthService.refresh({ lsDeviceId })

					testAndUpdateLSDeviceId(deviceId, lsDeviceId)

					inMemoryJWT.setToken(accessToken, accessTokenExpiration)
	
					localStorage.setItem('userInfo', JSON.stringify(userInfo))
	
					setIsAppReady(true)
					setIsUserLogged(true)
	
					if (logOutTime) {
						setLogOutTimer(logOutTime)
					}
					// if (unlockTime) {
					// 	setUnlockTimer(unlockTime)
					// }
				} catch {
					localStorage.removeItem('blockDevice') //! Check removing "blockDevice"
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

	useEffect(() => {
		const defaultProcessing = () => {
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
		defaultProcessing()
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