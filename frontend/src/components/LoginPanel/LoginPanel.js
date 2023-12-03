import { useState } from 'react';
import './LoginPanel.css';
 
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
        <h1>StroyprTeam</h1>
        <button id='info-but'><i className="fa-solid fa-circle-info"></i></button>
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
              .then(()=> setLoad(false));
          }}
        >
          <i className="fa-solid fa-right-to-bracket"></i>
        </button>
        <h3 id='name-tag'>bobrykilya</h3>
      </form>
    </div>
  );
}
 
export default LoginPanel;