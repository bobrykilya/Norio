export const sortByAlphabet = (LIST: any[], propName?: string) => {
	// console.log(LIST)
	if (propName) {
		return LIST.sort((a: { propName: string }, b: { propName: string }) => a[propName].toLowerCase().localeCompare(b[propName].toLowerCase()))
	}
	return LIST.sort((a: string, b: string) => a.toLowerCase().localeCompare(b.toLowerCase()))
}

export const sortByValPosInString = (LIST: any[], val: string, propName?: string) => {
	if (propName) {
		return LIST.sort(
			(a: { propName: string }, b: { propName: string }) => a[propName].toLowerCase().indexOf(val) > b[propName].toLowerCase().indexOf(val) ? 1 : -1
		)
	}
	return LIST.sort(
		(a: string, b: string) => a.toLowerCase().indexOf(val) > b.toLowerCase().indexOf(val) ? 1 : -1
	)
}