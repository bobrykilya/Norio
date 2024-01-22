import SignUpForm from './SignUpForm/SignUpForm'
import ButtonsCont from '../../../ButtonsCont/ButtonsCont'



const SignUpCont = ({ coverPanelState }) => {

    return (  
        <section 
            id='sign_up-cont'
            className={`sign-cont cont ${coverPanelState !== 'opened_sign_in' ? 'active' : ''}`}
        >
            <div className='enter_text-cont cont'>
                <h1>Регистрация</h1>
            </div>
            <ButtonsCont />
            <SignUpForm formBlur={coverPanelState === 'opened_sign_up_2'}/>
            <h3 className='name_tag'>bobrykilya</h3>
        </section>
    )
}
 
export default SignUpCont