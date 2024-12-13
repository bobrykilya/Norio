import { useEffect } from "react"



type IUseCloseOnEsc = {
	successConditionsList: boolean[];
	successFun: () => void;
}
const useCloseOnEsc = ({ successConditionsList, successFun }: IUseCloseOnEsc) => {
	const closeOnEsc = async (e: KeyboardEvent) => {
		// console.log(e.code)
		if (e.code === 'Escape') {
			e.preventDefault()
			successFun()
		}
	}

	//* Esc keyDown handling
	useEffect(() => {
		if (successConditionsList.includes(false)) return

		window.addEventListener("keydown", closeOnEsc)

		return () => {
			window.removeEventListener("keydown", closeOnEsc)
		}
	}, successConditionsList)
}

export default useCloseOnEsc