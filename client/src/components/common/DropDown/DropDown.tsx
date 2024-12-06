import React, { forwardRef, useRef } from 'react'



type DropDownProps = {
	children: any;
	isDropDownOpened: boolean;
	onClick: (e:  React.MouseEvent<HTMLUListElement, MouseEvent>) => void;
	className?: string;
	isScrollContent?: boolean;
}
const DropDown = forwardRef(({ children, isDropDownOpened, onClick, className, isScrollContent }: DropDownProps, ref?: React.RefObject<HTMLUListElement>) => {
	const dropDownRef = ref || useRef(null)
	// console.log(dropDownRef.current)

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