import React, { createContext, useEffect } from 'react'

import io from 'socket.io-client'

import { CURRENT_USER_LS, DEVICE_LS, LOGOUT_LS, SWITCH_USERS_ID_LS } from '@/../constants'
import CoverAppTitle from '@common/CoverAppTitle/CoverAppTitle'
import { Loader } from '@common/Loader/Loader'
import AuthCommon, { ICurrentUserLS, ISwitchUsersIdLS } from '@features/auth/authCommon'
import FastSession from '@features/auth/fastSession'
import LogOut from '@features/auth/logOut'
import logOut from '@features/auth/logOut'
import AuthService from '@services/Auth-service'
import TokenService from '@services/Token-service'
import { IAutoLogoutPayload, ILoginServiceRes } from '@shared/types/Auth-types'
import { useAuthState } from '@stores/Auth-store'
import { IDeviceInfo } from '@type/Device-types'
import { getLSObject, removeLS } from '@utils/localStorage'



type IAuthContext = {}

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
			// console.log('refresh')
			const lsDeviceId = getLSObject<IDeviceInfo>(DEVICE_LS)?.id || null
			const currentUserId = getLSObject<ICurrentUserLS>(CURRENT_USER_LS)?.userId || null
			const switchUsersIdList = getLSObject<ISwitchUsersIdLS>(SWITCH_USERS_ID_LS)
			// console.log({ switchUsersIdList, currentUserId })
			try {
				const refreshSwitchUsersTokens = async () => {
					if (switchUsersIdList) {
						return Promise.all(switchUsersIdList
							.filter((userId) => userId !== currentUserId)
							.map(async (userId) => {

									try {
										const {
											accessToken,
											accessTokenExpiration,
											userInfo,
											isFast,
										}: ILoginServiceRes = await AuthService.refresh({ lsDeviceId, userId })

										if (isFast) {
											logOut.logOut({ interCode: 204, userId })
											return
										}

										TokenService.setJWTInfo({ userInfo, accessToken, accessTokenExpiration })
									} catch (err) {
										console.error('Error refresh for switch user: ', userId)
										logOut.logOut({ interCode: 206, userId })
									}
								},
							))
					}
				}

				await refreshSwitchUsersTokens()
					.then(async () => {
						try {
							const {
								accessToken,
								accessTokenExpiration,
								userInfo,
								deviceId,
								isFast,
							}: ILoginServiceRes = await AuthService.refresh({ lsDeviceId, userId: currentUserId })
							AuthCommon.loginUser({
								accessToken,
								accessTokenExpiration,
								userInfo,
								deviceId,
								lsDeviceId,
								isFast,
							})
						} catch (err) {
							LogOut.userHasLogOut()
							removeLS(CURRENT_USER_LS)
							AuthCommon.removeSwitchUserFromLS(currentUserId)
						}
					})
			} finally {
				setAppReadyState(true)
				FastSession.checkIsFastSessionDeprecated(currentUserId)
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
			if (event.key === CURRENT_USER_LS) {
				if (localStorage.getItem(CURRENT_USER_LS)) {
					location.reload()
				}
			}
		}

		window.addEventListener('storage', handlePersistedLogOut)
		return () => {
			window.removeEventListener('storage', handlePersistedLogOut)
		}
	}, [])


	//* Socket events handling
	useEffect(() => {
		const socketEvents = () => {
			socket.on('connect', () => {
				// console.log(socket.id)
				setSocketSessIdState(socket.id)
			})
			socket.on('autoLogOut', ({ isLogOut, userInfo }: IAutoLogoutPayload) => {
				// console.log(isLogOut)
				if (isLogOut) {
					LogOut.autoFastSessionLogOut(userInfo)
				}
			})
		}
		socketEvents()
	}, [])


	//* Fast session refresh and closing checking
	useEffect(() => {
		const handleBeforeUnload = () => {
			FastSession.fastSessionRefresh()
		}
		window.addEventListener('beforeunload', handleBeforeUnload)
		return () => {
			window.removeEventListener('beforeunload', handleBeforeUnload)
		}
	}, [])


	return (
		<AuthContext.Provider
			value={{}}
		>
			{appReadyState ? (
					children
				) :
				<>
					<Loader
						type={'circles'}
						contClassName={'main_bg-gradient'}
						width='100'
					/>
					<CoverAppTitle dim={true} />
				</>
			}
		</AuthContext.Provider>
	)
}

export default AuthProvider