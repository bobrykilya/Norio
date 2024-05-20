import { motion } from 'framer-motion'



const transitionSettings = {
    duration: 0.4, 
    ease: [0.22, 1, 0.86, 1] 
}
const jumpY = 17
const jumpScale = 0.02

const ClassicAnim = ({ children }) => {
    return (
        <motion.div
            className='cont'
            initial={{
                opacity: 0, 
                y: jumpY,
                scale: 1 - jumpScale
            }}
            animate={{ 
                opacity: 1,
                y: 0,
                scale: 1
            }}
            exit={{ 
                opacity: 0,
                y: - jumpY,
                scale: 1 + jumpScale
            }}
            transition={transitionSettings} 
        >
            {children}
        </motion.div>
    )
}

const AuthPageAnim = ({ children }) => {
    return (
        <motion.div
            className='cont'
            initial={{
                opacity: 0, 
                y: - jumpY,
                // scale: 1 - jumpScale
            }}
            animate={{ 
                opacity: 1,
                y: 0,
                // scale: 1
            }}
            exit={{ 
                opacity: 0,
                y: jumpY,
                scale: 1 + jumpScale
            }}
            transition={transitionSettings} 
        >
            {children}
        </motion.div>
    )
}

export { ClassicAnim, AuthPageAnim }