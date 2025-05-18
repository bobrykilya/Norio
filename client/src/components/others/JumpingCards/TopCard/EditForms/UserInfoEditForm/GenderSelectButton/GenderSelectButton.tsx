import React from 'react'

import clsx from 'clsx'

import { GENDER_LIST } from '@assets/common/Common-data'
import SelectButton from '@common/Inputs/SelectButton/SelectButton'
import { ISelectDropDownOptionListElem } from '@common/SelectDropDown/SelectDropDown'



type GenderSelectButtonProps = {
	selectedState: ISelectDropDownOptionListElem;
	onClick: (state: ISelectDropDownOptionListElem) => void;
}
const GenderSelectButton = ({ selectedState, onClick }: GenderSelectButtonProps) => {


	return (
		<div
			className={'gender_select_but_card-cont cont'}
		>
			<span
				className={'gender_select_but-title'}
			>
				Пол
			</span>
			<SelectButton
				contClassName={'gender_select_but-cont'}
				OPTIONS_LIST={GENDER_LIST}
				selectedState={selectedState}
				placeholder={'Хз'}
				onClick={onClick}
			/>
			<div
				className={clsx('gender_select_but_empty-icon', !Boolean(selectedState) && 'visible')}
			/>
		</div>
	)
}

export default GenderSelectButton