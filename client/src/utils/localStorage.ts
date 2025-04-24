import { showSnackMessage } from "../features/showSnackMessage/showSnackMessage"



export const getLSObject = <T = any>(nameLS: string) => {
	try {
		return JSON.parse(localStorage.getItem(nameLS) || null) as T
	} catch (err) {
		showSnackMessage({
			type: "e",
			message: `Could not parse data: ${nameLS}`,
		})
		console.error(`Could not parse data (${nameLS}): ` + err )
		return null
	}
}

export const setLSObject = (nameLS: string, data: any) => {
	try {
		localStorage.setItem(nameLS, JSON.stringify(data))
	} catch (err) {
		showSnackMessage({
			type: "e",
			message: `Could not stringify data: ${nameLS}`
		})
		console.error(`Could not stringify data (${nameLS}): `, err)
	}
}

export const removeLS = (nameLS: string) => {
	localStorage.removeItem(nameLS)
}