import React from 'react'

import clsx from 'clsx'

import { APP_TITLE } from '@/../constants'
import { useBlockErrorState } from '@stores/Device-store'



type CoverAppTitleProps = {
	dim?: boolean;
}
const CoverAppTitle = ({ dim }: CoverAppTitleProps) => {

	const isAppBlocked = useBlockErrorState(s => s.isAppBlocked())


	return (
		<div
			className={clsx(
				'coverAppTitle',
				'cont',
				isAppBlocked && 'block',
				dim && 'dim',
			)}
		>
			{APP_TITLE}
		</div>
	)
}

export default CoverAppTitle