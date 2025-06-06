import React from 'react'

import clsx from 'clsx'

import { Loader } from '@common/Loader/Loader'
import ToolTip, { ToolTipProps } from '@others/ToolTip/ToolTip'
import { ICommonVar } from '@shared/types/Global-types'



type SubmitButProps = {
	icon: ICommonVar['icon'];
	onClick?: () => void;
	isLoading?: boolean;
	useOnClick?: boolean;
	disabled?: boolean;
	blur?: boolean;
	toolTip?: ToolTipProps;
	tabNotBlur?: boolean;
}
const SubmitBut = ({ icon, onClick, isLoading, useOnClick, disabled, blur, toolTip, tabNotBlur }: SubmitButProps) => {

	return (
		<button
			className={clsx(
				'submit-but',
				'cont',
				blur && 'blur',
			)}
			type={useOnClick ? 'button' : 'submit'}
			tabIndex={tabNotBlur ? 0 : -1}
			disabled={disabled ? true : isLoading}
			onClick={useOnClick ? onClick : () => null}
		>
			{!isLoading ?
				icon :
				<Loader
					width='40'
				/>
			}
			{toolTip && <ToolTip {...toolTip} />}
		</button>
	)
}

export default SubmitBut