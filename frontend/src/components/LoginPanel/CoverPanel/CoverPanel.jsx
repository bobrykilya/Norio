// import { useState } from 'react'
import SignUpImg from '../../../assets/sign_up.png'
import SignInImg from '../../../assets/sign_in.png' 



const CoverPanel = (props) => {

    const handleToggleCoverPanel = () => {
        props.onToggleCoverPanel()
    }

    return ( 
        <div id='cover_and_img-cont' className={`cont ${props.isOpenedSignUp ? 'opened_sign_up' : ''}`}>
            <div id='cover-cont' className='cont'>
                <div id='cover-content' className='cont'>
                    <section id='sign_up_info-cont' className='cont'>
                        <h1>Нет аккаунта?</h1>
                        <p>Подай заявку на<br/>регистрацию и дождись<br/>активации профиля<br/>пользователя</p>
                        <button
                            id='open_sign_up-but'
                            onClick={handleToggleCoverPanel}
                            tabIndex={-1}
                        >
                            <label htmlFor="open_sign_up-but">
                                Регистрация
                            </label>
                        </button>
                    </section>
                    <section id='sign_in_info-cont' className='cont'>
                        <h1>Есть аккаунт?</h1>
                        <p>Выполни вход по<br/>регистрационным<br/>данным</p>
                        <button
                            id='open_sign_in-but'
                            onClick={handleToggleCoverPanel}
                            tabIndex={-1}
                        >
                            <label htmlFor="open_sign_in-but">
                                Авторизация
                            </label>
                        </button>
                    </section>
                </div>
            </div>
            <div id='img-cont' className='cont'>
                <img src={SignUpImg} alt="" className='sign_up-img'/>
                <img src={SignInImg} alt="" className='sign_in-img'/>
            </div>
        </div>
     )
}
 
export default CoverPanel