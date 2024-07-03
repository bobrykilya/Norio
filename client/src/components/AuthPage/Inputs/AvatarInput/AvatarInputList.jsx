import JumpingList from '../../../JumpingList/JumpingList'
import { IoMdArrowRoundDown, IoMdArrowRoundUp } from "react-icons/io"
import ToolTip from '../../../ToolTip/ToolTip'



const AvatarInputList = ({ LIST, avatar, isAvatarListOpened, closeAvatarList, handleClickElem, listRef, isArrowButsActive, disabled  }) => {
    return ( 
        <JumpingList isListOpened={isAvatarListOpened} closeList={closeAvatarList} other_children={
            <div className={`arrow_buts-cont cont ${isAvatarListOpened ? 'opened' : ''}`}>
                <button
                    className='avatar_list_up-but cont'
                    type='button'
                    tabIndex={-1}
                    onClick={() => listRef.current.scrollTo({ top: 0, behavior: 'smooth'})}
                    disabled={!isArrowButsActive}
                >
                    <div className='arrow_but-cont cont'>
                        <IoMdArrowRoundUp className='fa-icon' />
                    </div>
                    <ToolTip text='Пролистать список вверх' />
                </button>
                <button
                    className='avatar_list_down-but cont opened'
                    type='button'
                    tabIndex={-1}
                    onClick={() => listRef.current.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth'})}
                    disabled={!isArrowButsActive}
                >
                    <div className='arrow_but-cont cont'>
                        <IoMdArrowRoundDown className='fa-icon' />
                    </div>
                    <ToolTip text='Пролистать список вниз' />
                </button>
            </div>
        }>
                <ul className='avatar-list cont' ref={listRef}>
                    {
                        !LIST[0] ?
                            <span className='empty_list-message cont'>Аватары закончились ( <br/>Обратитесь к разработчику</span> :
                            LIST.map((el) => {
                                const key_but = `${el.id}-but`
                                return <li key={el.id} className='cont'>
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
                                    </li>
                            })
                    }
                </ul>
        </JumpingList> 
    )
}
 
export default AvatarInputList