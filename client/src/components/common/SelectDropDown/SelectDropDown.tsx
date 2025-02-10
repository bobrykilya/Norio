import React, { useEffect, useRef } from 'react'
import DropDown from "../DropDown/DropDown"
import { sortByAlphabet } from "../../../utils/sort"
import { ICloseHooksParams, ICommonVar } from "../../../../../common/types/Global-types"
import { getFirstChild, nextElems, prevElems } from "../../../utils/focusElementSibling"



const moveFixedElemUp = (a: { isFixed?: boolean }, b: { isFixed?: boolean }) => {
	return a?.isFixed ? -1 : b?.isFixed ? 1 : 0
}


export type ISelectDropDownOptionListElem = {
	id: string;
	title: string;
	icon?: ICommonVar['icon'];
	isFixed?: boolean;
}

type SelectDropDownProps = {
	OPTIONS_LIST: ISelectDropDownOptionListElem[];
	handleClickOption: (...args: any[]) => void;
	dropDownTitle?: string;
	selectedState?: ISelectDropDownOptionListElem;
	needToSort?: boolean;
	closeHooksParams: ICloseHooksParams;
}
const SelectDropDown = ({ OPTIONS_LIST, handleClickOption, dropDownTitle, selectedState, needToSort, closeHooksParams }: SelectDropDownProps) => {

	const dropDownRef = useRef(null)
	const SORTED_LIST: ISelectDropDownOptionListElem[] = needToSort ? sortByAlphabet(OPTIONS_LIST, 'title') : OPTIONS_LIST
	const HANDLED_LIST = SORTED_LIST.sort(moveFixedElemUp)


	const handleClickElem = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, state: ISelectDropDownOptionListElem) => {
		e.currentTarget.blur()
		handleClickOption(state)
	}

	const handleKeyDownOnDropDown = (e: React.KeyboardEvent<HTMLUListElement>) => {

		const isElemSuitable = (elem: HTMLElement) => {
			return !elem.classList.contains('active') && !elem.classList.contains('dropdown-title')
		}

		if (e.code === 'Escape') {
			prevElems(e.currentTarget).focus()
			return
		}
		if (e.code === 'Tab') {
			closeHooksParams.callback()
			return
		}
		if (!e.code.includes('Arrow')) {
			return
		}
		
		e.preventDefault()
		const active = document.activeElement as HTMLElement

		if (active.classList.contains('dropdown-cont')) {
			const firstChild = getFirstChild(e.currentTarget)
			if (!firstChild) {
				return
			}

			if (isElemSuitable(firstChild)) {
				firstChild.focus()
			} else {
				nextElems(firstChild, 1)?.focus()
			}
			return
		}

		switch(e.code) {
			case 'ArrowUp':
				if (!prevElems(active)) {
					return
				}

				if (isElemSuitable(prevElems(active))) {
					prevElems(active)?.focus()
				} else {
					prevElems(active, 2)?.focus()
				}
				break
			case 'ArrowDown':
				if (!nextElems(active)) {
					return
				}

				if (isElemSuitable(nextElems(active))) {
					nextElems(active)?.focus()
				} else {
					nextElems(active, 2)?.focus()
				}
				break
		}
	}


	useEffect(() => {
		if (closeHooksParams.conditionsList[0]) {
			dropDownRef.current.focus()
		}
	}, [closeHooksParams.conditionsList[0]])


	return (
		<DropDown
			closeHooksParams={closeHooksParams}
			ref={dropDownRef}
			onKeyDown={handleKeyDownOnDropDown}
		>
			{
				dropDownTitle &&
				<div
					className={'option-but fixed cont dropdown-title'}
				>
					{dropDownTitle}
				</div>
			}
			{
				HANDLED_LIST.map((el) => {
					return <button
						key={el.id}
						tabIndex={-1}
						type={'button'}
						className={`option-but cont ${el.isFixed ? 'fixed' : ''} ${(el.id === selectedState?.id) ? 'active' : ''}`}
						onClick={(e) => handleClickElem(e, el)}
					>
						{el?.icon}
						<p>
							{el.title}
						</p>
					</button>
				})
			}
		</DropDown>
	)
}

export default SelectDropDown