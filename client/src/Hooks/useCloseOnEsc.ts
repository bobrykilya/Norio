import { useEffect } from "react"



export type IUseCloseOnEsc = {
	conditionsList: boolean[];
	callback: () => void;
}
const useCloseOnEsc = ({ conditionsList, callback }: IUseCloseOnEsc) => {
	const closeOnEsc = async (e: KeyboardEvent) => {
		// console.log(e.code)
		if (e.code === 'Escape') {
			e.preventDefault()
			callback()
		}
	}

	//* Esc keyDown handling
	useEffect(() => {
		if (!conditionsList || conditionsList.includes(false)) return

		window.addEventListener("keydown", closeOnEsc)

		return () => {
			window.removeEventListener("keydown", closeOnEsc)
		}
	}, conditionsList)
}

export default useCloseOnEsc