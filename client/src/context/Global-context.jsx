import { createContext, useState } from "react"



export const GlobalContext = createContext({})

const GlobalProvider = ({ children }) => {
    const [isErrorsLogListOpened, setIsErrorsLogListOpened] = useState(false)

    return (
		<GlobalContext.Provider
			value={{
                isErrorsLogListOpened,
                setIsErrorsLogListOpened,
			}}
		>
		    {children}
		</GlobalContext.Provider>
	)
}

export default GlobalProvider