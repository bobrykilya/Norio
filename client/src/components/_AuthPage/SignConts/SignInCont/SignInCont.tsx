import React from 'react'
import SignInForm from './SignInForm/SignInForm'
import ButtonsCont from '../../../ButtonsCont/ButtonsCont'
import NameTag from '../../NameTag/NameTag'



interface SignInContProps {
    act_form: string;
    blur_form: boolean;
}
const SignInCont = ({ act_form, blur_form }: SignInContProps) => {

    return ( 
        <section 
            id='sign_in-cont'
            className={`sign-cont cont ${act_form === 'sign_in' ? 'active' : ''}`}
        >
            <div className='enter_text-cont cont'>
                <h1>Авторизация</h1>
            </div>
            <ButtonsCont disabled={blur_form} />
            <SignInForm isFormBlur={blur_form || act_form !== 'sign_in'} />
            <NameTag />
        </section>
     )
}
 
export default SignInCont