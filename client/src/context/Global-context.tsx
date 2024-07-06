import { createContext, useState } from "react"
import { useToasterStore } from 'react-hot-toast'
import React from "react"



export const GlobalContext = createContext({})

const GlobalProvider = ({ children }) => {
	
	const { toasts } = useToasterStore()


    return (
		<GlobalContext.Provider
			value={{
				toasts
			}}
		>
		    {children}
		</GlobalContext.Provider>
	)
}

export default GlobalProvider