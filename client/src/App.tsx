import React, { useLayoutEffect } from 'react'

import { AnimatePresence } from 'framer-motion'
import { Toaster } from 'react-hot-toast'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'

import { APP_TITLE } from '../constants'
import AuthPage from './pages/AuthPage/AuthPage'
import HomePage from './pages/HomePage/HomePage'
import CoverAppTitle from '@common/CoverAppTitle/CoverAppTitle'
import useCloseOnEsc from '@hooks/useCloseOnEsc'
import BottomCard from '@others/JumpingCards/BottomCard/BottomCard'
import TopCard from '@others/JumpingCards/TopCard/TopCard'
import { useUserInfoState } from '@stores/User-store'
import { useModalState } from '@stores/Utils-store'
import { capitalize } from '@utils/capitalize'

import './App.sass'



const App = () => {

	const isUserLogged = useUserInfoState(s => s.isUserLogged())
	const [modalStack, isModalStackEmpty] = useModalState(s => [s.modalStack, s.isModalStackEmpty()])
	// console.log(modalStack)

	const location = useLocation()

	useLayoutEffect(() => {
		document.title = capitalize(APP_TITLE)
	}, [])

	useCloseOnEsc({
		callback: modalStack.at(-1)?.callback,
		conditionsList: [!isModalStackEmpty],
	})


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
								to={isUserLogged ? 'home' : 'auth'}
							/>
						}
					/>
					{!isUserLogged ?
						<Route
							path='auth' element={
							<AuthPage />
						}
						/>
						:
						<Route
							path='home' element={
							<HomePage
								isUserLogged={isUserLogged}
							/>
						}
						/>
					}
				</Routes>
			</AnimatePresence>
			<CoverAppTitle />
			<div className='main_bg-gradient cover' />
		</div>
	)
}

export default App