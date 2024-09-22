import React from 'react'
import SignInForm from './SignInForm/SignInForm'
import ButtonsCont from '../../../ButtonsCont/ButtonsCont'
import NameTag from '../../NameTag/NameTag'
import { SignContProps } from "../../../../types/Auth-types"



const SignInCont = ({ actForm, isFormDisabled }: SignContProps) => {

    return ( 
        <section 
            id='sign_in-cont'
            className={`sign-cont cont ${actForm === 'sign_in' ? 'active' : ''}`}
        >
            <div className='enter_text-cont cont'>
                <h1>Авторизация</h1>
            </div>
            <ButtonsCont disabled={isFormDisabled} />
            <SignInForm
                isFormDisabled={isFormDisabled || actForm !== 'sign_in'}
            />
            <NameTag />
        </section>
     )
}
 
export default SignInCont