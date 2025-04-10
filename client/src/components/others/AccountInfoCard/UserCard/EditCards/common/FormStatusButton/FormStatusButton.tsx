import React from 'react'
import RoundButton from "../../../../../../common/Buttons/RoundButton/RoundButton"
import { BiBadgeCheck } from "react-icons/bi"
import { IoArrowUndoSharp } from "react-icons/io5"
import { Loader } from "../../../../../../common/Loader/Loader"



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
					<Loader
						type={'circles'}
						width={'50'}
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