import { showSnackMessage } from "../features/showSnackMessage/showSnackMessage"



const copyText = (text: string) => {
	navigator.clipboard.writeText(text)
		.then(() => {
			showSnackMessage({
				type: "s",
				messageTitle: 'Скопировано:',
				message: text
			})
		})
		.catch(() => {
			showSnackMessage({
				type: "e",
				message: `Не удалось скопировать: <span class=\'bold\'>${text}</span>`,
			})
		})
}


export {
	copyText
}