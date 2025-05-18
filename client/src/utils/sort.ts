export function sortByAlphabet<T>(LIST: T[], propName?: keyof T): T[] {
	if (propName) {
		return [...LIST]
			.sort((a, b) =>
				a[propName]
					.toString()
					.toLowerCase()
					.localeCompare(b[propName]
						.toString()
						.toLowerCase(),
					),
			)
	}
	return [...LIST].sort((a, b) =>
		a
			.toString()
			.toLowerCase()
			.localeCompare(b
				.toString()
				.toLowerCase(),
			),
	)
}


export function sortByValPosInString<T>(LIST: T[], val: string, propName?: keyof T): T[] {
	const getHandledStr = (str: T[keyof T] | T): string => {
		return str.toString().toLowerCase()
	}
	if (propName) {
		return [...LIST].sort((a, b) => {
			const aVal = getHandledStr(a[propName])
			const bVal = getHandledStr(b[propName])
			return aVal.indexOf(val.toLowerCase()) - bVal.indexOf(val.toLowerCase())
		})
	}
	return [...LIST].sort((a, b) => {
		const aVal = getHandledStr(a)
		const bVal = getHandledStr(b)
		return aVal.indexOf(val.toLowerCase()) - bVal.indexOf(val.toLowerCase())
	})
}