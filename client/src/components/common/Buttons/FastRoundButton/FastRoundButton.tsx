import React from 'react'
import ToolTip, { ToolTipProps } from "../../../others/ToolTip/ToolTip"
import { ICommonVar } from "../../../../../../common/types/Global-types"



type FastRoundButtonProps = {
	icon: ICommonVar['icon'];
	toolTip?: ToolTipProps;
	notif?: number;
}
const FastRoundButton = ({ icon, toolTip, notif }: FastRoundButtonProps) => {


	return (
		<button
			className={'fast_button cont'}
			tabIndex={-1}
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
			<ToolTip { ...toolTip } />
		</button>
	)
}

export default FastRoundButton