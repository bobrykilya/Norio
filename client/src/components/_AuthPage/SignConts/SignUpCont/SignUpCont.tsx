import React from 'react'
import SignUpForm from './SignUpForm/SignUpForm'
import NameTag from '../../NameTag/NameTag'
import { SignContProps } from "../../../../types/Auth-types"



const SignUpCont = ({ actForm, isFormDisabled }: SignContProps) => {
    
    return (  
        <section 
            id='sign_up-cont'
            className={`sign-cont cont ${actForm !== 'sign_in' ? 'active' : ''}`}
        >
            <div className='enter_text-cont cont'>
                <h1>Регистрация</h1>
            </div>
            {/*<ButtonsCont disabled={isFormDisabled} />*/}
            <SignUpForm
                isFormDisabled={isFormDisabled || actForm !== 'sign_up'}
                isFormBlur={actForm === 'sign_up_info'}
            />
            <NameTag />
        </section>
    )
}
 
export default SignUpCont