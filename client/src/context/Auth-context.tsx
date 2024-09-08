import React, { createContext, useEffect, useState } from "react"
import CircularProgress from '@mui/joy/CircularProgress'
import inMemoryJWT from '../services/inMemoryJWT-service'
import { LOGOUT_STORAGE_KEY } from "../../constants"
import AuthService from "../services/Auth-service"
import { showSnackBarMessage } from "../features/showSnackBarMessage/showSnackBarMessage"
import {
	CoverPanelOptions,
	IAvatarListElement,
	IHandleCheckUser,
	IHandleLogOut,
	IHandleSignIn,
	ILoginServiceResp,
	ISignUpServiceReq,
	IUserInfo,
	IUserNameInfo,
} from "../types/Auth-types"
import io from "socket.io-client"


export const AuthContext = createContext({})
export const socket = io(import.meta.env.VITE_API_URL)


const AuthProvider = ({ children }) => {
	// const [data, setData] = useState<Record<string, any> | null>(null)
	const [isAppReady, setIsAppReady] = useState(false)
	const [isUserLogged, setIsUserLogged] = useState(false)
	const [listOfUsedAvatars, setListOfUsedAvatars] = useState<IAvatarListElement[]>([])
	const [coverPanelState, setCoverPanelState] = useState<CoverPanelOptions>('sign_in')
	const [signUpUserName, setSignUpUserName] = useState('')
	const [signUpUserPassword, setSignUpUserPassword] = useState('')
	const [socketSessId, setSocketSessId] = useState('')
	

	const getUserAccountInfo = ({ lastName, firstName, username }: IUserNameInfo) => {
		return lastName ? `${lastName} ${firstName} "${username}"` : username
	}
	const autoLogOut = (userNameInfo: IUserNameInfo) => {
		// console.log('Auto logOut')
		showSnackBarMessage({ type: 'w', message: `Был выполнен выход из аккаунта пользователя: <span class='bold'>${getUserAccountInfo(userNameInfo)}</span> по истечении быстрой сессии`})
		handleLogOut({ interCode: 204 })
	}
	
	const resetSignUpVariables = () => {
		setSignUpUserName('')
		setSignUpUserPassword('')
		setListOfUsedAvatars([])
	}
	const resetSignInVariables = () => {
		localStorage.removeItem('userInfo')
	}
	const handleReturnToSignUp = () => {
		resetSignUpVariables()
		
		setCoverPanelState('sign_up')
	}
	const userHasLogged = () => {
		setIsUserLogged(true)
		setCoverPanelState('sign_in')
	}

	const checkSessionDouble = async (newUsername: string) => {
		const userInfo = localStorage.getItem('userInfo')
		if (userInfo) {
			const { username, last_name, first_name }: IUserInfo = JSON.parse(userInfo || '{}') //* Old user info

			if (newUsername !== username) {
				showSnackBarMessage({ 
					type: 'i',
					message: `Был выполнен фоновый выход из аккаунта пользователя: <span class='bold'>${getUserAccountInfo({ lastName: last_name, firstName: first_name, username })}</span>`
				})
				handleLogOut()
			}else {
				location.reload()
			}
		}
	}

	const loginUser = ({ accessToken, accessTokenExpiration, userInfo, deviceId }: ILoginServiceResp) => {
		saveUserDataOnBrowser({ accessToken, accessTokenExpiration, userInfo, deviceId })
		userHasLogged()
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
		await checkSessionDouble(data.username)
			.then(async () => {
				const { accessToken, accessTokenExpiration, userInfo, deviceId } = await AuthService.signIn(data)
				loginUser({ accessToken, accessTokenExpiration, userInfo, deviceId })
			})
	}

	const handleCheckUser = async (data: IHandleCheckUser) => {

		const { userName, hashedPassword, avatarsList } = await AuthService.checkUser(data)

		setSignUpUserName(userName)
		setSignUpUserPassword(hashedPassword)
		setListOfUsedAvatars(avatarsList)

		setCoverPanelState('sign_up_info')
	}

	const handleSignUp = async (data: ISignUpServiceReq) => {
		await checkSessionDouble(data.username)
			.then(async () => {
				data.username = signUpUserName
				data.hashedPassword = signUpUserPassword
				
				const { accessToken, accessTokenExpiration, userInfo, deviceId } = await AuthService.signUp(data)
				loginUser({ accessToken, accessTokenExpiration, userInfo, deviceId })
		
				resetSignUpVariables()
			})
	}

	const handleLogOut = ({ interCode }: IHandleLogOut = {}) => {
		// console.log('logOut')

		AuthService.logOut({ interCode })

		resetSignInVariables()

		inMemoryJWT.deleteToken()

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

				const { accessToken, accessTokenExpiration, userInfo, deviceId }: ILoginServiceResp = await AuthService.refresh({ lsDeviceId })

				saveUserDataOnBrowser({ accessToken, accessTokenExpiration, userInfo, deviceId, lsDeviceId })

				setIsAppReady(true)
				setIsUserLogged(true)

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
			if (event.key === LOGOUT_STORAGE_KEY) {
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
				//TODO: Delete localStorage for block
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

	useEffect(() => {
		const socketEvents = () => {
			socket.on('connect', () => {
				setSocketSessId(socket.id)
				// console.log(socket.id)
			})
			socket.on('autoLogOut', ({ isLogOut, userNameInfo }) => {
				console.log(isLogOut)
				if (isLogOut) autoLogOut(userNameInfo)
			})
		}
		socketEvents()
	}, [])

	return (
		<AuthContext.Provider
			value={{
				// data,
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