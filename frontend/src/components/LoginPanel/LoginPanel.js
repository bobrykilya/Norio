import { useState } from 'react';
import './LoginPanel.css';
import SignInForm from './SignInForm/SignInForm';
import ButtonsCont from './ButtonsCont/ButtonsCont';
// import mainLogo from '../../imgs/full_logo_vertic.png';



const LoginPanel = () => {
    
    const [user, setUser] = useState(null);

    return (
        <div id='login_panel-cont' className='cont'>
            <section id='sign_in-cont' className='cont'>
                <div id='enter_text-cont' className='cont'>
                    {/* <i className="fa-solid fa-door-open"></i> */}
                    <h1>Авторизация</h1>
                </div>
                <ButtonsCont />
                <SignInForm />
                <h3 id='name_tag'>bobrykilya</h3>
            </section>

            {/* <img id='logo-img' src={mainLogo} alt="/" /> */}
        </div>
    );
};

export default LoginPanel;