import React, { forwardRef, useRef } from 'react'
import { useClickOutside } from "../../../hooks/useClickOutside"
import useCloseOnEsc from "../../../hooks/useCloseOnEsc"
import { ICloseHooksParams } from "../../../../../common/types/Global-types"



type DropDownProps = {
	children: any;
	onClick?: (e: React.MouseEvent<HTMLUListElement, MouseEvent>) => void;
	className?: string;
	isScrollContent?: boolean;
	closeHooksParams: ICloseHooksParams;
}
const DropDown = forwardRef(({ children, onClick, className, isScrollContent, closeHooksParams }: DropDownProps, ref?: React.RefObject<HTMLUListElement>) => {
	const dropDownRef = ref || useRef(null)
	// console.log({ dropDownRef: dropDownRef.current, ...closeHooksParams })

	useClickOutside({
		ref: dropDownRef,
		callback: closeHooksParams.callback,
		condition: closeHooksParams.conditionsList[0],
		butRef: closeHooksParams.butRef
	})

	useCloseOnEsc({
		callback: closeHooksParams.callback,
		conditionsList: closeHooksParams.conditionsList
	})

	return (
		<ul
			className={`${className ? className : ''} ${isScrollContent ? 'scroll' : ''} dropdown-cont ${closeHooksParams.conditionsList[0] ? 'opened' : ''}`}
			onClick={onClick}
			tabIndex={-1}
			ref={dropDownRef}
		>
			{children}
		</ul>
	)
})

export default DropDown