import React from 'react'

import clsx from 'clsx'

import { ICONS } from '@assets/common/Icons-data'
import RoundButton from '@common/Buttons/RoundButton/RoundButton'
import { Loader } from '@common/Loader/Loader'



export type FormStatusButOptions = 'ok' | 'undo' | 'loading'

type FormStatusButProps = {
	state: FormStatusButOptions;
	handleClickUndoBut: () => void;
}
const FormStatusButton = ({ state, handleClickUndoBut }: FormStatusButProps) => {


	return (
		<RoundButton
			className={clsx(
				'user_info_edit_form_status-but',
				state,
				'round_blue-but',
			)}
			onClick={handleClickUndoBut}
			toolTip={{
				message: 'Откатить все поля обратно',
			}}
		>
			<div
				className={'switch_form_status-cont cont'}
			>
				<div
					className={clsx(
						'switch_status-elem',
						'cont',
						'loading-cont',
						state === 'loading' && 'active',
					)}
				>
					<Loader
						type={'circles'}
						width={'50'}
					/>
				</div>
				<div
					className={clsx(
						'switch_status-elem',
						'cont',
						'ok-cont',
						state === 'ok' && 'active',
					)}
				>
					{ICONS.ok}
				</div>
				<div
					className={clsx(
						'switch_status-elem',
						'cont',
						'undo-cont',
						state === 'undo' && 'active',
					)}
				>
					{ICONS.undo}
				</div>
			</div>
		</RoundButton>
	)
}

export default FormStatusButton