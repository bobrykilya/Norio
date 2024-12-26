import React, { useRef, useState } from 'react'
import DropDown from "../../DropDown/DropDown"
import { useClickOutside } from "../../../../hooks/useClickOutside"
import { ICommonVar } from "../../../../../../common/types/Global-types"
import { sortByAlphabet } from "../../../../utils/sort"
import timeout from "../../../../utils/timeout"
import ToolTip, { ToolTipProps } from "../../../others/ToolTip/ToolTip"
import { capitalize } from "../../../../utils/capitalize"



const moveFixedElemUp = (a: { isFixed?: boolean }, b: { isFixed?: boolean }) => {
	return a?.isFixed ? -1 : b?.isFixed ? 1 : 0
}


export type ISelectButtonOptionListElem = {
	id: string;
	title: string;
	icon?: ICommonVar['icon'];
	isFixed?: boolean;
}

type SelectButtonProps = {
	OPTIONS_LIST: ISelectButtonOptionListElem[];
	selectedState: ISelectButtonOptionListElem;
	setSelectedState?: (state: ISelectButtonOptionListElem) => void
	onClick?: (state?: ISelectButtonOptionListElem) => void;
	needToSort?: boolean;
	toolTip?: ToolTipProps;
}
const SelectButton = ({ OPTIONS_LIST, selectedState, setSelectedState, onClick, needToSort=true, toolTip }: SelectButtonProps) => {

	const SORTED_LIST: ISelectButtonOptionListElem[] = needToSort ? sortByAlphabet(OPTIONS_LIST, 'title') : OPTIONS_LIST
	const HANDLED_LIST = SORTED_LIST.sort(moveFixedElemUp)
	const [isDropDownOpened, setIsDropDownOpened] = useState(false)
	const dropDownRef = useRef(null)
	const butRef = useRef(null)


	const handleClickBut = () => {
		// console.log(HANDLED_LIST)
		setIsDropDownOpened(!isDropDownOpened)
	}
	const handleClickOption = async ({ id, title }: ISelectButtonOptionListElem) => {
		setIsDropDownOpened(false)
		butRef.current.classList.add('hide')
		
		await timeout(400)

		if (onClick) {
			onClick({ id, title })
		}

		if (setSelectedState) {
			setSelectedState({ id, title })
		}

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
				className={`select-but ${!selectedState?.title ? 'empty' : ''}`}
				tabIndex={-1}
				onClick={handleClickBut}
				ref={butRef}
			>
				<p
					className={'select_but_selected'}
				>
					{capitalize(selectedState?.title)}
				</p>
				<ToolTip { ...toolTip } />
			</button>
			<DropDown
				isDropDownOpened={isDropDownOpened}
				ref={dropDownRef}
			>
				{HANDLED_LIST.map((el) => {
					return <button
						key={el.id}
						tabIndex={-1}
						className={`option-but cont ${el.isFixed ? 'fixed' : ''} ${(el.id === selectedState?.id) ? 'active' : ''}`}
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