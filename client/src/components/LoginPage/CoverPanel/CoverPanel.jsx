import { useContext } from 'react'
import { useSelector } from 'react-redux'
import { AuthContext } from '../../../context/AuthContext'
import SignUpImg from '../../../assets/login/sign_up.png'
import SignInImg from '../../../assets/login/sign_in.png' 
import { IoArrowBackCircleOutline } from "react-icons/io5"
import { useActions } from '../../../hooks/useActions'
import ToolTip from '../../ToolTip/ToolTip'
import CoverBgImg from '../../../assets/cover_bg.jpg'



const CoverPanel = () => {

    const { handleReturnToSignUp } = useContext(AuthContext)
    const coverPanelState   = useSelector(state => state.coverPanel.coverPanel)
    const { toggleCoverPanel } = useActions()

    // console.log(coverPanelState)

    return ( 
        <div id='cover_and_img-cont' className={`cont opened_${coverPanelState}`}>
            <div id='cover-cont' className='cont'>
                <img src={CoverBgImg} className='cover_bg-img' alt="" />
                <div id='cover-content' className='cont'>
                    <section id='sign_up_info-cont' className='cont'>
                        <h1>Нет аккаунта?</h1>
                        <p>Подай заявку на<br/>регистрацию и дождись<br/>активации профиля<br/>пользователя</p>
                        <button
                            id='open_sign_up-but'
                            type='button'
                            onClick={() => toggleCoverPanel('sign_up')}
                            tabIndex={-1}
                        >
                            <label htmlFor="open_sign_up-but">
                                Регистрация
                            </label>
                            <ToolTip text={'Перейти к форме регистрации пользователя'} />
                        </button>
                    </section>
                    <section id='sign_in_info-cont' className='cont'>
                        <h1>Есть аккаунт?</h1>
                        <p>Выполни вход по<br/>регистрационным<br/>данным</p>
                        <button
                            id='open_sign_in-but'
                            type='button'
                            onClick={() => toggleCoverPanel('sign_in')}
                            tabIndex={-1}
                        >
                            <label htmlFor="open_sign_in-but">
                                Авторизация
                            </label>
                            <ToolTip text={'Перейти к форме авторизации пользователя'} />
                        </button>
                    </section>
                </div>
                <button 
                    id='close_sign_up_2-button'
                    type='button'
                    tabIndex={-1}
                    onClick={() => handleReturnToSignUp()}
                >
                    <IoArrowBackCircleOutline className='fa-icon'/>
                </button>
            </div>
            <div id='img-cont' className='cont'>
                <img src={SignUpImg} alt="" className='sign_up-img'/>
                <img src={SignInImg} alt="" className='sign_in-img'/>
            </div>
        </div>
     )
}
 
export default CoverPanel