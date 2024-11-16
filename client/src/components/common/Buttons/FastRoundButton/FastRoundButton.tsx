import React from 'react'
import ToolTip, { AvailableToolTipPositions } from "../../../others/ToolTip/ToolTip"



type FastRoundButtonProps = {
	icon: React.ReactElement;
	toolTip?: {
		text: string;
		position?: AvailableToolTipPositions;
	};
	notif?: number;
}
const FastRoundButton = ({ icon, toolTip, notif }: FastRoundButtonProps) => {


	return (
		<button
			className={'fast_button cont'}
		>
			{icon}
			{notif &&
				<>
					<div
						className={'notif_circle_cover'}
					></div>
					<div
						className={'notif_circle cont'}
					>
						{notif}
					</div>
				</>
			}
			<ToolTip {... toolTip}/>
		</button>
	)
}

export default FastRoundButton