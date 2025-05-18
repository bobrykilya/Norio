import React from 'react'

import { motion } from 'framer-motion'



const transitionSettings = {
	duration: 0.35,
	ease: [0.22, 1, 0.86, 1],
}
const jumpY = 30
const jumpScale = 0.07


const ClassicAnim = ({ children }) => {
	return (
		<motion.div
			className='cont'
			initial={{
				opacity: 0,
				y: jumpY,
				scale: 1 - jumpScale,
			}}
			animate={{
				opacity: 1,
				y: 0,
				scale: 1,
			}}
			// exit={{
			// 	opacity: 0,
			// 	y: jumpY,
			// 	scale: 1 - jumpScale,
			// }}
			transition={transitionSettings}
		>
			{children}
		</motion.div>
	)
}

const AuthPageAnim = ({ children }) => {
	return (
		<motion.div
			// className='cont'
			initial={{
				opacity: 0,
				y: -jumpY,
				// scale: 1 + jumpScale
			}}
			animate={{
				opacity: 1,
				y: 0,
				// scale: 1
			}}
			// exit={{
			// 	opacity: 0,
			// 	y: jumpY,
			// 	// scale: 1 - jumpScale
			// }}
			transition={transitionSettings}
		>
			{children}
		</motion.div>
	)
}

export { AuthPageAnim,ClassicAnim }