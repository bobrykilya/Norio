import React, { useRef, useState } from 'react'
import { sortByAlphabet } from "../../../../utils/sort"
import DropDown from "../../DropDown/DropDown"
import { useClickOutside } from "../../../../hooks/useClickOutside"



type SelectButtonProps = {
	selected: string;
	SELECTS_LIST: string[]
	needToSort?: boolean;
}
const SelectButton = ({ selected, SELECTS_LIST, needToSort=true }: SelectButtonProps) => {
	const HANDLED_LIST = needToSort ? sortByAlphabet(SELECTS_LIST.filter((el) => el !== selected)) : SELECTS_LIST
	const [isDropDownOpened, setIsDropDownOpened] = useState(false)
	const dropDownRef = useRef(null)
	const butRef = useRef(null)

	const handleClickBut = () => {
		// console.log(HANDLED_LIST)
		setIsDropDownOpened(!isDropDownOpened)
	}
	const handleClickElem = () => {

	}

	useClickOutside(dropDownRef, () => {
		setIsDropDownOpened(false)
	}, butRef, isDropDownOpened)

	return (
		<>
			<button
				className={'select-but'}
				tabIndex={-1}
				onClick={handleClickBut}
				ref={butRef}
			>
				<div
					className={'selected'}
				>
					{selected}
				</div>
			</button>
			<DropDown
				// className={`select_list-cont`}
				isDropDownOpened={isDropDownOpened}
				onClick={handleClickElem}
				ref={dropDownRef}
			>
				{HANDLED_LIST.map((el: any, i: number) => {
					return <button
						key={i}
						tabIndex={-1}
						className={'choice-but cont'}
					>
						{el}
					</button>
				})}
			</DropDown>
		</>
	)
}

		export default SelectButton