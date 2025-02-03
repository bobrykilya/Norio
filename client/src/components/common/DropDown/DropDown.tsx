import React, { forwardRef, useEffect, useRef } from 'react'
import { useClickOutside } from "../../../hooks/useClickOutside"
import useCloseOnEsc from "../../../hooks/useCloseOnEsc"
import { ICloseHooksParams } from "../../../../../common/types/Global-types"
import { useModalState } from "../../../stores/Global-store"



type DropDownProps = {
	children: any;
	closeHooksParams: ICloseHooksParams;
	onClick?: (e: React.MouseEvent<HTMLUListElement, MouseEvent>) => void;
	className?: string;
	isScrollContent?: boolean;
}
const DropDown = forwardRef(({ children, closeHooksParams, onClick, className, isScrollContent }: DropDownProps, ref?: React.RefObject<HTMLUListElement>) => {

	const dropDownRef = ref || useRef(null)
	const setModalState = useModalState(s => s.setModalState) //* For forms Esc blur while any DropDown is opened
	// console.log({ dropDownRef: dropDownRef.current, ...closeHooksParams })

	useClickOutside({
		ref: dropDownRef,
		butRef: closeHooksParams.butRef,
		callback: closeHooksParams.callback,
		conditionsList: closeHooksParams.conditionsList
	})

	useCloseOnEsc({
		callback: closeHooksParams.callback,
		conditionsList: closeHooksParams.conditionsList
	})

	useEffect(() => {
		if (closeHooksParams.conditionsList[0]) {
			setModalState(true)
		} else {
			setModalState(false)
		}
	}, [closeHooksParams.conditionsList[0]])

	return (
		<ul
			className={`${className ? className : ''} ${isScrollContent ? 'scroll' : ''} dropdown-cont ${closeHooksParams.conditionsList[0] ? 'opened' : ''}`}
			onClick={(e) => {
				e.stopPropagation()
				if (onClick) {
					onClick(e)
				}
			}}
			tabIndex={-1}
			ref={dropDownRef}
		>
			{children}
		</ul>
	)
})

export default DropDown