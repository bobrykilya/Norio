import React, { useEffect } from 'react'

import toast, { useToasterStore } from 'react-hot-toast'

import { showSnackMessage } from '@features/showSnackMessage/showSnackMessage'
import { useBlockErrorState } from '@stores/Device-store'



const LogBook = () => {

	const blockErrorState = useBlockErrorState(s => s.blockErrorMessage)
	const { toasts } = useToasterStore()

	const closeLogBook = () => {
		// console.log(blockErrorMessage)
		if (blockErrorState) {
			showSnackMessage({ type: 'b', message: blockErrorState })
		} //! onClose
	}
	const openLogBook = () => {
		// console.log(toasts)
		if (toasts[0]) {
			toasts.forEach(t => {
				toast.dismiss(t.id)
			})
		}
	}
	useEffect(() => {
		openLogBook()
	}, [])

	const data = {}
	const columns = {}

	return (
		<div
			className={'log_book-cont'}
		>
			{/* <TableCollapsibleRow data={data} columns={columns} /> */}
		</div>
	)
}

export default LogBook