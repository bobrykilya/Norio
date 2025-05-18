import React from 'react';

import clsx from 'clsx'

import RoundButton from '../../../../Buttons/RoundButton/RoundButton'
import { ICONS } from '@assets/common/Icons-data'



type InputCleanerProps = {
	opened: boolean;
	onClick: () => void;
}
const InputCleaner = ({ opened, onClick }: InputCleanerProps) => {

	return (
		<RoundButton
			onClick={onClick}
			className={clsx('inputs_cleaner-but', 'before_hover-but', opened && 'opened')}
			toolTip={{
				message: 'Очистить поле',
			}}
			size={'xs'}
		>
			{ICONS.closeCircled}
		</RoundButton>

	)
}

export default InputCleaner