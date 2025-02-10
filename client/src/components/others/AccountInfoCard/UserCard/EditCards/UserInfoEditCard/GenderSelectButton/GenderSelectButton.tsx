import React from 'react'
import { GENDER_LIST } from "../../../../../../../assets/common/Common-data"
import SelectButton from "../../../../../../common/Inputs/SelectButton/SelectButton"
import { ISelectDropDownOptionListElem } from "../../../../../../common/SelectDropDown/SelectDropDown"



type GenderSelectButtonProps = {
	selectedState: ISelectDropDownOptionListElem;
	onClick: (state: ISelectDropDownOptionListElem) => void;
}
const GenderSelectButton = ({ selectedState, onClick }: GenderSelectButtonProps) => {


	return (
		<>
			<SelectButton
				contClassName={'gender_select_but-cont'}
				OPTIONS_LIST={GENDER_LIST}
				selectedState={selectedState}
				placeholder={'Хз'}
				onClick={onClick}
			/>
			<div
				className={`user_info_edit_card_gender_empty-icon ${!Boolean(selectedState) ? 'visible' : ''}`}
			/>
		</>
	)
}

export default GenderSelectButton