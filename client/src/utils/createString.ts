export const getPathToAvatar = (name: string) => {
	return `/avatars/${name}.jpg`
}

export const getPathToLogo = () => {
	return `/logos/app_logo.png`
}

type CreateNameOptions = 'lastName' | 'firstName' | 'middleName' | 'username'
export const createName = (data: Record<string, any>, list: Array<CreateNameOptions>) => {
	let result: string = ''
	list.forEach(el => {
		if (el === 'username') {
			result += `\"${data[el]}\" `
			return
		}
		result += data[el] + ' '
	})

	return result.trimEnd()
}