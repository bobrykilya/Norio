import { createContext, useState } from "react"
import { useToasterStore } from 'react-hot-toast'
import React from "react"



export const GlobalContext = createContext({})

const GlobalProvider = ({ children }) => {
    const [isErrorsLogListOpened, setIsErrorsLogListOpened] = useState<Boolean>(false)
	const { toasts } = useToasterStore()

    return (
		<GlobalContext.Provider
			value={{
                isErrorsLogListOpened,
                setIsErrorsLogListOpened,
				toasts,
			}}
		>
		    {children}
		</GlobalContext.Provider>
	)
}

export default GlobalProvider