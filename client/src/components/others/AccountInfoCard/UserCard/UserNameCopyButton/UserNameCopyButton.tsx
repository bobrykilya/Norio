import React, { useRef, useState } from 'react'
import ToolTip from "../../../ToolTip/ToolTip"
import { IUserRepository } from "../../../../../../../api/src/types/DB-types"
import { showSnackMessage } from "../../../../../features/showSnackMessage/showSnackMessage"
import { BiSolidCopy } from "react-icons/bi"
import SelectDropDown from "../../../../common/SelectDropDown/SelectDropDown"
import { ICommonVar } from "../../../../../../../common/types/Global-types"



type ICopyUserOptionsList = {
	id: string;
	title: string;
	icon: ICommonVar['icon'];
}
type UserNameCopyButtonProps = {
	userInfoState: IUserRepository;
}
const UserNameCopyButton = ({ userInfoState }: UserNameCopyButtonProps) => {

	if(!userInfoState) {
		return
	}

	const [isDropDownOpened, setIsDropDownOpened] = useState(false)
	const userNameRef = useRef(null)
	const copyIcon = <BiSolidCopy className={'fa-icon'} />
	const COPY_USER_OPTIONS_LIST: ICopyUserOptionsList[] = [
		{
			id: 'username',
			title: userInfoState.username,
			icon: copyIcon
		},
		{
			id: 'name',
			title: `${userInfoState.lastName} ${userInfoState.firstName} ${userInfoState.middleName}`,
			icon: copyIcon
		},
		{
			id: 'job',
			title: userInfoState.job,
			icon: copyIcon
		},
	]

	const handleClickOption = ({ title }: ICopyUserOptionsList) => {
		hideDropDown()

		navigator.clipboard.writeText(title)
			.then(() => {
				showSnackMessage({
					type: "s",
					messageTitle: 'Скопировано:',
					message: title
				})
			})
			.catch(() => {
				showSnackMessage({
					type: "e",
					message: `Не удалось скопировать: <span class=\'bold\'>${title}</span>`,
				})
			})
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
					{`${userInfoState.firstName} ${userInfoState.middleName}`}
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
					text={`Скопировать пользователя`}
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