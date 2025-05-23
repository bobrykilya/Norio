import React, { useEffect, useRef, useState } from 'react'

import clsx from 'clsx'

import ToolTip, { ToolTipProps } from '../../../others/ToolTip/ToolTip'
import SelectDropDown, { ISelectDropDownOptionListElem } from '../../SelectDropDown/SelectDropDown'
import { capitalize } from '@utils/capitalize'
import timeout from '@utils/timeout'



type SelectButtonProps = {
	OPTIONS_LIST: ISelectDropDownOptionListElem[];
	selectedState?: ISelectDropDownOptionListElem;
	contClassName?: string;
	setSelectedState?: (state: ISelectDropDownOptionListElem) => void
	onClick?: (state?: ISelectDropDownOptionListElem) => void;
	needToSort?: boolean;
	toolTip?: ToolTipProps;
	placeholder?: string;
	isTabDisabled?: boolean;
}
const SelectButton = ({
						  OPTIONS_LIST,
						  selectedState,
						  contClassName,
						  setSelectedState,
						  onClick,
						  needToSort = true,
						  toolTip,
						  placeholder,
						  isTabDisabled = false,
					  }: SelectButtonProps) => {

	const [isDropDownOpened, setIsDropDownOpened] = useState(false)

	const butRef = useRef(null)

	const handleClickBut = () => {
		setIsDropDownOpened(prev => !prev)
	}
	const handleClickOption = async (state: ISelectDropDownOptionListElem) => {
		setIsDropDownOpened(false)
		butRef.current.classList.add('hide')

		await timeout(400)

		if (onClick) {
			onClick(state)
		}

		if (setSelectedState) {
			setSelectedState(state)
		}
	}

	const handleKeyDownOnSelectButton = (e: React.KeyboardEvent<HTMLButtonElement>) => {
		if (e.code === 'ArrowDown') {
			setIsDropDownOpened(true)
		}
	}

	useEffect(() => {
		if (selectedState?.title) {
			butRef.current.classList.remove('hide')
		}
	}, [selectedState?.title])


	return (
		<div
			className={clsx(contClassName, 'select_but-cont', 'cont')}
		>
			<button
				className={clsx('select-but', !selectedState?.title && !placeholder && 'empty')}
				type={'button'}
				tabIndex={isTabDisabled ? -1 : 0}
				onClick={handleClickBut}
				onKeyDown={handleKeyDownOnSelectButton}
				ref={butRef}
			>
				<div
					className={clsx(
						'select_but-content',
						'cont',
						isDropDownOpened && 'active',
						!selectedState?.title && 'placeholder',
					)}
				>
					{selectedState?.icon && selectedState.icon}
					<p
						className={'select_but_selected'}
					>
						{capitalize(selectedState?.title || placeholder || '')}
					</p>
				</div>
				{toolTip && <ToolTip {...toolTip} />}
			</button>
			<SelectDropDown
				OPTIONS_LIST={OPTIONS_LIST}
				handleClickOption={handleClickOption}
				selectedState={selectedState}
				needToSort={needToSort}
				closeHooksParams={{
					butRef: butRef,
					callback: () => setIsDropDownOpened(false),
					conditionsList: [isDropDownOpened],
				}}
			/>
		</div>
	)
}

export default SelectButton