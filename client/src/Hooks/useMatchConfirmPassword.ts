import { useEffect } from "react"



type useMatchConfirmPasswordProps = {
	passVal: string;
	confirmVal: string;
	watch: any;
	setError: any;
}
export const useMatchConfirmPassword = ({ passVal, confirmVal, watch, setError }: useMatchConfirmPasswordProps) => {
	useEffect(() => {
		const pass = watch(passVal)
		const confirm = watch(confirmVal)
		if (pass && confirm) {
			pass !== confirm ?
				setError(confirmVal, { message: 'Пароли не совпадают' }) :
				setError(confirmVal, null)
		}
	}, [watch(passVal), watch(confirmVal)])
}