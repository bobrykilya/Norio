import React from 'react'
import SignUpForm from './SignUpForm/SignUpForm'
import NameTag from '../../NameTag/NameTag'
import { SignContProps } from "../../../../types/Auth-types"
import ButtonsCont from "../../ButtonsCont/ButtonsCont"



const SignUpCont = ({ actForm, isFormDisabled, isAnyCoverModalOpened }: SignContProps) => {
    
    return (  
        <section 
            id='sign_up-cont'
            className={`sign-cont cont ${actForm !== 'sign_in' ? 'active' : ''}`}
        >
            <div className='enter_text-cont cont'>
                <h1>Регистрация</h1>
            </div>
            <ButtonsCont disabled={isFormDisabled} />
            <SignUpForm
                isFormDisabled={isFormDisabled || actForm !== 'sign_up'}
                isFormBlur={actForm === 'sign_up_info'}
                isAnyCoverModalOpened={isAnyCoverModalOpened}
            />
            <NameTag />
        </section>
    )
}
 
export default SignUpCont