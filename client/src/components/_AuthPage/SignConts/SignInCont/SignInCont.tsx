import React from 'react'
import SignInForm from './SignInForm/SignInForm'
import NameTag from '../../NameTag/NameTag'
import { SignContProps } from "../../../../types/Auth-types"
import SwitchUserButton from "../../SwitchUserButton/SwitchUserButton"



const SignInCont = ({ actForm, isFormDisabled }: SignContProps) => {

    return ( 
        <section 
            id='sign_in-cont'
            className={`sign-cont cont ${actForm === 'sign_in' ? 'active' : ''}`}
        >
            <SwitchUserButton
                disabled={isFormDisabled || actForm !== 'sign_in'}
            />
            <SignInForm
                isFormDisabled={isFormDisabled || actForm !== 'sign_in'}
            />
            <NameTag />
        </section>
     )
}
 
export default SignInCont