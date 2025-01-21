import React, { useEffect, useRef, useState } from 'react'
import timeout from "../../../../utils/timeout"
import ToolTip, { ToolTipProps } from "../../../others/ToolTip/ToolTip"
import { capitalize } from "../../../../utils/capitalize"
import SelectDropDown, { ISelectDropDownOptionListElem } from "../../SelectDropDown/SelectDropDown"



type SelectButtonProps = {
	OPTIONS_LIST: ISelectDropDownOptionListElem[];
	selectedState: ISelectDropDownOptionListElem;
	setSelectedState?: (state: ISelectDropDownOptionListElem) => void
	onClick?: (state?: ISelectDropDownOptionListElem) => void;
	needToSort?: boolean;
	toolTip?: ToolTipProps;
}
const SelectButton = ({ OPTIONS_LIST, selectedState, setSelectedState, onClick, needToSort=true, toolTip }: SelectButtonProps) => {

	const [isDropDownOpened, setIsDropDownOpened] = useState(true)

	const butRef = useRef(null)

	const handleClickBut = () => {
		// console.log(HANDLED_LIST)
		setIsDropDownOpened(!isDropDownOpened)
	}
	const handleClickOption = async ({ id, title }: ISelectDropDownOptionListElem) => {
		setIsDropDownOpened(false)
		butRef.current.classList.add('hide')
		
		await timeout(400)

		if (onClick) {
			onClick({ id, title })
		}

		if (setSelectedState) {
			setSelectedState({ id, title })
		}
	}

	useEffect(() => {
		if (selectedState?.title) {
			butRef.current.classList.remove('hide')
		}
	}, [selectedState?.title])

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
					className={`select_but_selected ${isDropDownOpened ? 'active' : ''}`}
				>
					{capitalize(selectedState?.title || '')}
				</p>
				<ToolTip { ...toolTip } />
			</button>
			<SelectDropDown
				OPTIONS_LIST={OPTIONS_LIST}
				handleClickOption={handleClickOption}
				selectedState={selectedState}
				needToSort={needToSort}
				closeHooksParams={{
					butRef: butRef,
					callback: () => setIsDropDownOpened(false),
					conditionsList: [isDropDownOpened]
				}}
			/>
		</div>
	)
}

		export default SelectButton