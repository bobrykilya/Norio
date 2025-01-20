import React from 'react'
import DropDown from "../DropDown/DropDown"
import { sortByAlphabet } from "../../../utils/sort"
import { ICloseHooksParams, ICommonVar } from "../../../../../common/types/Global-types"



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

	const SORTED_LIST: ISelectDropDownOptionListElem[] = needToSort ? sortByAlphabet(OPTIONS_LIST, 'title') : OPTIONS_LIST
	const HANDLED_LIST = SORTED_LIST.sort(moveFixedElemUp)


	return (
		<DropDown
			closeHooksParams={closeHooksParams}
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
						className={`option-but cont ${el.isFixed ? 'fixed' : ''} ${(el.id === selectedState?.id) ? 'active' : ''}`}
						onClick={() => handleClickOption({ ...el })}
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