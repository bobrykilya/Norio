import React, {  MutableRefObject, useContext, useRef } from 'react'
import JumpingList from '../../JumpingList/JumpingList'
import { IoMdArrowRoundDown, IoMdArrowRoundUp } from "react-icons/io"
import ToolTip from '../../ToolTip/ToolTip'
import { AuthContext } from '../../../context/Auth-context'


 
const AvatarList = ({ LIST, avatar, isAvatarListOpened, closeAvatarList, handleClickElem, isArrowButsActive, disabled, createPathToAvatars  }) => {
    
    const { listOfUsedAvatars } = useContext(AuthContext)
    const listRef = useRef<HTMLUListElement>(null) as MutableRefObject<HTMLUListElement>

    const FILTERED_LIST = listOfUsedAvatars[0] ? LIST.filter(avatar => !listOfUsedAvatars.includes(avatar.id)) : LIST //* Filtering of used avatars
    const SORTED_AND_FILTERED_LIST = FILTERED_LIST.sort((a, b) => a.title.localeCompare(b.title)) //* Sorting of avatar list by title


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
            <JumpingList isListOpened={isAvatarListOpened} closeList={closeAvatarList} other_children={scrollButsJSX}>
                <ul className='avatar-list cont' ref={listRef}>
                    {
                        !SORTED_AND_FILTERED_LIST[0] ?
                        <span className='empty_list-message cont'>Аватары закончились...<br/>Обратитесь к разработчику</span> :
                        SORTED_AND_FILTERED_LIST.map((el) => {
                                const key_but = `${el.id}-but`
                                return (
                                    <li key={el.id} className='cont'>
                                        <button 
                                            id={key_but}
                                            className={avatar === el.id ? 'active' : ''}
                                            type='button'
                                            tabIndex={-1} 
                                            onClick={handleClickElem}
                                            disabled={disabled}
                                            >
                                            <img src={createPathToAvatars(el.id)} alt="Avatar error 1" />
                                        </button>
                                        <label htmlFor={key_but}>{el.title}</label>
                                    </li>)
                            })
                        }
                </ul>
            </JumpingList> 
        </div> 
    )
}
 
export default AvatarList