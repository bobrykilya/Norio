import React, { useContext, useEffect, useRef } from 'react'
import JumpingList from '../../common/JumpingList/JumpingList'
import { IoMdArrowRoundDown, IoMdArrowRoundUp } from "react-icons/io"
import ToolTip from '../../others/ToolTip/ToolTip'
import { AuthContext } from '../../../context/Auth-context'
import { IDataListElement } from '../../../assets/AuthPage/AuthPage-data'
import timeout from "../../../utils/timeout"



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
    
    const { listOfUsedAvatars } = useContext(AuthContext)
    const listRef = useRef<HTMLUListElement>(null)
    const activeElemRef = useRef<HTMLButtonElement>(null)

    const FILTERED_LIST = listOfUsedAvatars[0] ? LIST.filter(avatar => !listOfUsedAvatars.includes(avatar.id)) : LIST //* Filtering of used avatars
    const SORTED_AND_FILTERED_LIST = FILTERED_LIST.sort((a, b) => a.title.localeCompare(b.title)) //* Sorting of avatar list by title

    const handleKeyDownOnElem = (e: React.KeyboardEvent<HTMLButtonElement>) => {
        if (e.code.includes('Arrow') || e.code === 'Tab') {
            e.preventDefault()
        }

        const active = e.target
        switch(e.code) {
            case 'ArrowUp':
                // @ts-ignore
                active.previousElementSibling?.previousElementSibling?.previousElementSibling?.previousElementSibling?.focus()
                break
            case 'ArrowDown':
                // @ts-ignore
                active.nextElementSibling?.nextElementSibling?.nextElementSibling?.nextElementSibling?.focus()
                break
            case 'ArrowLeft':
                // @ts-ignore
                active.previousElementSibling?.focus()
                break
            case 'ArrowRight':
                // @ts-ignore
                active.nextElementSibling?.focus()
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

    //*
    const arrowKeyDownOnAvatarBut = (e: KeyboardEvent) => {
        if (e.target instanceof HTMLElement) {
            if (e.target.classList.contains('avatar-but')) {
                if (e.code.includes('Arrow')) {
                    e.preventDefault()
                    // @ts-ignore
                    listRef.current.children[0]?.focus()
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
            <button
                className='avatar_list_up-but cont'
                type='button'
                tabIndex={-1}
                onClick={() => listRef.current.scrollTo({ top: 0, behavior: 'smooth'})}
                disabled={!isArrowButsActive}
                >
                <div className='scroll_but-cont cont'>
                    <IoMdArrowRoundUp className='fa-icon' />
                </div>
                <ToolTip text='Пролистать список вверх' position='right' />
            </button>
            <button
                className='avatar_list_down-but cont opened'
                type='button'
                tabIndex={-1}
                onClick={() => listRef.current.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth'})}
                disabled={!isArrowButsActive}
                >
                <div className='scroll_but-cont cont'>
                    <IoMdArrowRoundDown className='fa-icon' />
                </div>
                <ToolTip text='Пролистать список вниз' position='right' />
            </button>
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
                    // onKeyDown={handleKeyDownOnList}
                >
                    {
                        !SORTED_AND_FILTERED_LIST[0] ?
                        <span className='empty_list-message cont'>Аватары закончились...<br/>Обратитесь к разработчику :)</span> :
                        SORTED_AND_FILTERED_LIST.map((el) => {
                                return (
                                    <button
                                        key={el.id}
                                        id={el.id}
                                        className='cont'
                                        type={'button'}
                                        tabIndex={-1}
                                        disabled={disabled}
                                        onClick={() => handleClickElem(el.id)}
                                        onKeyDown={handleKeyDownOnElem}
                                        ref={avatar === el.id ? activeElemRef : null}
                                    >
                                        <div className={'avatar_list_img-cont'}>
                                            <img src={createPathToAvatars(el.id)} alt="Avatar error 1" />
                                        </div>
                                        <label htmlFor={el.id}>
                                            {el.title}
                                        </label>
                                    </button>
                                )
                            })
                        }
                </ul>
            </JumpingList> 
        </div> 
    )
}
 
export default AvatarList