import React, { useRef, useState } from 'react'
import DropDown from "../../DropDown/DropDown"
import { useClickOutside } from "../../../../hooks/useClickOutside"
import { ICommonVar } from "../../../../../../common/types/Global-types"
import { sortByAlphabet } from "../../../../utils/sort"
import timeout from "../../../../utils/timeout"
import ToolTip, { ToolTipProps } from "../../../others/ToolTip/ToolTip"



const moveFixedElemUp = (a: { isFixed?: boolean }, b: { isFixed?: boolean }) => {
	return a?.isFixed ? -1 : b?.isFixed ? 1 : 0
}


export type ISelectButtonOptionListElem = {
	id: string;
	title: string;
	icon?: ICommonVar['icon'];
	isFixed?: boolean;
	otherTitle?: boolean;
}

type SelectButtonProps = {
	selected: ISelectButtonOptionListElem;
	OPTIONS_LIST: ISelectButtonOptionListElem[]
	onClick?: (id: string) => Promise<string>;
	needToSort?: boolean;
	toolTip?: ToolTipProps;
}
const SelectButton = ({ selected, OPTIONS_LIST, onClick, needToSort=true, toolTip }: SelectButtonProps) => {
	// const FILTERED_LIST = OPTIONS_LIST.filter(el => el.id !== selected)
	const SORTED_LIST: ISelectButtonOptionListElem[] = needToSort ? sortByAlphabet(OPTIONS_LIST, 'title') : OPTIONS_LIST
	const HANDLED_LIST = SORTED_LIST.sort(moveFixedElemUp)
	const [isDropDownOpened, setIsDropDownOpened] = useState(false)
	const [selectedState, setSelectedState] = useState(selected)
	const dropDownRef = useRef(null)
	const butRef = useRef(null)


	const handleClickBut = () => {
		// console.log(HANDLED_LIST)
		setIsDropDownOpened(!isDropDownOpened)
	}
	const handleClickOption = async ({ id, title }: ISelectButtonOptionListElem) => {
		setIsDropDownOpened(false)
		butRef.current.classList.add('hide')
		const handledTitle = onClick ? await onClick(id) : null

		await timeout(400)
		setSelectedState({
			id,
			title: handledTitle || title,
		})
		butRef.current.classList.remove('hide')
	}

	useClickOutside(dropDownRef, () => {
		setIsDropDownOpened(false)
	}, butRef, isDropDownOpened)

	return (
		<div
			className={'select_but-cont cont'}
		>
			<button
				className={'select-but'}
				tabIndex={-1}
				onClick={handleClickBut}
				ref={butRef}
			>
				<p
					className={'select_but_selected'}
				>
					{selectedState.title}
				</p>
				<ToolTip { ...toolTip } isBlock={isDropDownOpened} />
			</button>
			<DropDown
				isDropDownOpened={isDropDownOpened}
				ref={dropDownRef}
			>
				{HANDLED_LIST.map((el) => {
					return <button
						key={el.id}
						tabIndex={-1}
						className={`option-but cont ${el.isFixed ? 'fixed' : ''} ${el.id === selectedState.id ? 'active' : ''}`}
						onClick={() => handleClickOption({ ...el })}
					>
						{el?.icon}
						<p>
							{el.title}
						</p>
					</button>
				})}
			</DropDown>
		</div>
	)
}

		export default SelectButton