import { useEffect } from "react"



type IUseCloseOnEsc = {
	conditionsList: boolean[];
	successFun: () => void;
}
const useCloseOnEsc = ({ conditionsList, successFun }: IUseCloseOnEsc) => {
	const closeOnEsc = async (e: KeyboardEvent) => {
		if (e.code === 'Escape') {
			successFun()
		}
	}

	//* Esc keyDown handling
	useEffect(() => {
		if (!conditionsList.includes(false)) return

		window.addEventListener("keydown", closeOnEsc)

		return () => {
			window.removeEventListener("keydown", closeOnEsc)
		}
	}, conditionsList)
}

export default useCloseOnEsc