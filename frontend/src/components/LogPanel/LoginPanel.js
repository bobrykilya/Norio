import './LoginPanel.css';
 
function LoginPanel() {
  return (
    <div id='log-cont' className='cont'>
      <form id='sign-in' className='cont'>
        <h1>Выполнить <br/> вход</h1>
        <button id='info-but'><i className="fa-solid fa-circle-info"></i></button>
        <input type="text" placeholder='Логин' />
        <input type="password" placeholder='Пароль' />
        <button id='submit-but' type='submit'><i className="fa-solid fa-right-to-bracket"></i></button>
        <h3 id='name-tag'>bobrykilya</h3>
      </form>
    </div>
  );
}
 
export default LoginPanel;