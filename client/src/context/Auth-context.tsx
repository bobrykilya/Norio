import React, { createContext, useEffect } from "react"
import { Circles } from 'react-loader-spinner'
import AuthService from "../services/Auth-service"
import io from "socket.io-client"
import { ILoginServiceRes } from "../../../common/types/Auth-types"
import LogOut from "../features/auth/logOut"
import logOut from "../features/auth/logOut"
import { useAuthState } from "../stores/Auth-store"
import JWTInfoService from "../services/JWTInfoService"
import AuthCommon from "../features/auth/authCommon"
import FastSession from "../features/auth/fastSession"
import { DEVICE_LS, FAST_LS, LOGOUT_LS, SWITCH_USERS_LS, USER_LS } from "../../constants"



type IAuthContext = {

}

export const AuthContext = createContext<IAuthContext | null>(null)
export const socket = io(import.meta.env.VITE_API_URL)

const AuthProvider = ({ children }) => {
	const {
		appReadyState,
		setAppReadyState,
		setSocketSessIdState,
	} = useAuthState()

	// const [data, setData] = useState<Record<string, any> | null>(null)

	// const handleFetchProtected = () => {
	// 	const res = AuthService.fetchProtected()
	// 	setData(res)
	// }


	//* Refresh handling
	useEffect(() => {
		const refresh = async () => {
			try {
				// console.log('refresh')
				const lsDeviceId = JSON.parse(localStorage.getItem(DEVICE_LS))?.id || null
				const username = JSON.parse(localStorage.getItem(USER_LS))?.username || null
				const switchUsersList = JSON.parse(localStorage.getItem(SWITCH_USERS_LS))

				const refreshSwitchUsersTokens = async () => {
					if (switchUsersList) {
						return Promise.all(switchUsersList.map(async (userName: string) => {

							if (userName === username) {
								return
							}

							try {
								const { accessToken, accessTokenExpiration, userInfo, isFast }: ILoginServiceRes = await AuthService.refresh({ lsDeviceId, username: userName })

								if (isFast) {
									logOut.logOut({ interCode: 204, username: userName })
									return
								}

								JWTInfoService.setJWTInfo({ userInfo, accessToken, accessTokenExpiration })
							} catch (err) {
								console.log('Error refresh for switch user: ', userName)
								logOut.logOut({ interCode: 206, username: userName })
							}
						}))
					}
				}

				await refreshSwitchUsersTokens()
					.then( async () => {
						const { accessToken, accessTokenExpiration, userInfo, deviceId, isFast }: ILoginServiceRes = await AuthService.refresh({ lsDeviceId, username })
						AuthCommon.loginUser({ accessToken, accessTokenExpiration, userInfo, deviceId, lsDeviceId, isFast })
					})
			} catch (err) {
				// console.log(err)
				LogOut.userHasLogOut()
			} finally {
				setAppReadyState(true)
			}
		}

		refresh()
	}, [])


	//* Exiting from all tabs after logOut, tab reload after user login
	useEffect(() => {
		const handlePersistedLogOut = (event: StorageEvent) => {
			if (event.key === LOGOUT_LS) {
				LogOut.handleSwitchUser()
			}
			if (event.key === USER_LS) {
				if (localStorage.getItem(USER_LS)) {
					location.reload()
				}
			}
		}

		window.addEventListener("storage", handlePersistedLogOut)
		return () => {
			window.removeEventListener("storage", handlePersistedLogOut)
		}
	}, [])


	//* Socket events handling
	useEffect(() => {
		const socketEvents = () => {
			socket.on('connect', () => {
				// console.log(socket.id)
				setSocketSessIdState(socket.id)
			})
			socket.on('autoLogOut', ({ isLogOut, userNameInfo }) => {
				// console.log(isLogOut)
				if (isLogOut) LogOut.autoFastSessionLogOut(userNameInfo)
			})
		}
		socketEvents()
	}, [])


	//* Fast session refresh and closing checking
	useEffect(() => {
		const handleBeforeUnload = () => {
			FastSession.handleFastSessionRefresh()
		}
		window.addEventListener("beforeunload", handleBeforeUnload)
		return () => {
			window.removeEventListener("beforeunload", handleBeforeUnload)
		}
	}, [])
	useEffect(() => {
		const fastSession = localStorage.getItem(FAST_LS)
		if (fastSession) {
			FastSession.checkFastSessionLogOut(fastSession)
		}
	}, [])


	return (
		<AuthContext.Provider
			value={{

			}}
		>
			{appReadyState ? (
				children
			) : (
				<div className='cont main_bg-gradient'>
					<Circles
						color='#E9EDF0CC'
						width="100"
					/>
				</div>
			)}
		</AuthContext.Provider>
	)
}

export default AuthProvider