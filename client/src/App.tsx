import React, { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AnimatePresence } from 'framer-motion'
import AuthPage from './pages/AuthPage/AuthPage'
import HomePage from './pages/HomePage/HomePage'
import './App.sass'
import CoverAppTitle from './components/common/CoverAppTitle/CoverAppTitle'
import { useBlockErrorState } from './stores/Device-store'
import TopCard from './components/others/JumpingCards/TopCard/TopCard'
import { useUserInfoState } from './stores/User-store'
import { APP_TITLE } from '../constants'
import { capitalize } from './utils/capitalize'
import BottomCard from './components/others/JumpingCards/BottomCard/BottomCard'



const App = () => {

	const userInfo = useUserInfoState(s => s.userInfoState)
	const blockErrorState = useBlockErrorState(s => s.blockErrorState)

	const location = useLocation()

	useEffect(() => {
		document.title = capitalize(APP_TITLE)
	}, [])


	return (
		<div
			id='main_body-cont'
			className='cont'
		>
			<TopCard />
			<BottomCard />
			<Toaster reverseOrder={true} />
			<AnimatePresence>
				<Routes
					location={location}
					key={location.pathname}
				>
					<Route
						path='*'
						element={
							<Navigate
								replace={true}
								to={Boolean(userInfo) ? 'home' : 'auth'}
							/>
						}
					/>
					{!userInfo ?
						<Route
							path='auth' element={
							<AuthPage blockErrorMessage={blockErrorState} />
						}
						/>
						:
						<Route
							path='home' element={
							<HomePage isUserLogged={Boolean(userInfo)} location={location} />
						}
						/>
					}
				</Routes>
			</AnimatePresence>
			<CoverAppTitle block={!!blockErrorState} />
			<div className='main_bg-gradient cover' />
		</div>
	)
}

export default App