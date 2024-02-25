import SignInForm from './SignInForm/SignInForm'
import ButtonsCont from '../../../ButtonsCont/ButtonsCont'



const SignInCont = ({ act_form }) => {

    return ( 
        <section 
            id='sign_in-cont'
            className={`sign-cont cont ${act_form === 'sign_in' ? 'active' : ''}`}
        >
            <div className='enter_text-cont cont'>
                <h1>Авторизация</h1>
            </div>
            <ButtonsCont />
            <SignInForm isFormBlur={act_form !== 'sign_in'} />
            <h3 className='name_tag'>bobrykilya</h3>
        </section>
     )
}
 
export default SignInCont