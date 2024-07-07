import React from "react"
import { createContext, useState } from "react"



export const GlobalContext = createContext({})

const GlobalProvider = ({ children }) => {
	


    return (
		<GlobalContext.Provider
			value={{
				
			}}
		>
		    {children}
		</GlobalContext.Provider>
	)
}

export default GlobalProvider