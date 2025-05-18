import React, { useEffect } from 'react'

import clsx from 'clsx'
import toast, { useToasterStore } from 'react-hot-toast'

import { TOAST_LIMIT } from '@/../constants'
import { ICONS } from '@assets/common/Icons-data'
import { ICommonVar, SnackBarTypeOptions } from '@shared/types/Global-types'
import { useModalState } from '@stores/Utils-store'



type ISnackElem = {
	visible: boolean;
	id: string;
}

type SnackBarProps = {
	title: string;
	icon: ICommonVar['icon'];
	message: string;
	toastElem: ISnackElem;
	type: SnackBarTypeOptions;
}
const SnackBar = ({ title, icon, message, toastElem, type }: SnackBarProps) => {

	const { toasts } = useToasterStore()
	const [addModal, removeModal] = useModalState(s => [s.addModal, s.removeModal])

	useEffect(() => {
		toasts
			.filter(t => t.visible && t.duration !== Infinity)
			.filter((_, i) => i >= TOAST_LIMIT - 1)
			.forEach(t => toast.dismiss(t.id))
	}, [toasts])

	const handleCloseOnEsc = () => {
		if (toasts.some(t => t.visible && t.duration !== Infinity)) {
			toasts
				.filter(t => t.visible && t.duration !== Infinity)
				.forEach(t => toast.dismiss(t.id))
		}
	}

	// useCloseOnEsc({
	// 	conditionsList: [!!toasts[0]],
	// 	callback: () => {
	// 		if (toasts.some(t => t.visible && t.duration !== Infinity)) {
	// 			toasts
	// 				.filter(t => t.visible && t.duration !== Infinity)
	// 				.forEach(t => toast.dismiss(t.id))
	// 		}
	// 	},
	// })

	//* For forms Esc blur while any (not Infinity) SnackBar is opened
	useEffect(() => {
		if (toasts[0]) {
			if (toasts.some(t => t.visible && t.duration !== Infinity)) {
				addModal({
					type: 'snack',
					name: message,
					callback: handleCloseOnEsc,
				})
			} else {
				removeModal({
					type: 'snack',
				})
			}
		}
	}, [toasts])


	return (
		<button
			className={clsx(
				'snackbar-cont',
				'cont',
				toastElem.visible ? 'opened' : 'closed',
				type === 'b' && 'blocked',
			)}
			type='button'
			tabIndex={-1}
			onClick={(e) => {
				e.stopPropagation()
				if (type !== 'b') toast.dismiss(toastElem.id)
			}}
		>
			{icon}
			<div className='snackbar-message cont'>
				<h4>{title}</h4>
				<p dangerouslySetInnerHTML={{ __html: message }}></p>
			</div>
			{
				type !== 'b' ?
					<div
						className='snackbar_close-icon before_hover-but cont'
					>
						{ICONS.closeCircled}
					</div>
					:
					null
			}
		</button>
	)
}

export default SnackBar