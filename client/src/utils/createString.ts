export const getPathToAvatar = (name: string) => {
	return `/avatars/${name}.jpg`
}

export const getPathToLogo = () => {
	return `/logos/app_logo.png`
}

type CreateNameOptions = 'lastName' | 'firstName' | 'middleName'
export const createName = (data: Record<string, any>, list: Array<CreateNameOptions>) => {
	let result: string = ''
	list.forEach(el => {
		result += data[el] + ' '
	})

	return result.trimEnd()
}