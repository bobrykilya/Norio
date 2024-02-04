import SignUpForm from './SignUpForm/SignUpForm'
import ButtonsCont from '../../../ButtonsCont/ButtonsCont'



const SignUpCont = ({ act_form }) => {

    return (  
        <section 
            id='sign_up-cont'
            className={`sign-cont cont ${act_form !== 'opened_sign_in' ? 'active' : ''}`}
        >
            <div className='enter_text-cont cont'>
                <h1>Регистрация</h1>
            </div>
            <ButtonsCont />
            <SignUpForm isFormBlur={act_form !== 'opened_sign_up'}/>
            <h3 className='name_tag'>bobrykilya</h3>
        </section>
    )
}
 
export default SignUpCont