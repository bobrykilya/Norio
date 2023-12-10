// import React, { useState } from 'react';
import ButtonsCont from './ButtonsCont/ButtonsCont'
import SignInForm from './Forms/SignInForm/SignInForm'
import SignUpForm from './Forms/SignUpForm/SignUpForm'
import CoverPanel from './CoverPanel/CoverPanel'
// import mainLogo from '../../assets/logos/full_logo_vertic.png'
import './LoginPanel.sass'



const LoginPanel = () => {

    // const [user, setUser] = useState(null)

    return (
        <div id='login_panel-cont' className='cont'>
            <div id='forms-cont' className='cont'>
                <section id='sign_in-cont' className='cont active'>
                    <div className='enter_text-cont cont'>
                        {/* <i className="fa-solid fa-door-open"></i> */}
                        <h1>Авторизация</h1>
                    </div>
                    <ButtonsCont />
                    <SignInForm />
                    <h3 className='name_tag'>bobrykilya</h3>
                </section>
                <section id='sign_up-cont' className='cont'>
                    <div className='enter_text-cont cont'>
                        <h1>Регистрация</h1>
                    </div>
                    <ButtonsCont />
                    <SignUpForm />
                    <h3 className='name_tag'>bobrykilya</h3>
                </section>
            </div>
            <CoverPanel />
        </div>
    )
}

export default LoginPanel