import { APP_TITLE } from "../../../../constants"
import React from "react"



type CoverAppTitleProps = {
	block?: boolean;
	dim?: boolean;
}
const CoverAppTitle = ({ block, dim }: CoverAppTitleProps) => {


	return (
		<div className={`coverAppTitle cont ${block && 'block'} ${dim && 'dim'}`}>
			{APP_TITLE}
		</div>
	)
}

export default CoverAppTitle