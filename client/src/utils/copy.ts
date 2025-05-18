import { showSnackMessage } from '@features/showSnackMessage/showSnackMessage'



const showCopyError = (text: string, err: string) => {
	showSnackMessage({
		type: 'e',
		message: `Не удалось скопировать: <span class=\'bold\'>${text}</span>.<br/>Ошибка: ${err}`,
	})
}

const copyText = (text: string) => {
	if (!text) {
		return
	}

	navigator.clipboard.writeText(text)
		.then(() => {
			showSnackMessage({
				type: 's',
				messageTitle: 'Скопировано:',
				message: text,
			})
		})
		.catch((err) => {
			showCopyError(text, err.message)
		})
}


export {
	copyText,
}