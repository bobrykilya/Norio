import { useState } from 'react';
import './SignInForm.css';
import CheckBox from '../CheckBox/CheckBox';
import PasswordInput from '../PasswordInput/PasswordInput';


const SignInForm = (props) => {

    const submit_but = document.getElementById('submit-but');

    const [name, setName] = useState('');
    const [load, setLoad] = useState(false);

    const handleChangeCheckBoxMark = (checked) => {
        checked ? submit_but.type = 'button' : submit_but.type = 'submit'
    };
    const handleLogin = async () => {
        return
    };

    return (
        <form id='sign_in-form' className='cont'>
            <div className='input-cont cont'>
                <input
                    id='name'
                    type="text"
                    maxLength={15}
                    placeholder='Логин'
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <i className="info-icon fa-solid fa-user"></i>
            </div>
            <PasswordInput />
            <label id='checkbox-cont' className='cont'>
                <CheckBox onChangeCheckBoxMark={handleChangeCheckBoxMark}/>
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
        </form>
    );  
};

export default SignInForm;