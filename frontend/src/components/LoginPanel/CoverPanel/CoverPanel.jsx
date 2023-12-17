// import { useState } from 'react'



const CoverPanel = (props) => {

    const handleToggleCoverPanel = () => {
        props.onToggleCoverPanel()
    }

    return ( 
        <div id='cover-cont' className={`cont ${props.isOpenedSignUp ? 'opened_sign_up' : ''}`}>
            <div id='cover-content' className='cont'>
                <section id='sign_up_info-cont' className='cont'>
                    <h1>Нет аккаунта?</h1>
                    <p>Подай заявку на регистрацию и дождись активации профиля пользователя</p>
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
                    <p>Выполни вход по регистрационным данным</p>
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
     )
}
 
export default CoverPanel