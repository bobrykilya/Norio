import React from 'react'
import SignUpForm from './SignUpForm/SignUpForm'
import ButtonsCont from '../../../ButtonsCont/ButtonsCont'
import NameTag from '../../NameTag/NameTag'



interface SignUpContProps {
    act_form: string;
    blur_form: boolean;
}
const SignUpCont = ({ act_form, blur_form }: SignUpContProps) => {

    return (  
        <section 
            id='sign_up-cont'
            className={`sign-cont cont ${act_form !== 'sign_in' ? 'active' : ''}`}
        >
            <div className='enter_text-cont cont'>
                <h1>Регистрация</h1>
            </div>
            <ButtonsCont disabled={blur_form} />
            <SignUpForm isFormBlur={blur_form || act_form !== 'sign_up'} isSubmitButBlur={act_form === 'sign_up_info'} />
            <NameTag />
        </section>
    )
}
 
export default SignUpCont