import React, { ButtonHTMLAttributes, forwardRef } from 'react'

import ToolTip, { ToolTipProps } from '@others/ToolTip/ToolTip'
import { SizeOptions } from '@type/Global-types'



export type RoundButtonProps = {
	toolTip?: ToolTipProps;
	size?: SizeOptions;
	bigZIndex?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>
const RoundButton = forwardRef<HTMLButtonElement, RoundButtonProps>(({
																		 toolTip,
																		 size,
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
			className={`${className || ''} round-but ${size ? size + '_size' : 'm_size'} ${bigZIndex ? 'bigZIndex' : ''} cont`}
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