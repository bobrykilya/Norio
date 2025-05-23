const nextElems = (elem: HTMLElement, steps?: number, isUseParentElem?: boolean) => {
	if (!elem) {
		return null
	}

	const getNextElem = (elem: HTMLElement) => {
		if (isUseParentElem) {
			return elem.parentElement.nextElementSibling?.children[0] as HTMLElement
		}
		return elem.nextElementSibling as HTMLElement
	}
	if (steps && steps !== 1) {
		return nextElems(getNextElem(elem), steps - 1, isUseParentElem)
	}

	return getNextElem(elem)
}

const prevElems = (elem: HTMLElement, steps?: number, isUseParentElem?: boolean) => {
	if (!elem) {
		return null
	}
	const getPrevElem = (elem: HTMLElement) => {
		if (isUseParentElem) {
			return elem.parentElement?.previousElementSibling?.children[0] as HTMLElement
		}
		return elem.previousElementSibling as HTMLElement
	}
	if (steps && steps !== 1) {
		return prevElems(getPrevElem(elem), steps - 1, isUseParentElem)
	}

	return getPrevElem(elem)
}

const getFirstChild = (elem: HTMLElement) => {
	return elem.children[0] as HTMLElement
}


export {
	nextElems,
	prevElems,
	getFirstChild,
}