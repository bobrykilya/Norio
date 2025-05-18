import React, { ButtonHTMLAttributes, forwardRef } from 'react'

import clsx from 'clsx'

import ToolTip, { ToolTipProps } from '@others/ToolTip/ToolTip'
import { SizeOptions } from '@type/Global-types'



export type RoundButtonProps = {
	toolTip?: ToolTipProps;
	size?: SizeOptions;
	bigZIndex?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>
const RoundButton = forwardRef<HTMLButtonElement, RoundButtonProps>(({
																		 toolTip,
																		 size = 'm',
																		 bigZIndex,
																		 className,
																		 children,
																		 tabIndex,
																		 type,
																		 ...otherProps
																	 }, ref) => {


	return (
		<button
			{...otherProps}
			className={clsx(
				className,
				'round-but',
				size && `${size}_size`,
				bigZIndex && 'bigZIndex',
				'cont',
			)}
			type={type || 'button'}
			tabIndex={tabIndex ? tabIndex : type !== 'submit' && -1}
			ref={ref}
		>
			{children}
			{toolTip && <ToolTip {...toolTip} />}
		</button>
	)
})

export default RoundButton