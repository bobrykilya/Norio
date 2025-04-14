import React from 'react'
import RoundButton from "../../../../../../common/Buttons/RoundButton/RoundButton"
import { Loader } from "../../../../../../common/Loader/Loader"
import { ICONS } from "../../../../../../../assets/common/Icons-data"



export type FormStatusButOptions =  'ok' | 'undo' | 'loading'

type FormStatusButProps = {
	state: FormStatusButOptions;
	handleUndoButClick: (state: FormStatusButOptions) => void;
}
const FormStatusButton = ({ state, handleUndoButClick }: FormStatusButProps) => {




	return (
		<RoundButton
			className={`user_info_edit_card_status-but ${state || ''} round_blue-but`}
			onClick={handleUndoButClick}
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
					{ICONS.ok}
				</div>
				<div
					className={`switch_status-elem cont undo-cont ${state === 'undo' ? 'active' : ''}`}
				>
					{ICONS.undo}
				</div>
			</div>
		</RoundButton>
	)
}

export default FormStatusButton