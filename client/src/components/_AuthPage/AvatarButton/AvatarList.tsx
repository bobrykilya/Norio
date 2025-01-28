import React, { useEffect, useRef } from 'react'
import JumpingList from '../../common/JumpingList/JumpingList'
import { IoMdArrowRoundDown, IoMdArrowRoundUp } from "react-icons/io"
import { IDataListElement } from '../../../assets/AuthPage/AuthPage-data'
import timeout from "../../../utils/timeout"
import { sortByAlphabet } from "../../../utils/sort"
import RoundButton from "../../common/Buttons/RoundButton/RoundButton"
import { useAuthState } from "../../../stores/Auth-store"



type AvatarListProps = {
    LIST: IDataListElement[];
    avatar: string | null;
    isAvatarListOpened: boolean;
    closeAvatarList: () => void;
    handleClickElem: (avatar: string) => void;
    isArrowButsActive: boolean;
    disabled: boolean;
    createPathToAvatars: (name: string) => string;
}
const AvatarList = ({ LIST, avatar, isAvatarListOpened, closeAvatarList, handleClickElem, isArrowButsActive, disabled, createPathToAvatars }: AvatarListProps) => {
    
    const listOfUsedAvatarsState = useAuthState(s => s.listOfUsedAvatarsState)
    const listRef = useRef<HTMLUListElement>(null)
    const activeElemRef = useRef<HTMLButtonElement>(null)

    const FILTERED_LIST = listOfUsedAvatarsState[0] ? LIST.filter(avatar => !listOfUsedAvatarsState.includes(avatar.id)) : LIST //* Filtering of used avatars
    const SORTED_AND_FILTERED_LIST = sortByAlphabet(FILTERED_LIST, 'title') //* Sorting of avatar list by title

    const handleKeyDownOnElem = (e: React.KeyboardEvent<HTMLButtonElement>) => {
        if (e.code.includes('Arrow') || e.code === 'Tab') {
            e.preventDefault()
        }

        const nextElems= (elem: HTMLElement, steps?: number) => {
            const getNextElem = (elem: HTMLElement) => {
                return elem.parentElement.nextElementSibling?.children[0] as HTMLElement
            }
            if (steps && steps !== 1) {
                return nextElems(getNextElem(elem), steps - 1)
            }
            return getNextElem(elem)
        }
        const prevElems= (elem: HTMLElement, steps?: number) => {
            const getNextElem = (elem: HTMLElement) => {
                return elem.parentElement.previousElementSibling?.children[0] as HTMLElement
            }
            if (steps && steps !== 1) {
                return prevElems(getNextElem(elem), steps - 1)
            }
            return getNextElem(elem)
        }

        const active: HTMLElement = e.target as HTMLElement
        switch(e.code) {
            case 'ArrowUp':
                prevElems(active, 4).focus()
                break
            case 'ArrowDown':
                nextElems(active, 4).focus()
                break
            case 'ArrowLeft':
                prevElems(active).focus()
                break
            case 'ArrowRight':
                nextElems(active).focus()
                break
        }
    }

    //* Active element auto-focus
    useEffect(() => {
        const focusActiveElem = async () => {
            if (isAvatarListOpened) {
                if (avatar){
                    // console.log(activeElemRef.current)
                    await timeout(400)
                    activeElemRef.current?.focus()
                } else {
                    // console.log('list focus')
                    // listRef.current.focus()
                }
            }
        }

        focusActiveElem()
    }, [isAvatarListOpened])

    const arrowKeyDownOnAvatarBut = (e: KeyboardEvent) => {
        if (e.target instanceof HTMLElement) {
            if (e.target.classList.contains('avatar-but')) {
                if (e.code.includes('Arrow')) {
                    e.preventDefault()
                    // @ts-ignore
                    listRef.current.children[0]?.children[0].focus()
                }
            }
        }
    }

    useEffect(() => {
        if (isAvatarListOpened && !avatar) {
            window.addEventListener("keydown", arrowKeyDownOnAvatarBut)

            return () => {
                window.removeEventListener("keydown", arrowKeyDownOnAvatarBut)
            }
        }
    }, [isAvatarListOpened])

    const scrollButsJSX = (
        <div className={`scroll_buts-cont cont ${isAvatarListOpened ? 'opened' : ''}`}>
            <RoundButton
                onClick={() => listRef.current.scrollTo({ top: 0, behavior: 'smooth'})}
                className={'up before_hover-but'}
                disabled={!isArrowButsActive}
                toolTip={{
                    text: 'Пролистать список вверх',
                    position: 'right'
                }}
            >
                <div className='scroll_but-cont cont'>
                    <IoMdArrowRoundUp className='fa-icon' />
                </div>
            </RoundButton>
            <RoundButton
                onClick={() => listRef.current.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth'})}
                className={'down before_hover-but'}
                disabled={!isArrowButsActive}
                toolTip={{
                    text: 'Пролистать список вниз',
                    position: 'right'
                }}
            >
                <div className='scroll_but-cont cont'>
                    <IoMdArrowRoundDown className='fa-icon' />
                </div>
            </RoundButton>
        </div>
    )

    return (
        <div className='avatar_list-cont'>
            <JumpingList
                isListOpened={isAvatarListOpened}
                closeList={closeAvatarList}
                other_children={scrollButsJSX}
            >
                <ul
                    className='avatar-list cont'
                    ref={listRef}
                >
                    {
                        !SORTED_AND_FILTERED_LIST[0] ?
                        <span className='empty_list-message cont'>Аватары закончились...<br/>Обратитесь к разработчику :)</span> :
                        SORTED_AND_FILTERED_LIST.map((el) => {
                                return (
                                    <div
                                        className={'avatar_button-cont cont'}
                                        key={el.id}
                                    >
                                        <button
                                            id={el.id}
                                            type={'button'}
                                            tabIndex={-1}
                                            disabled={disabled}
                                            onClick={() => handleClickElem(el.id)}
                                            onKeyDown={handleKeyDownOnElem}
                                            ref={avatar === el.id ? activeElemRef : null}
                                        >
                                            <img src={createPathToAvatars(el.id)} alt="Avatar error 1" />
                                        </button>
                                        <label htmlFor={el.id}>
                                            {el.title}
                                        </label>
                                    </div>
                                )
                            })
                        }
                </ul>
            </JumpingList> 
        </div> 
    )
}
 
export default AvatarList