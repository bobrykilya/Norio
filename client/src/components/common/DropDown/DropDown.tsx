import React, { forwardRef, useEffect, useRef } from 'react'

import { ICloseHooksParams } from '@shared/types/Global-types'
import { useModalState } from '@stores/Utils-store'



type DropDownProps = {
	children: any;
	closeHooksParams: ICloseHooksParams;
	onClick?: (e: React.MouseEvent<HTMLUListElement, MouseEvent>) => void;
	isScrollContent?: boolean;
	onKeyDown?: (e: React.KeyboardEvent<HTMLUListElement>) => void;
}
const DropDown = forwardRef(({
								 children,
								 closeHooksParams,
								 onClick,
								 isScrollContent,
								 ...restProps
							 }: DropDownProps, ref?: React.RefObject<HTMLUListElement>) => {

	const dropDownRef = ref || useRef(null)

	//* For forms Esc blur while any DropDown is opened
	const [addModal, removeModal] = useModalState(s => [s.addModal, s.removeModal])
	const isOpened = closeHooksParams.conditionsList[0]

	// useClickOutside({
	// 	ref: dropDownRef,
	// 	butRef: closeHooksParams.butRef,
	// 	callback: closeHooksParams.callback,
	// 	conditionsList: closeHooksParams.conditionsList,
	// })
	//
	// useCloseOnEsc({
	// 	callback: closeHooksParams.callback,
	// 	conditionsList: closeHooksParams.conditionsList,
	// })

	useEffect(() => {
		if (isOpened) {
			addModal({
				type: 'dropDown',
				callback: closeHooksParams.callback,
				clickOutsideParams: {
					ref: dropDownRef,
					butRef: closeHooksParams.butRef,
				},
			})
		} else {
			removeModal({
				type: 'dropDown',
			})
		}
	}, [isOpened])


	return (
		<ul
			className={`${isScrollContent ? 'scroll' : ''} dropdown-cont ${isOpened ? 'opened' : ''}`}
			onClick={(e) => {
				e.stopPropagation()
				if (onClick) {
					onClick(e)
				}
			}}
			tabIndex={-1}
			ref={dropDownRef}
			{...restProps}
		>
			{children}
		</ul>
	)
})

export default DropDown