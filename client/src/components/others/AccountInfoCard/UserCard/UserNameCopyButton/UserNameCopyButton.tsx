import React, { useRef, useState } from 'react'
import ToolTip from '../../../ToolTip/ToolTip'
import { IUserRepository } from '../../../../../../../api/src/types/DB-types'
import SelectDropDown from '../../../../common/SelectDropDown/SelectDropDown'
import { ICommonVar } from '../../../../../../../common/types/Global-types'
import { copyText } from '../../../../../utils/copy'
import { ICONS } from '../../../../../assets/common/Icons-data'
import { createName } from '../../../../../utils/createString'



type ICopyUserOptionsList = {
	id: string;
	title: string;
	icon: ICommonVar['icon'];
}
type UserNameCopyButtonProps = {
	userInfoState: IUserRepository;
}
const UserNameCopyButton = ({ userInfoState }: UserNameCopyButtonProps) => {

	if (!userInfoState) {
		return
	}

	const [isDropDownOpened, setIsDropDownOpened] = useState(false)
	const userNameRef = useRef(null)
	const COPY_USER_OPTIONS_LIST: ICopyUserOptionsList[] = [
		{
			id: 'username',
			title: userInfoState.username,
			icon: ICONS.copyFilled,
		},
		{
			id: 'name',
			title: createName(userInfoState, ['lastName', 'firstName', 'middleName']),
			icon: ICONS.copyFilled,
		},
		{
			id: 'job',
			title: userInfoState.job,
			icon: ICONS.copyFilled,
		},
	]

	const handleClickOption = ({ title }: ICopyUserOptionsList) => {
		hideDropDown()
		copyText(title)
	}

	const hideDropDown = () => {
		setIsDropDownOpened(false)
	}


	return (
		<div
			className={'user_name-cont cont'}
		>

			<div
				className={'user_name-but cont'}
				onClick={() => setIsDropDownOpened(prev => !prev)}
				ref={userNameRef}
			>
				<span
					className={'user-name cont'}
				>
					{createName(userInfoState, ['firstName', 'middleName'])}
					<span>
						{userInfoState.lastName}
					</span>
				</span>
				<span
					className={'user-job'}
				>
					{userInfoState.job}
				</span>
				<ToolTip
					message={`Скопировать пользователя`}
					position={'left'}
				/>
			</div>
			<SelectDropDown
				OPTIONS_LIST={COPY_USER_OPTIONS_LIST}
				handleClickOption={handleClickOption}
				closeHooksParams={{
					conditionsList: [isDropDownOpened],
					callback: hideDropDown,
					butRef: userNameRef,
				}}
				dropDownTitle={'Скопировать: '}
			/>
		</div>
	)
}

export default UserNameCopyButton