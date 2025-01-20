import React, { useEffect, useState } from "react"
import SelectDropDown, { ISelectDropDownOptionListElem } from "../SelectDropDown/SelectDropDown"
import { ICloseHooksParams } from "../../../../../common/types/Global-types"
import { createPortal } from "react-dom";



export type IContextMenuInfo = {
	state: boolean;
	x: number;
	y: number;
};
type ContextMenuProps = {
	contextMenuInfo: IContextMenuInfo;
	OPTIONS_LIST: ISelectDropDownOptionListElem[];
	handleClickOption: (...args: any[]) => void;
	closeHooksParams: ICloseHooksParams;
	needToSort?: boolean;
	dropDownTitle?: string;
}
const ContextMenu = ({ contextMenuInfo, OPTIONS_LIST, handleClickOption, closeHooksParams, needToSort, dropDownTitle }: ContextMenuProps) => {

	// console.log(contextMenuInfo)
	const [domReady, setDomReady] = useState(false)
	const mainPageElem = document.getElementById('main_page-cont')

	// useEffect(() => {
	// 	if (contextMenuInfo.state) {
	//
	// 	}
	// }, [contextMenuInfo])

	useEffect(() => {
		setDomReady(true)
	}, [])


	return (
		<>
			{
				domReady &&
				createPortal(
					<div
						className={`context_menu-cont cont ${contextMenuInfo.state ? 'opened' : ''}`}
						style={{ left: contextMenuInfo.x, top: contextMenuInfo.y }}
					>
						<SelectDropDown
							OPTIONS_LIST={OPTIONS_LIST}
							handleClickOption={handleClickOption}
							needToSort={needToSort}
							closeHooksParams={closeHooksParams}
							dropDownTitle={dropDownTitle}
						/>
					</div>,
					mainPageElem
				)
			}
		</>
	)
}

export default ContextMenu