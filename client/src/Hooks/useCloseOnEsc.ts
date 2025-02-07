import { useEffect } from "react"



export type IUseCloseOnEsc = {
	callback: () => void;
	conditionsList: boolean[];
}
const useCloseOnEsc = ({ callback, conditionsList }: IUseCloseOnEsc) => {
	
	const closeOnEsc = async (e: KeyboardEvent) => {
		// console.log(e.code)
		if (e.code === 'Escape') {
			e.preventDefault()
			callback()
		}
	}

	//* Esc keyDown handling
	useEffect(() => {
		if (conditionsList.includes(false)) return

		window.addEventListener("keydown", closeOnEsc)

		return () => {
			window.removeEventListener("keydown", closeOnEsc)
		}
	}, conditionsList)
}

export default useCloseOnEsc