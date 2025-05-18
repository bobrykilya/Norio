import React from 'react'

import RoundButton, { RoundButtonProps } from '../RoundButton/RoundButton'



type FastRoundButtonProps = RoundButtonProps & {
	notif?: number;
}
const FastRoundButton = ({ notif, className, children, ...props }: FastRoundButtonProps) => {


	return (
		<RoundButton
			className={className + ' fast_round-but'}
			{...props}
		>
			{children}
			{
				notif &&
				<>
					<div
						className={'notif_circle_cover'}
					>

					</div>
					<div
						className={'notif_circle cont'}
					>
						{notif}
					</div>
				</>
			}
		</RoundButton>
	)
}

export default FastRoundButton