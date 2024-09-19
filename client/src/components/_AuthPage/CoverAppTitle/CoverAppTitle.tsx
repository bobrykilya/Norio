import { APP_TITLE } from "../../../../constants"
import React from "react"



type CoverAppTitleProps = {
	block: boolean;
}
const CoverAppTitle = ({ block }: CoverAppTitleProps) => {


	return (
		<div className={`coverAppTitle cont ${block && 'block'}`}>
			{APP_TITLE}
		</div>
	)
}

export default CoverAppTitle