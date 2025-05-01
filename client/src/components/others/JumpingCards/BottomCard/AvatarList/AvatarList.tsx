import React, { useEffect, useMemo, useRef, useState } from 'react'
import { AVATARS_LIST } from '../../../../../assets/AuthPage/AuthPage-data'
import timeout from '../../../../../utils/timeout'
import { sortByAlphabet } from '../../../../../utils/sort'
import RoundButton from '../../../../common/Buttons/RoundButton/RoundButton'
import { nextElems, prevElems } from '../../../../../utils/focusElementSibling'
import { ICONS } from '../../../../../assets/common/Icons-data'
import { getPathToAvatar } from '../../../../../utils/createString'
import { useAvatarState, useBottomCardState } from '../../../../../stores/Utils-store'



type AvatarListProps = {
	currentAvatar: string | null;
}
const AvatarList = ({
						currentAvatar,
					}: AvatarListProps) => {

	const [listOfUsedAvatarsState, setSelectedAvatarState] = useAvatarState(s => [s.listOfUsedAvatarsState, s.setSelectedAvatarState])
	const setBottomCardState = useBottomCardState(s => s.setBottomCardState)
	const [isArrowButsActive, setIsArrowButsActive] = useState(false)
	const listRef = useRef<HTMLUListElement>(null)
	const activeElemRef = useRef<HTMLButtonElement>(null)

	const FILTERED_LIST = listOfUsedAvatarsState[0] ?
		useMemo(() => {
			return AVATARS_LIST.filter(avatar => !listOfUsedAvatarsState.includes(avatar.id))
		}, [listOfUsedAvatarsState]) :
		AVATARS_LIST //* Filtering of used avatars
	const SORTED_AND_FILTERED_LIST = sortByAlphabet(FILTERED_LIST, 'title') //* Sorting avatarList by title

	const handleKeyDownOnElem = (e: React.KeyboardEvent<HTMLButtonElement>) => {
		if (e.code.includes('Arrow') || e.code === 'Tab') {
			e.preventDefault()
		}


		const active: HTMLElement = e.target as HTMLElement
		switch (e.code) {
			case 'ArrowUp':
				prevElems(active, 4, true)?.focus()
				break
			case 'ArrowDown':
				nextElems(active, 4, true)?.focus()
				break
			case 'ArrowLeft':
				prevElems(active, 1, true)?.focus()
				break
			case 'ArrowRight':
				nextElems(active, 1, true)?.focus()
				break
		}
	}

	const handleClickElem = (avatar: string) => {
		// setSelectedAvatarState(avatar)
		setBottomCardState(null)
	}

	//* Active element auto-focus after list opening
	useEffect(() => {
		const focusActiveElem = async () => {
			if (!currentAvatar) {
				return
			}

			await timeout(500)
			activeElemRef.current?.focus()
		}

		focusActiveElem()
	}, [])

	// useEffect(() => {
	// 	setIsArrowButsActive(true)
	// }, [])


	useEffect(() => {
		const arrowKeyDownOnAvatarBut = (e: KeyboardEvent) => {
			if (e.target instanceof HTMLElement) {
				if (e.target.classList.contains('select_avatar-but')) {
					if (e.code.includes('Arrow')) {
						e.preventDefault()
						// @ts-ignore
						listRef.current.children[0]?.children[0].focus()
					}
				}
			}
		}

		if (!currentAvatar) {
			window.addEventListener('keydown', arrowKeyDownOnAvatarBut)

			return () => {
				window.removeEventListener('keydown', arrowKeyDownOnAvatarBut)
			}
		}
	}, [])


	//! Use anywhere
	const scrollButsJSX = (
		<div className={'scroll_buts-cont cont'}>
			<RoundButton
				onClick={() => listRef.current.scrollTo({ top: 0, behavior: 'smooth' })}
				className={'up before_hover-but'}
				disabled={!isArrowButsActive}
				toolTip={{
					message: 'Пролистать список вверх',
					position: 'right',
				}}
			>
				<div className='scroll_but-cont cont'>
					{ICONS.arrowUp}
				</div>
			</RoundButton>
			<RoundButton
				onClick={() => listRef.current.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })}
				className={'down before_hover-but'}
				disabled={!isArrowButsActive}
				toolTip={{
					message: 'Пролистать список вниз',
					position: 'right',
				}}
			>
				<div className='scroll_but-cont cont'>
					{ICONS.arrowDown}
				</div>
			</RoundButton>
		</div>
	)


	return (
		<ul
			className={'avatar-list cont'}
			ref={listRef}
			tabIndex={-1}
		>
			{
				!SORTED_AND_FILTERED_LIST[0] ?
					<span
						className='empty_list-message cont'
					>Аватары закончились...<br />Обратитесь к разработчику :)</span> :
					SORTED_AND_FILTERED_LIST.map((el) => {
						return (
							<div
								className={'avatar_list_button-cont cont'}
								key={el.id}
							>
								<button
									id={el.id}
									type={'button'}
									tabIndex={-1}
									onClick={() => handleClickElem(el.id)}
									onKeyDown={handleKeyDownOnElem}
									ref={currentAvatar === el.id ? activeElemRef : null}
								>
									<img src={getPathToAvatar(el.id)} alt='Avatar error 1' />
								</button>
								<label htmlFor={el.id}>
									{el.title}
								</label>
							</div>
						)
					})
			}
		</ul>
	)
}

export default AvatarList