import { useState } from 'react';
import './LoginPanel.css';
import mainLogo from '../../imgs/full_logo_vertic.png';


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
            <form id='sign-in' className='cont'>
                <h1>Выполнить<br />вход</h1>
                <div id='buts-cont'>
                    <button id='info-but' type="button" className='cont'>
                        <i className="fa-solid fa-info"></i>
                    </button>
                    <button id='pwa-but' type="button" className='cont'>
                        <i className="fa-solid fa-desktop"></i>
                    </button>
                </div>
                <div className='input-cont cont'>
                    <i className="fa-solid fa-user"></i>
                    <input
                        id='name'
                        type="text"
                        maxLength={15}
                        placeholder='Логин'
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </div>
                <div className='input-cont cont'>
                    <i className="fa-solid fa-key"></i>
                    <input
                        id='passw'
                        type="password"
                        maxLength={15}
                        placeholder='Пароль'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <button
                    id='submit-but'
                    type='submit'
                    disabled={load}
                    onClick={() => {
                        setLoad(true);
                        handleLogin()
                            .then(() => setLoad(false));
                    }}
                >
                    <i className="fa-solid fa-right-to-bracket"></i>
                </button>
                <h3 id='name-tag'>bobrykilya</h3>
            </form>
            <img id='logo-img' src={mainLogo} style={{ height: '100%' }} alt="/" />
        </div>
    );
}

export default LoginPanel;