import SignUpSecondForm from './SignUpSecondForm/SignUpSecondForm'




const SignUpSecondCont = ({ act_form }) => {

    // console.log(act_form)

    return ( 
        <section
            id='sign_up_2-cont'
            className={`sign-cont cont ${act_form === 'opened_sign_up_2' ? 'active' : ''}`}
        >
            <div className='enter_text-cont cont'>
                <h1>Личные данные:</h1>
            </div>
            < SignUpSecondForm />
        </section>
     )
}
 
export default SignUpSecondCont