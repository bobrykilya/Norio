import { useSelector } from 'react-redux'
import SignInForm from './SignInForm/SignInForm'
import ButtonsCont from '../../../ButtonsCont/ButtonsCont'



const SignInCont = () => {

    const coverPanelState = useSelector(state => state.coverPanel.coverPanel)

    return ( 
        <section 
            id='sign_in-cont'
            className={`sign-cont cont ${coverPanelState === 'opened_sign_in' ? 'active' : ''}`}
        >
            <div className='enter_text-cont cont'>
                {/* <i className="fa-solid fa-door-open"></i> */}
                <h1>Авторизация</h1>
            </div>
            <ButtonsCont />
            <SignInForm />
            <h3 className='name_tag'>bobrykilya</h3>
        </section>
     )
}
 
export default SignInCont