import React, { forwardRef, useRef } from 'react'



type DropDownProps = {
	children: any;
	className?: string;
	isDropDownOpened: boolean;
	onClick: (e:  React.MouseEvent<HTMLUListElement, MouseEvent>) => void;
}
const DropDown = forwardRef(({ children, className, isDropDownOpened, onClick }: DropDownProps, ref?: React.RefObject<HTMLUListElement>) => {
	const dropDownRef = ref || useRef(null)
	// console.log(dropDownRef.current)

	return (
		<ul
			className={`${className || ''} dropdown-cont ${isDropDownOpened ? 'opened' : ''}`}
			onClick={onClick}
			tabIndex={-1}
			ref={dropDownRef}
		>
			{children}
		</ul>
	)
})

export default DropDown