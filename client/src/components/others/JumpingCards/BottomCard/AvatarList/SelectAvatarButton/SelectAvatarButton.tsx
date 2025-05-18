import React, { useEffect, useRef, useState } from 'react'

import clsx from 'clsx'

import { ICONS } from '@/assets/common/Icons-data'
import { IReactHookForm } from '@/types/Auth-types'
import InputCleaner from '@common/Inputs/InputFields/InputUtils/InputCleaner/InputCleaner'
import InputError from '@common/Inputs/InputFields/InputUtils/InputError/InputError'
import ToolTip from '@others/ToolTip/ToolTip'
import { useJumpingCardsState } from '@stores/Utils-store'
import { getPathToAvatar } from '@utils/createString'
import timeout from '@utils/timeout'



type AvatarButtonProps = Pick<IReactHookForm, 'setError'> & {
	selectedAvatar: string | null;
	setSelectedAvatar: (avatar: string) => void;
	disabled?: boolean;
	isTabDisabled?: boolean;
	error?: {
		message: string
	}
	isWhiteVersion?: boolean;
}
const SelectAvatarButton = ({
								selectedAvatar,
								setSelectedAvatar,
								disabled = false,
								isTabDisabled = false,
								error,
								setError,
								isWhiteVersion,
							}: AvatarButtonProps) => {

	const [
		bottomCardState,
		setJumpingCardsState,
	] = useJumpingCardsState(s => [s.getJumpingCardsState('bottomCard'), s.setJumpingCardsState])
	const [isEmptyIcon, setIsEmptyIcon] = useState(!selectedAvatar)
	const avatarButtonRef = useRef<HTMLButtonElement>(null)


	const handleClickAvatarButton = () => {
		if (error) {
			setError(null)
		}
		setJumpingCardsState('bottomCard', 'avatarList')
	}

	const handleClickCleaner = async () => {
		setIsEmptyIcon(true)
		if (error) {
			setError(null)
		}
		await timeout(300)
		setSelectedAvatar('')
	}


	//! Fix
	// useEffect(() => {
	// 	if (bottomCardState === null) {
	// 		console.log('focus')
	// 		avatarButtonRef.current.focus()
	// 	}
	// }, [bottomCardState])

	useEffect(() => {
		if (selectedAvatar) {
			setIsEmptyIcon(false)
		}
	}, [selectedAvatar])


	return (
		<div className={'select_avatar_but-cont cont'}>
			<button
				className={clsx(
					'select_avatar-but',
					'cont',
					error?.message && 'error',
					isWhiteVersion && 'white',
				)}
				type={'button'}
				tabIndex={isTabDisabled ? -1 : 0}
				onClick={handleClickAvatarButton}
				ref={avatarButtonRef}
				disabled={disabled}
				autoFocus={false}
			>
				<div
					className={clsx(
						'no_avatar-cont',
						isEmptyIcon && 'opened',
					)}
				>
					{ICONS.emptyAvatar}
				</div>
				{
					selectedAvatar &&
					<img
						src={getPathToAvatar(selectedAvatar)}
						alt={'Avatar error 2'}
					/>
				}
				<ToolTip message='Выбрать аватар пользователя' />
			</button>
			{
				!isWhiteVersion && (
					<>
						<InputError
							error={error}
							onClick={handleClickAvatarButton}
						/>
						<InputCleaner
							opened={!isEmptyIcon}
							onClick={handleClickCleaner}
						/>
					</>
				)
			}
		</div>
	)
}

export default SelectAvatarButton