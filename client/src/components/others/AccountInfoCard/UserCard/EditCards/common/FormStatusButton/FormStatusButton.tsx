import React from 'react'
import RoundButton from "../../../../../../common/Buttons/RoundButton/RoundButton"
import { BiBadgeCheck } from "react-icons/bi"
import { Circles } from 'react-loader-spinner'
import { IoArrowUndoSharp } from "react-icons/io5"



export type FormStatusButOptions =  'ok' | 'undo' | 'loading'

type FormStatusButProps = {
	state: FormStatusButOptions;
}
const FormStatusButton = ({ state }: FormStatusButProps) => {




	return (
		<RoundButton
			className={`user_info_edit_card_status-but ${state || ''}`}
			onClick={() => {}}
		>
			<div
			    className={'switch_form_status-cont cont'}
			>
			    <div
			        className={`switch_status-elem cont loading-cont ${state === 'loading' ? 'active' : ''}`}
			    >
					<Circles
						color="#E9EDF0CC"
						width="50"
					/>
			    </div>
				<div
					className={`switch_status-elem cont ok-cont ${state === 'ok' ? 'active' : ''}`}
				>
					<BiBadgeCheck className={'fa-icon'} />
				</div>
				<div
					className={`switch_status-elem cont undo-cont ${state === 'undo' ? 'active' : ''}`}
				>
					<IoArrowUndoSharp className={'fa-icon'} />
				</div>
			</div>
		</RoundButton>
	)
}

export default FormStatusButton