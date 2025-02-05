import React, { useEffect, useRef } from 'react'
import JumpingCard from '../../common/JumpingCard/JumpingCard'
import { IoMdArrowRoundDown, IoMdArrowRoundUp } from "react-icons/io"
import { IDataListElement } from '../../../assets/AuthPage/AuthPage-data'
import timeout from "../../../utils/timeout"
import { sortByAlphabet } from "../../../utils/sort"
import RoundButton from "../../common/Buttons/RoundButton/RoundButton"
import { useAuthState } from "../../../stores/Auth-store"



type AvatarListCardProps = {
    LIST: IDataListElement[];
    currentAvatar: string | null;
    isAvatarListCardOpened: boolean;
    closeAvatarListCard: () => void;
    handleClickElem: (avatar: string) => void;
    isArrowButsActive: boolean;
    disabled: boolean;
    createPathToAvatars: (name: string) => string;
}
const AvatarListCard = ({ LIST, currentAvatar, isAvatarListCardOpened, closeAvatarListCard, handleClickElem, isArrowButsActive, disabled, createPathToAvatars }: AvatarListCardProps) => {
    
    const listOfUsedAvatarsState = useAuthState(s => s.listOfUsedAvatarsState)
    const listRef = useRef<HTMLUListElement>(null)
    const activeElemRef = useRef<HTMLButtonElement>(null)

    const FILTERED_LIST = listOfUsedAvatarsState[0] ? LIST.filter(avatar => !listOfUsedAvatarsState.includes(avatar.id)) : LIST //* Filtering of used avatars
    const SORTED_AND_FILTERED_LIST = sortByAlphabet(FILTERED_LIST, 'title') //* Sorting avatarList by title

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
            if (isAvatarListCardOpened) {
                if (currentAvatar){
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
    }, [isAvatarListCardOpened])

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
        if (isAvatarListCardOpened && !currentAvatar) {
            window.addEventListener("keydown", arrowKeyDownOnAvatarBut)

            return () => {
                window.removeEventListener("keydown", arrowKeyDownOnAvatarBut)
            }
        }
    }, [isAvatarListCardOpened])


    const scrollButsJSX = (
        <div className={'scroll_buts-cont cont'}>
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
        <JumpingCard
            other_children={scrollButsJSX}
            className={'avatar_list_card-cover'}
            isPrerender={true}
            closeHooksParams={{
                conditionsList: [isAvatarListCardOpened],
                callback: closeAvatarListCard
            }}
        >
            <ul
                className="avatar_list-card cont"
                ref={listRef}
                tabIndex={-1}
            >
                {
                    !SORTED_AND_FILTERED_LIST[0] ?
                        <span className="empty_list-message cont">Аватары закончились...<br/>Обратитесь к разработчику :)</span> :
                        SORTED_AND_FILTERED_LIST.map((el) => {
                            return (
                                <div
                                    className={'avatar_list_card_button-cont cont'}
                                    key={el.id}
                                >
                                    <button
                                        id={el.id}
                                        type={'button'}
                                        tabIndex={-1}
                                        disabled={disabled}
                                        onClick={() => handleClickElem(el.id)}
                                        onKeyDown={handleKeyDownOnElem}
                                        ref={currentAvatar === el.id ? activeElemRef : null}
                                    >
                                        <img src={createPathToAvatars(el.id)} alt="Avatar error 1"/>
                                    </button>
                                    <label htmlFor={el.id}>
                                        {el.title}
                                    </label>
                                </div>
                            )
                        })
                }
            </ul>
        </JumpingCard>
    )
}
 
export default AvatarListCard