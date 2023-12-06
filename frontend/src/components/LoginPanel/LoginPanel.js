import { useState } from 'react';
import './LoginPanel.css';
import mainLogo from '../../imgs/full_logo_vertic.png';
import CheckBox from './CheckBox/CheckBox';


function LoginPanel() {

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const [load, setLoad] = useState(false);
    const [user, setUser] = useState(null);

    const handleLogin = async () => {
        return
    };

    return (
        <div id='log-cont' className='cont'>
            <form id='sign-in-form' className='cont'>
                <div id='enter-text-cont' className='cont'>
                    <i class="fa-solid fa-door-open"></i>
                    <h1>Выполнить<br />вход</h1>
                </div>
                <div id='buts-cont' className='cont'>
                    <button
                        id='new-user-but'
                        title='Создать заявку на регистрацию нового пользователя'
                        type="button"
                        className='cont'>
                            <i class="fa-regular fa-address-card"></i>
                    </button>
                    <button 
                        id='pwa-but'
                        title='Создать ярлык на рабочем столе'
                        type="button"
                        className='cont'>
                            <i className="fa-solid fa-desktop"></i>
                    </button>
                    <button
                        id='info-but'
                        title='Описание приложения и инструкция'
                        type="button"
                        className='cont'>
                        <i className="fa-solid fa-info"></i>
                    </button>
                </div>
                <div className='input-cont cont'>
                    <input
                        id='name'
                        type="text"
                        maxLength={15}
                        placeholder='Логин'
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <i className="fa-solid fa-user"></i>
                </div>
                <div className='input-cont cont'>
                    <input
                        id='passw'
                        type="password"
                        maxLength={15}
                        placeholder='Пароль'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <i className="fa-solid fa-key"></i>
                </div>
                <label id='checkbox-cont' className='cont'>
                    <CheckBox />
                    <span>Не запоминать меня</span>
                </label>
                <button
                    id='submit-but'
                    type='submit'
                    disabled={load}
                    onClick={() => {
                        setLoad(true);
                        handleLogin()
                            .then(() => setLoad(false));
                    }}
                    className='cont'
                >
                    <i className="fa-solid fa-right-to-bracket"></i>
                </button>
                <h3 id='name-tag'>bobrykilya</h3>
            </form>
            <img id='logo-img' src={mainLogo} alt="/" />
        </div>
    );
};

export default LoginPanel;