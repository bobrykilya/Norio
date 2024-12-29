import React, { forwardRef, RefObject, useRef } from 'react'
import { useClickOutside } from "../../../hooks/useClickOutside"
import useCloseOnEsc from "../../../hooks/useCloseOnEsc"



type DropDownProps = {
	children: any;
	isDropDownOpened: boolean;
	onClick?: (e: React.MouseEvent<HTMLUListElement, MouseEvent>) => void;
	className?: string;
	isScrollContent?: boolean;
	clickOutsideParams?: {
		butRef: RefObject<HTMLElement>;
		callback: () => void;
		condition?: boolean;
	}
	closeOnEscParams?: {
		conditionsList: boolean[];
		callback: () => void;
	}
}
const DropDown = forwardRef(({ children, isDropDownOpened, onClick, className, isScrollContent, clickOutsideParams, closeOnEscParams }: DropDownProps, ref?: React.RefObject<HTMLUListElement>) => {
	const dropDownRef = ref || useRef(null)
	// console.log(dropDownRef.current)

	useClickOutside({
		ref: dropDownRef,
		...clickOutsideParams
	})

	useCloseOnEsc({
		...closeOnEscParams
	})

	return (
		<ul
			className={`${className || ''} ${isScrollContent ? 'scroll' : ''} dropdown-cont ${isDropDownOpened ? 'opened' : ''}`}
			onClick={onClick}
			tabIndex={-1}
			ref={dropDownRef}
		>
			{children}
		</ul>
	)
})

export default DropDown