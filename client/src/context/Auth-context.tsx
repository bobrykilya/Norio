import React, { createContext, useEffect } from "react"
import { Circles } from 'react-loader-spinner'
import AuthService from "../services/Auth-service"
import io from "socket.io-client"
import { ILoginServiceRes } from "../../../common/types/Auth-types"
import LogOut from "../features/auth/logOut"
import { useAuthState } from "../stores/Auth-store"
import authCommon from "../features/auth/authCommon"
import JWTInfoService from "../services/JWTInfoService"



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
				const lsDeviceId = JSON.parse(localStorage.getItem('deviceInfo'))?.id || null
				const username = JSON.parse(localStorage.getItem('currentUser'))?.username || null
				const switchUsersList = JSON.parse(localStorage.getItem('switchUsers'))

				if (switchUsersList) {
					switchUsersList.map(async (username: string) => {
						try {
							const { accessToken, accessTokenExpiration, userInfo }: ILoginServiceRes = await AuthService.refresh({ lsDeviceId, username })

							JWTInfoService.setJWTInfo({ userInfo, accessToken, accessTokenExpiration })
						} catch (err) {
							console.log('Switch users refresh error: ', err)
						}
					})
				}

				const { accessToken, accessTokenExpiration, userInfo, deviceId }: ILoginServiceRes = await AuthService.refresh({ lsDeviceId, username })
				authCommon.loginUser({ accessToken, accessTokenExpiration, userInfo, deviceId, lsDeviceId })

				setAppReadyState(true)
			} catch (err) {
				setAppReadyState(true)
				LogOut.userHasLogOut()
			}
		}

		refresh()
	}, [])


	//! Delete ?
	// //* Exiting from all tabs when log out
	// useEffect(() => {
	// 	const handlePersistedLogOut = (event: StorageEvent) => {
	// 		// console.log(event.key)
	// 		if (event.key === LOGOUT_STORAGE_KEY) {
	// 			LogOut.handleLogOut({ interCode: 204 })
	// 			// JWTInfoService.deleteJWTInfo()
	// 			// resetSignInVariables()
	// 		}
	// 	}
	//
	// 	window.addEventListener("storage", handlePersistedLogOut)
	// 	return () => {
	// 		window.removeEventListener("storage", handlePersistedLogOut)
	// 	}
	// }, [])


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