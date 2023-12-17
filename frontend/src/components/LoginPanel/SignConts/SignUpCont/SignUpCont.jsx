import SignUpForm from './SignUpForm/SignUpForm'
import ButtonsCont from '../../ButtonsCont/ButtonsCont'



const SignUpCont = () => {
    return (  
        <section id='sign_up-cont' className='sign-cont cont active'>
            <div className='enter_text-cont cont'>
                <h1>Регистрация</h1>
            </div>
            <ButtonsCont />
            <SignUpForm />
            <h3 className='name_tag'>bobrykilya</h3>
        </section>
    )
}
 
export default SignUpCont